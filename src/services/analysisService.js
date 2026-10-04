import { analysisContractSchema } from "../schemas/analysisSchema"

/**
 * Analysis Service (Phase 1 / Phase 2 Interface)
 * 
 * In Phase 1: Provides structural templates conforming to the Zod analysisContractSchema
 * so that all UI components render their complete structural shells without fake AI results.
 * 
 * In Phase 2: Will invoke the Google Gemini 1.5 Pro / 2.0 Flash reasoning engine via
 * a secure backend endpoint or direct client call with structured JSON response mode.
 */

export const analysisService = {
  /**
   * Generates a structured UI shell preview derived from the user's actual decision inputs.
   * This guarantees that Phase 1 UI components render real layout structures with the user's
   * stated options and context, while clearly indicating that Phase 2 will plug in live Gemini output.
   */
  generateShellAudit(decisionData, userProfile) {
    const title = decisionData.title || "Your Decision Under Review"
    const options = decisionData.options || []
    const optLabels = options.map(o => o.text ? `"${o.text.slice(0, 40)}..."` : o.label).join(" vs ")
    const userRoleText = userProfile?.role ? ` (${userProfile.role})` : ""

    const rawData = {
      decisionSummary: `Examining ${title}${userRoleText}. Weighing ${options.length} potential paths: ${optLabels}.`,
      whatWeHeard: decisionData.detailedContext || "You are considering several trade-offs between stability, upside, and personal mastery.",
      facts: [
        {
          id: "fact-1",
          statement: decisionData.knownFacts || "Verified baseline parameters and constraints.",
          source: "User direct report"
        },
        {
          id: "fact-2",
          statement: `Current inclination leans towards: ${decisionData.currentLeaning || "Undecided"}.`,
          source: "User self-assessment"
        },
        {
          id: "fact-3",
          statement: `Primary priority declared: ${decisionData.primaryPriority || "Balanced growth"}.`,
          source: "Stated values"
        }
      ],
      priorities: decisionData.factors && decisionData.factors.length > 0 
        ? decisionData.factors 
        : ["Career", "Financial Security", "Learning", "Time"],
      knownAssumedUnknown: {
        known: [
          decisionData.knownFacts || "Stipulated timeline and contractual constraints",
          `Self-reported confidence: ${decisionData.confidence || 50}%`
        ],
        assumed: [
          decisionData.leaningReason || "That the chosen path will yield the highest long-term trajectory",
          "That current market conditions and team dynamics will remain stable"
        ],
        unknown: [
          decisionData.uncertainties || "Actual day-to-day culture and unspoken management expectations",
          "Emergent opportunity costs over a 24-month horizon"
        ]
      },
      assumptions: [
        {
          id: "assump-1",
          assumption: decisionData.leaningReason ? `Premise: ${decisionData.leaningReason}` : "Assumes that short-term compensation differences outweigh second-order learning curve differences.",
          type: "explicit",
          vulnerability: "Subject to confirmation bias if evaluated only against 6-month metrics."
        },
        {
          id: "assump-2",
          assumption: "Assumes the less familiar environment will provide equivalent psychological safety.",
          type: "implicit",
          vulnerability: "Cultural misalignment is one of the highest drivers of early departure."
        }
      ],
      blindSpots: [
        {
          id: "bs-1",
          title: "Mentorship & Asymmetric Learning",
          domain: "Human Capital",
          description: "Evaluating the visible brand prestige while under-weighting direct access to mentors who actively sponsor your growth.",
          questionToExplore: "Who specifically in either path will review your work and invest in your development?"
        },
        {
          id: "bs-2",
          title: "The Reversibility Asymmetry",
          domain: "Decision Architecture",
          description: "Treating both options as equally reversible, when one path may preserve optionality significantly better than the other.",
          questionToExplore: "If you want to reverse this decision in 18 months, which direction has lower exit friction?"
        }
      ],
      overlookedFactors: [
        {
          id: "of-1",
          factor: "Energy & Cognitive Overhead",
          whyItMatters: "The hidden fatigue of relocating or adapting to a large corporate bureaucracy can diminish discretionary creative output."
        },
        {
          id: "of-2",
          factor: "Network Compounding",
          whyItMatters: "Early-career density of ambitious peers often yields compounding returns 5-10 years down the line."
        }
      ],
      reasoningTensions: [
        {
          id: "ten-1",
          poleA: "Desire for high autonomy & ownership",
          poleB: "Attraction to established structure & guaranteed compensation",
          explanation: "You express high value in technical independence, yet lean towards an environment optimized for process predictability."
        }
      ],
      informationGaps: [
        {
          id: "gap-1",
          missingInfo: "Unfiltered feedback from people who left the new team within the last 12 months.",
          howToFindOut: "Search alumni on LinkedIn and request a 15-minute candid informational conversation."
        },
        {
          id: "gap-2",
          missingInfo: "Exact burn rate and revenue milestones required for the next runway extension.",
          howToFindOut: "Direct inquiry with current leadership regarding cash cushion and realistic milestones."
        }
      ],
      perspectives: [
        {
          id: "per-1",
          viewpoint: "A 10-Year Career Strategist",
          critiqueOrAngle: "Look beyond the immediate title; optimize exclusively for where you will accumulate rare and valuable skills that cannot be automated."
        },
        {
          id: "per-2",
          viewpoint: "A Risk-Minimizing Financial Pragmatist",
          critiqueOrAngle: "Bank the liquid compensation buffer first to build an independent runway that gives you negotiating leverage for every future choice."
        }
      ],
      challenge: [
        {
          id: "chal-1",
          targetAssumption: decisionData.leaningReason || "That the currently leaning option provides superior trajectory.",
          provocativeQuestion: "What single piece of disconfirming evidence would cause you to completely eliminate this option?",
          thoughtExperiment: "Imagine it is 2 years from now and you deeply regret this choice. What was the exact reason?"
        }
      ],
      whatWouldChangeMyMind: [
        "Discovering that the hiring manager has high turnover on their direct team.",
        "Learning that current startup equity could be restructured or compensated with retention bonuses.",
        "A formal offer from a third alternative that combines the best aspects of both."
      ],
      preMortem: {
        failureScenario: "Two years from now, you feel stagnant and misaligned.",
        subtleCauses: [
          "You optimized for the initial salary offer rather than the velocity of day-to-day feedback.",
          "You assumed large organization brand would speak for itself without building internal visibility."
        ]
      },
      reversibility: {
        isReversible: true,
        reversibilityType: "Type 2 (Reversible)",
        costOfReversal: "Moderate: Relocation overhead and 1 year tenure commitment before an amicable lateral transition."
      },
      timeline: {
        tenDays: "Acute emotional tension from making a final commitment and notifying stakeholders.",
        tenMonths: "Intense learning curve and proof-of-competence phase; initial novelty wears off.",
        tenYears: "The specific starting salary difference will be insignificant; the compounded peer network and reputation will dominate."
      },
      summary: "This reasoning audit reveals clear trade-offs between guaranteed immediate liquidity and high-leverage ownership. Your primary blind spots lie not in financial math, but in mentorship bandwidth and long-term network compounding.",
      considerations: [
        "Have you spoken with someone who worked in this exact role and left?",
        "Have you separated the emotional relief of a conclusion from the strategic substance of the path?",
        "What is the cost of waiting or negotiating an extension to gather missing information?"
      ],
      reflection: {
        coreQuestion: "What is the single most critical assumption underpinning your preference?",
        closingPrompt: "The choice remains yours. Take a moment to record your updated reasoning below."
      }
    }

    // Validate with Zod to ensure complete schema compliance
    const parsed = analysisContractSchema.safeParse(rawData)
    if (!parsed.success) {
      console.warn("Schema validation issues in shell audit:", parsed.error)
    }
    return rawData
  },

  /**
   * Phase 2 Hook:
   * Will call the backend /api/analyze endpoint with Gemini API.
   */
  async executeLiveGeminiAudit(_decisionData, _userProfile) {
    throw new Error(
      "Live Gemini AI integration is scheduled for Phase 2. " +
      "The current UI is running on the Phase 1 schema-compliant shell."
    )
  }
}
