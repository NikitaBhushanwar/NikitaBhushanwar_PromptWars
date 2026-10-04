import { z } from "zod"

/**
 * Zod validation schema for the analysis request body.
 * Enforces strict bounds to prevent arbitrarily large payloads.
 */
export const userProfileInputSchema = z.object({
  name: z.string().max(100).default("User"),
  role: z.string().max(100).default("Professional"),
  customRole: z.string().max(100).optional().default(""),
  context: z.string().max(2000).optional().default(""),
  areasOfFocus: z.array(z.string().max(100)).max(15).default([])
}).default({})

export const decisionOptionInputSchema = z.object({
  id: z.string().max(50),
  label: z.string().max(50),
  text: z.string().min(1, "Option description cannot be empty").max(1000)
})

export const decisionDataInputSchema = z.object({
  title: z.string().min(3, "Decision title must be at least 3 characters").max(500),
  detailedContext: z.string().min(10, "Context must be at least 10 characters").max(5000),
  options: z.array(decisionOptionInputSchema).min(2, "At least 2 options are required").max(8),
  knownFacts: z.string().max(2000).optional().default(""),
  uncertainties: z.string().max(2000).optional().default(""),
  factors: z.array(z.string().max(100)).max(20).default([]),
  leaningReason: z.string().max(2000).optional().default(""),
  primaryPriority: z.string().max(500).optional().default(""),
  currentLeaning: z.string().max(200).optional().default("Not sure"),
  confidence: z.number().min(0).max(100).default(50)
})

export const analysisRequestSchema = z.object({
  userProfile: userProfileInputSchema,
  decisionData: decisionDataInputSchema
})
