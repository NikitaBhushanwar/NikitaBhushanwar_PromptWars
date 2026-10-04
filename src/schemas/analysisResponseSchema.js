import { z } from "zod"

/**
 * Zod validation schema for Gemini's structured response.
 * Enforces strict compliance with Section 7 of the product specification.
 */

export const assumptionSchema = z.object({
  assumption: z.string(),
  why_it_matters: z.string(),
  question: z.string()
})

export const potentialBlindSpotSchema = z.object({
  title: z.string(),
  description: z.string(),
  why_it_matters: z.string(),
  question: z.string()
})

export const overlookedFactorSchema = z.object({
  factor: z.string(),
  description: z.string(),
  question: z.string()
})

export const reasoningTensionSchema = z.object({
  observation: z.string(),
  question: z.string()
})

export const informationGapSchema = z.object({
  missing_information: z.string(),
  why_it_matters: z.string(),
  question: z.string()
})

export const alternativePerspectiveSchema = z.object({
  perspective: z.string(),
  question: z.string()
})

export const challengeReasoningSchema = z.object({
  claim: z.string(),
  challenge: z.string(),
  question: z.string()
})

export const whatWouldChangeMindSchema = z.object({
  evidence: z.string(),
  why_it_matters: z.string()
})

export const preMortemSchema = z.object({
  scenario: z.string(),
  what_could_lead_to_it: z.string(),
  question: z.string()
})

export const reversibilitySchema = z.object({
  assessment: z.string(),
  considerations: z.array(z.string())
})

export const timelineItemSchema = z.object({
  timeframe: z.string(),
  consideration: z.string()
})

export const reasoningMapSchema = z.object({
  visible_factors: z.array(z.string()),
  uncertain_areas: z.array(z.string()),
  questions_to_explore: z.array(z.string())
})

export const geminiAnalysisResponseSchema = z.object({
  what_we_heard: z.string(),
  facts: z.array(z.string()),
  priorities: z.array(z.string()),
  assumptions: z.array(assumptionSchema),
  potential_blind_spots: z.array(potentialBlindSpotSchema),
  overlooked_factors: z.array(overlookedFactorSchema),
  reasoning_tensions: z.array(reasoningTensionSchema),
  information_gaps: z.array(informationGapSchema),
  alternative_perspectives: z.array(alternativePerspectiveSchema),
  challenge_my_reasoning: z.array(challengeReasoningSchema),
  what_would_change_your_mind: z.array(whatWouldChangeMindSchema),
  pre_mortem: z.array(preMortemSchema),
  reversibility: reversibilitySchema,
  timeline: z.array(timelineItemSchema),
  reasoning_map: reasoningMapSchema,
  what_to_consider: z.array(z.string()),
  reflection_questions: z.array(z.string())
})
