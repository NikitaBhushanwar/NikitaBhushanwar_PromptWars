import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Edit3 } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { PageHeader } from "../components/common/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"

export function ReviewPage() {
  const navigate = useNavigate()
  const { decisionData } = useSession()

  // Fallback if accessed directly without any decision data
  const hasDecision = decisionData && decisionData.title

  if (!hasDecision) {
    return (
      <div className="py-16 text-center">
        <Container size="narrow">
          <Card variant="default" padding="lg" className="space-y-4">
            <h2 className="text-xl font-bold text-[#F4F5F7]">No Decision Recorded Yet</h2>
            <p className="text-sm text-[#9A9EAA]">
              Please structure your decision before reviewing your inputs.
            </p>
            <div className="pt-2">
              <Button variant="primary" onClick={() => navigate("/decision")}>
                Go to Decision Setup
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-8 sm:py-12">
      <Container size="default">
        <PageHeader
          badge="Audit Alignment"
          badgeVariant="primary"
          title="Make sure we understood you correctly before we examine your reasoning"
          subtitle="Review your stated premises, options, and constraints. You can edit any parameter before initiating the reasoning audit."
        />

        <div className="space-y-6 mt-6">
          {/* Main Decision & Context */}
          <Card variant="default" padding="lg" className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#63D5E8]">
                Decision Under Consideration
              </span>
              <button
                type="button"
                onClick={() => navigate("/decision")}
                className="text-xs text-[#7C6CF5] hover:text-[#A599FF] flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#F4F5F7] tracking-tight">
              {decisionData.title}
            </h2>

            <div className="text-xs sm:text-sm text-[#9A9EAA] leading-relaxed bg-[#161922] p-4 rounded-xl border border-[#262A34]">
              {decisionData.detailedContext}
            </div>
          </Card>

          {/* Options Breakdown */}
          <Card variant="default" padding="lg" className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C6CF5]">
                Considered Options ({decisionData.options?.length || 0})
              </span>
              <button
                type="button"
                onClick={() => navigate("/decision")}
                className="text-xs text-[#7C6CF5] hover:text-[#A599FF] flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {decisionData.options?.map((opt, i) => (
                <div
                  key={opt.id || i}
                  className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-[#A599FF] mb-2">
                    <span className="font-bold">{opt.label}</span>
                    {decisionData.currentLeaning === opt.label && (
                      <span className="text-[10px] text-[#E8B86A] bg-[#E8B86A]/10 px-2 py-0.5 rounded border border-[#E8B86A]/20 font-sans">
                        Current Leaning
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
                    {opt.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Epistemic Context (Knowns & Uncertainties) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" padding="md" className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#63D5E8] block">
                Known Empirical Facts
              </span>
              <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
                {decisionData.knownFacts || "None explicitly stated"}
              </p>
            </Card>

            <Card variant="default" padding="md" className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#E8B86A] block">
                Identified Uncertainties
              </span>
              <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
                {decisionData.uncertainties || "None explicitly stated"}
              </p>
            </Card>
          </div>

          {/* Reasoning & Current Inclination */}
          <Card variant="default" padding="lg" className="space-y-4">
            <div className="border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8B86A]">
                Reasoning Premises & Self-Reported Calibration
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34]">
                <span className="text-[10px] font-mono uppercase text-[#9A9EAA] block mb-1">
                  Current Leaning
                </span>
                <span className="text-sm font-bold text-[#E8B86A]">
                  {decisionData.currentLeaning || "Not sure"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34]">
                <span className="text-[10px] font-mono uppercase text-[#9A9EAA] block mb-1">
                  Primary Declared Priority
                </span>
                <span className="text-sm font-semibold text-[#F4F5F7]">
                  {decisionData.primaryPriority || "Balanced growth"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34]">
                <span className="text-[10px] font-mono uppercase text-[#9A9EAA] block mb-1">
                  Self-Assessed Confidence
                </span>
                <span className="text-sm font-bold font-mono text-[#63D5E8]">
                  {decisionData.confidence ?? 50}%
                </span>
              </div>
            </div>

            {decisionData.leaningReason && (
              <div className="pt-2 text-xs sm:text-sm text-[#9A9EAA] bg-[#161922] p-4 rounded-xl border border-[#262A34] leading-relaxed">
                <strong className="text-[#F4F5F7]">Stated Reason for Current Leaning:</strong>{" "}
                "{decisionData.leaningReason}"
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262A34]">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/decision")}
            >
              Edit Decision Inputs
            </Button>

            <Button
              type="button"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate("/analyze")}
            >
              Analyze My Reasoning
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
