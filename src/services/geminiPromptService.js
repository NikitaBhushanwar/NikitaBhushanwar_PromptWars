/**
 * Gemini System Instructions and Prompt Builders for The Blind Spot.
 * 
 * Core Philosophy:
 * "The AI does not make the decision. It makes the thinking better."
 * "You are a reasoning examiner, not a decision-maker."
 */

export const GEMINI_SYSTEM_INSTRUCTION = `You are "The Blind Spot", an AI reasoning examiner and decision auditor.

YOUR CORE PHILOSOPHY:
"The AI does not make the decision. It makes the thinking better."
"You decide. We help you see more clearly."

CRITICAL RULES & PROHIBITIONS:
1. You MUST NEVER recommend an option or tell the user what they should do.
2. You MUST NEVER rank options or declare any option "best", "superior", "worse", or "correct".
3. You MUST NEVER assign a decision-quality score, rating, or numerical grade.
4. You MUST NEVER make the decision for the user. The human remains the sole authority.
5. You MUST NEVER invent or fabricate facts not provided by the user. If information is missing, classify it as an UNKNOWN or INFORMATION GAP.
6. Frame blind spots as possibilities, not dogmatic truths (e.g., use "You may be assuming...", "Consider whether...", rather than "This option will fail").
7. Distinguish sharply between:
   - FACTS: Empirical constraints explicitly stated by the user.
   - ASSUMPTIONS: Premises the user takes for granted without stated evidence.
   - UNKNOWNS: Factors that cannot be resolved from the provided narrative.

OUTPUT REQUIREMENT:
You must respond with valid JSON ONLY matching the exact schema specified.
Do not wrap in markdown tags like \`\`\`json. Output raw JSON object only.`;

export function buildAnalysisUserPrompt(userProfile, decisionData) {
  const optionsList = (decisionData.options || [])
    .map((opt, i) => "Option " + (i + 1) + " (" + opt.label + "): " + opt.text)
    .join("\n");

  const factorsList = (decisionData.factors && decisionData.factors.length > 0)
    ? decisionData.factors.join(", ")
    : "Not specified";

  const userRole = userProfile?.role || "Professional";
  const userCustom = userProfile?.customRole ? " (" + userProfile.customRole + ")" : "";
  const focusAreas = userProfile?.areasOfFocus?.join(", ") || "General growth";

  return [
    "Please perform a rigorous reasoning audit of the following decision.",
    "",
    "USER CONTEXT:",
    "- Name: " + (userProfile?.name || "User"),
    "- Role / Discipline: " + userRole + userCustom,
    "- Life / Career Context: " + (userProfile?.context || "Not provided"),
    "- Focus Areas: " + focusAreas,
    "",
    "DECISION UNDER AUDIT:",
    "- Title: " + decisionData.title,
    "- Narrative Context: " + decisionData.detailedContext,
    "",
    "OPTIONS CONSIDERED:",
    optionsList,
    "",
    "EPISTEMIC BASELINE:",
    "- Known Facts (stated by user): " + (decisionData.knownFacts || "None explicitly stated"),
    "- Uncertainties (stated by user): " + (decisionData.uncertainties || "None explicitly stated"),
    "- Key Factors: " + factorsList,
    "",
    "STATED REASONING & CALIBRATION:",
    "- Current Inclination: " + (decisionData.currentLeaning || "Not sure"),
    "- Stated Reason for Current Inclination: " + (decisionData.leaningReason || "Not provided"),
    "- Declared Primary Priority: " + (decisionData.primaryPriority || "Not specified"),
    "- Self-Reported Confidence: " + (decisionData.confidence ?? 50) + "%",
    "",
    "TASK:",
    "Examine the user's reasoning and illuminate:",
    "1. what_we_heard: Concise synthesis of the decision and premises without judgment.",
    "2. facts: List of verifiable facts explicitly provided by the user.",
    "3. priorities: Core values being traded off against each other.",
    "4. assumptions: List of { assumption, why_it_matters, question } examining unstated premises.",
    "5. potential_blind_spots: List of { title, description, why_it_matters, question } highlighting overlooked angles.",
    "6. overlooked_factors: List of { factor, description, question } identifying secondary/tertiary impacts.",
    "7. reasoning_tensions: List of { observation, question } surfacing contradictions or frictions between stated values.",
    "8. information_gaps: List of { missing_information, why_it_matters, question } identifying missing data worth checking.",
    "9. alternative_perspectives: List of { perspective, question } examining the decision from contrasting viewpoints.",
    "10. challenge_my_reasoning: List of { claim, challenge, question } pressure-testing specific premises.",
    "11. what_would_change_your_mind: List of { evidence, why_it_matters } defining falsifiability criteria.",
    "12. pre_mortem: List of { scenario, what_could_lead_to_it, question } exploring potential failure without asserting failure.",
    "13. reversibility: Object { assessment, considerations } evaluating one-way vs two-way door nature and exit costs.",
    "14. timeline: List of { timeframe, consideration } across Now, 3 months, 6 months, 1 year, Longer term.",
    "15. reasoning_map: Object { visible_factors, uncertain_areas, questions_to_explore } for the topological map.",
    "16. what_to_consider: 3-5 high-leverage considerations before taking action.",
    "17. reflection_questions: 3-5 open-ended self-reflection prompts.",
    "",
    "REMEMBER: NEVER rank, NEVER recommend, NEVER declare a winner, NEVER score. Return JSON only."
  ].join("\n");
}
