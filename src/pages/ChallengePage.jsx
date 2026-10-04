import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { PageHeader } from "../components/common/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Textarea } from "../components/ui/Textarea"

export function ChallengePage() {
  const navigate = useNavigate()
  const { decisionData, challengeData, updateChallengeData } = useSession()

  // Sample probe questions grounded in user inputs
  const sampleChallenges = [
    {
      id: "c1",
      assumption:
        decisionData.leaningReason ||
        "This path will provide significantly superior career acceleration.",
      question: "What concrete evidence supports this belief rather than intuition or brand prestige?",
      thoughtExperiment: "What if the opposite were true—that the unchosen path offered faster mentorship?"
    },
    {
      id: "c2",
      assumption: "You will easily adapt to the unspoken team culture and management rhythm.",
      question: "What happens to your trajectory if your immediate manager leaves within 6 months?",
      thoughtExperiment: "What is your fallback plan if internal politics diminish your day-to-day autonomy?"
    }
  ]

  const [responses, setResponses] = useState(challengeData.notes || {})

  const handleResponseChange = (challengeId, text) => {
    setResponses((prev) => ({ ...prev, [challengeId]: text }))
  }

  const handleSaveAndContinue = (e) => {
    e.preventDefault()
    updateChallengeData({
      notes: responses,
      exploredQuestions: Object.keys(responses)
    })
    navigate("/reflection")
  }

  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <PageHeader
          badge="Stress Testing"
          badgeVariant="amber"
          title="Challenge Your Reasoning"
          subtitle="Test the strength of your premises. Defend your thinking against contrarian probes or adapt your view as new blind spots emerge."
        />

        <form onSubmit={handleSaveAndContinue} className="space-y-6 mt-6">
          {sampleChallenges.map((item, index) => (
            <Card key={item.id} variant="default" padding="lg" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#E8B86A] bg-[#E8B86A]/10 px-2 py-0.5 rounded border border-[#E8B86A]/30">
                  Challenge Probe #0{index + 1}
                </span>
                <span className="text-[11px] font-mono text-[#9A9EAA]">
                  Reasoning Crucible
                </span>
              </div>

              {/* Stated Assumption */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-[#9A9EAA] block">
                  Identified Assumption:
                </span>
                <p className="text-sm font-semibold text-[#F4F5F7] bg-[#161922] p-3 rounded-lg border border-[#262A34]">
                  "{item.assumption}"
                </p>
              </div>

              {/* Provocative Question */}
              <div className="space-y-1 pt-1">
                <span className="text-xs font-mono uppercase text-[#63D5E8] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Challenging Inquiry:
                </span>
                <p className="text-sm text-[#F4F5F7] font-medium leading-relaxed">
                  {item.question}
                </p>
              </div>

              {/* Thought Experiment */}
              {item.thoughtExperiment && (
                <div className="p-3 rounded-lg bg-[#08090C] border border-[#262A34] text-xs text-[#9A9EAA] italic">
                  💡 <strong>Thought Experiment:</strong> {item.thoughtExperiment}
                </div>
              )}

              {/* Response Textarea */}
              <Textarea
                label="Your Response"
                placeholder="Your response..."
                rows={3}
                value={responses[item.id] || ""}
                onChange={(e) => handleResponseChange(item.id, e.target.value)}
                helperText="Articulating your counter-perspective refines your conviction."
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-[#9A9EAA]">
                  {responses[item.id]?.trim() ? "✓ Response drafted" : "Awaiting your reflection"}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    updateChallengeData({
                      notes: responses,
                      exploredQuestions: Object.keys(responses)
                    })
                  }}
                >
                  Challenge My Thinking
                </Button>
              </div>
            </Card>
          ))}

          {/* Phase 2 Note */}
          <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] text-xs text-[#9A9EAA] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#63D5E8] shrink-0 mt-0.5" />
            <p>
              In Phase 2, Google Gemini will generate contextual challenge probes dynamically tuned to the vulnerabilities in your exact decision.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/results")}
            >
              Back to Audit
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Proceed to Final Reflection
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}
