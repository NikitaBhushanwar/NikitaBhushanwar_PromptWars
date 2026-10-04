import { z } from "zod"

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum([
    "Student",
    "Working Professional",
    "Entrepreneur",
    "Freelancer",
    "Researcher",
    "Other"
  ]),
  customRole: z.string().optional(),
  context: z.string().optional(),
  areasOfFocus: z.array(z.string()).default([])
})

export const decisionDataSchema = z.object({
  title: z.string().min(3, "Please describe the decision you are considering"),
  detailedContext: z.string().min(10, "Please provide some context on what is happening"),
  options: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      text: z.string().min(1, "Option description cannot be empty")
    })
  ).min(2, "At least two options are required"),
  knownFacts: z.string().optional(),
  uncertainties: z.string().optional(),
  factors: z.array(z.string()).default([]),
  leaningReason: z.string().optional(),
  primaryPriority: z.string().optional(),
  currentLeaning: z.string().default("Not sure"),
  confidence: z.number().min(0).max(100).default(50)
})

export const challengeResponseSchema = z.object({
  assumptionId: z.string(),
  questionId: z.string(),
  userResponse: z.string().min(1, "Please provide your reflection")
})

export const reflectionDataSchema = z.object({
  unconsideredAspect: z.string().min(1, "Please reflect on what you hadn't considered"),
  thinkingChanged: z.enum([
    "Not really",
    "A little",
    "Significantly",
    "I'm less certain",
    "I'm more certain"
  ]),
  investigateNext: z.string().optional(),
  notes: z.string().optional()
})
