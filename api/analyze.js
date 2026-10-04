import { GoogleGenAI } from "@google/genai"
import { analysisRequestSchema } from "../src/schemas/analysisRequestSchema.js"
import { geminiAnalysisResponseSchema } from "../src/schemas/analysisResponseSchema.js"
import { GEMINI_SYSTEM_INSTRUCTION, buildAnalysisUserPrompt } from "../src/services/geminiPromptService.js"

/**
 * Vercel Serverless Function: POST /api/analyze
 * 
 * Secure server-side endpoint that calls the Google Gemini reasoning engine.
 * The GEMINI_API_KEY is read strictly from process.env and NEVER sent to the browser.
 */
export default async function handler(req, res) {
  // Enforce POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).json({
      error: "Method Not Allowed. Please send a POST request."
    })
  }

  // 1. Validate Input Payload using Zod
  const parseResult = analysisRequestSchema.safeParse(req.body)
  if (!parseResult.success) {
    const errorDetails = parseResult.error.issues.map(i => ({
      field: i.path.join("."),
      message: i.message
    }))
    return res.status(400).json({
      error: "Invalid request data. Please check your inputs.",
      details: errorDetails
    })
  }

  const { userProfile, decisionData } = parseResult.data

  // 2. Check for Server-Side Gemini API Key
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === "") {
    return res.status(500).json({
      error: "Google Gemini API key is not configured on the server. Please set GEMINI_API_KEY in your environment variables."
    })
  }

  // 3. Invoke Google Gemini
  try {
    const ai = new GoogleGenAI({ apiKey })
    const userPrompt = buildAnalysisUserPrompt(userProfile, decisionData)
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash"

    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.3
      }
    })

    const rawText = response.text
    if (!rawText || rawText.trim() === "") {
      return res.status(502).json({
        error: "Empty reasoning response received from Gemini. Please try again."
      })
    }

    // 4. Parse & Validate Response JSON
    let parsedData
    try {
      // Strip potential markdown wrapping if present
      const cleaned = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim()
      parsedData = JSON.parse(cleaned)
    } catch {
      return res.status(502).json({
        error: "Malformed reasoning output received from AI engine. Please try again."
      })
    }

    // 5. Validate with Zod Output Schema
    const validatedResult = geminiAnalysisResponseSchema.safeParse(parsedData)
    if (!validatedResult.success) {
      console.warn("Schema normalization issue in Gemini response:", validatedResult.error.issues)
      // If minor schema mismatch, return parsedData if it has core sections, or return structured fallback
      if (parsedData.what_we_heard && Array.isArray(parsedData.facts)) {
        return res.status(200).json(parsedData)
      }
      return res.status(502).json({
        error: "The AI analysis response did not match the expected decision contract. Please try again."
      })
    }

    // 6. Return Clean Structured Output
    return res.status(200).json(validatedResult.data)

  } catch (err) {
    // Log safely on server without exposing secrets
    console.error("Gemini API invocation error:", err.message || err)

    // Check for specific error status codes
    const status = err.status || 502
    return res.status(status).json({
      error: "Unable to complete the analysis right now. Please try again."
    })
  }
}
