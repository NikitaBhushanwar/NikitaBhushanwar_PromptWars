import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw, Copy, ArrowLeft } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { PageHeader } from "../components/common/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Textarea } from "../components/ui/Textarea"

export function ReflectionPage() {
  const navigate = useNavigate()
  const { decisionData, reflectionData, updateReflectionData, resetSession } = useSession()

  const [unconsideredAspect, setUnconsideredAspect] = useState(
    reflectionData.unconsideredAspect || ""
  )
  const [thinkingChanged, setThinkingChanged] = useState(
    reflectionData.thinkingChanged || "A little"
  )
  const [investigateNext, setInvestigateNext] = useState(
    reflectionData.investigateNext || ""
  )
  const [notes, setNotes] = useState(reflectionData.notes || "")
  const [copied, setCopied] = useState(false)

  const changeOptions = [
    "Not really",
    "A little",
    "Significantly",
    "I'm less certain",
    "I'm more certain"
  ]

  const handleSave = () => {
    updateReflectionData({
      unconsideredAspect,
      thinkingChanged,
      investigateNext,
      notes
    })
  }

  const handleCopySummary = () => {
    handleSave()
    const textToCopy = `THE BLIND SPOT — REASONING AUDIT BRIEF
Decision: ${decisionData.title || "Unspecified"}
Current Inclination: ${decisionData.currentLeaning || "Not sure"}
Initial Stated Confidence: ${decisionData.confidence ?? 50}%

Key Unconsidered Factor:
${unconsideredAspect || "Not recorded"}

Thinking Shift:
${thinkingChanged}

Next Investigation Steps:
${investigateNext || "Not recorded"}

Final Reflection Notes:
${notes || "None"}

"The AI doesn't make the decision. It makes the thinking better."
`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleStartNew = () => {
    resetSession()
    navigate("/onboarding")
  }

  return (
    <div className="py-8 sm:py-14 space-y-10">
      <Container size="narrow">
        <PageHeader
          badge="Integration & Closure"
          badgeVariant="amber"
          title="Final Reflection"
          subtitle="Consolidate the insights revealed by the reasoning audit. Clarify how your mental model has shifted before taking action."
        />

        <div className="space-y-6 mt-6">
          {/* Main reflection inputs */}
          <Card variant="default" padding="lg" className="space-y-6">
            <Textarea
              label="What is one thing you hadn't considered before this audit?"
              placeholder="e.g. I hadn't factored in the mentorship deficit or the exit friction if I need to reverse this in 18 months..."
              rows={3}
              value={unconsideredAspect}
              onChange={(e) => {
                setUnconsideredAspect(e.target.value)
                handleSave()
              }}
              required
              helperText="Identify the single most impactful blind spot or tension surfaced."
            />

            {/* Thinking Changed Options */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] block">
                Has your thinking changed?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {changeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setThinkingChanged(opt)
                      handleSave()
                    }}
                    className={`p-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      thinkingChanged === opt
                        ? "bg-[#7C6CF5]/15 border-[#7C6CF5] text-[#F4F5F7] shadow-sm"
                        : "bg-[#161922] border-[#262A34] text-[#9A9EAA] hover:text-[#F4F5F7] hover:border-[#383E4D]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="What do you want to investigate next before committing?"
              placeholder="e.g. Schedule a 15-minute candid conversation with an ex-employee, verify exact vesting schedules..."
              rows={3}
              value={investigateNext}
              onChange={(e) => {
                setInvestigateNext(e.target.value)
                handleSave()
              }}
              helperText="Actionable next steps to eliminate remaining information gaps."
            />

            <Textarea
              label="Personal Closing Notes (Optional)"
              placeholder="Record any final thoughts, reservations, or strategic principles to guide your ultimate decision..."
              rows={2}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                handleSave()
              }}
            />
          </Card>

          {/* Core Philosophy Climax Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#161922] to-[#101218] border border-[#E8B86A]/40 p-8 sm:p-10 text-center space-y-4 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8B86A] bg-[#E8B86A]/10 px-3 py-1 rounded-full border border-[#E8B86A]/30">
              The Sovereign Principle
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F5F7] tracking-tight">
              YOU DECIDE.
            </h2>

            <p className="text-base sm:text-lg text-[#F4F5F7] font-medium max-w-lg mx-auto">
              "The Blind Spot doesn't choose for you.
              <br />
              <span className="text-[#63D5E8]">It helps you see more clearly."</span>
            </p>

            <p className="text-xs sm:text-sm text-[#9A9EAA] max-w-md mx-auto leading-relaxed pt-2">
              Every critical decision carries trade-offs. Now that you have examined what was previously unconsidered, trust your judgment and proceed.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button
                variant="secondary"
                size="md"
                icon={Copy}
                onClick={handleCopySummary}
              >
                {copied ? "Copied Brief to Clipboard!" : "Copy Reasoning Brief"}
              </Button>

              <Button
                variant="outline"
                size="md"
                icon={RotateCcw}
                onClick={handleStartNew}
              >
                Start New Decision Audit
              </Button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/challenge")}
            >
              Back to Challenges
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate("/results")}
            >
              Review Full Audit
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
