import { z } from "zod"

/**
 * Phase 2 AI Contract:
 * Structured output schema that the future Gemini integration will satisfy.
 * Adheres strictly to the product principle:
 * "The AI does not make the decision. It makes the thinking better."
 * Never contains scores, ranks, or recommendations.
 */

export const factItemSchema = z.object({
  id: z.string(),
  statement: z.string(),
  source: z.string().optional()
})

export const knownAssumedUnknownSchema = z.object({
  known: z.array(z.string()),
  assumed: z.array(z.string()),
  unknown: z.array(z.string())
})

export const assumptionItemSchema = z.object({
  id: z.string(),
  assumption: z.string(),
  type: z.enum(["explicit", "implicit"]),
  vulnerability: z.string().optional()
})

export const blindSpotItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  domain: z.string(),
  questionToExplore: z.string()
})

export const overlookedFactorSchema = z.object({
  id: z.string(),
  factor: z.string(),
  whyItMatters: z.string()
})

export const reasoningTensionSchema = z.object({
  id: z.string(),
  poleA: z.string(),
  poleB: z.string(),
  explanation: z.string()
})

export const informationGapSchema = z.object({
  id: z.string(),
  missingInfo: z.string(),
  howToFindOut: z.string()
})

export const perspectiveItemSchema = z.object({
  id: z.string(),
  viewpoint: z.string(),
  critiqueOrAngle: z.string()
})

export const challengeItemSchema = z.object({
  id: z.string(),
  targetAssumption: z.string(),
  provocativeQuestion: z.string(),
  thoughtExperiment: z.string().optional()
})

export const analysisContractSchema = z.object({
  decisionSummary: z.string(),
  whatWeHeard: z.string(),
  facts: z.array(factItemSchema),
  priorities: z.array(z.string()),
  knownAssumedUnknown: knownAssumedUnknownSchema,
  assumptions: z.array(assumptionItemSchema),
  blindSpots: z.array(blindSpotItemSchema),
  overlookedFactors: z.array(overlookedFactorSchema),
  reasoningTensions: z.array(reasoningTensionSchema),
  informationGaps: z.array(informationGapSchema),
  perspectives: z.array(perspectiveItemSchema),
  challenge: z.array(challengeItemSchema),
  whatWouldChangeMyMind: z.array(z.string()),
  preMortem: z.object({
    failureScenario: z.string(),
    subtleCauses: z.array(z.string())
  }),
  reversibility: z.object({
    isReversible: z.boolean(),
    reversibilityType: z.enum(["Type 1 (Irreversible)", "Type 2 (Reversible)"]),
    costOfReversal: z.string()
  }),
  timeline: z.object({
    tenDays: z.string(),
    tenMonths: z.string(),
    tenYears: z.string()
  }),
  summary: z.string(),
  considerations: z.array(z.string()),
  reflection: z.object({
    coreQuestion: z.string(),
    closingPrompt: z.string()
  })
})
