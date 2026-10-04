import { Sparkles, ArrowRight } from "lucide-react"
import { useSession } from "../../hooks/useSession"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function BeforeAfter() {
  const { decisionData, analysis, reflectionData } = useSession()

  const blindSpotCount = (analysis?.potential_blind_spots || analysis?.blindSpots || []).length
  const gapCount = (analysis?.information_gaps || analysis?.informationGaps || []).length

  const topBlindSpot = analysis?.potential_blind_spots?.[0]?.blind_spot ||
    analysis?.blindSpots?.[0]?.blind_spot ||
    analysis?.blindSpots?.[0]?.title ||
    "Unexamined environmental and long-term friction"

  const topGap = analysis?.information_gaps?.[0]?.missing_information ||
    analysis?.informationGaps?.[0]?.missing_information ||
    "Key unknown variables requiring verification"

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Thinking Shift: BEFORE → AFTER</h3>
            <p className="text-xs text-[#9A9EAA]">
              Contrast your initial visible frame with the expanded reasoning topology revealed by the audit
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Reasoning Shift</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#262A34]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9A9EAA]">
              <span className="w-2 h-2 rounded-full bg-[#9A9EAA]" />
              <span>BEFORE AUDIT (Initial Frame)</span>
            </div>
            <span className="text-[11px] font-mono text-[#9A9EAA]">
              Confidence: {decisionData.confidence ?? 50}%
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[#9A9EAA]">
            <li className="flex items-start gap-2">
              <span className="text-[#9A9EAA] font-bold">•</span>
              <div>
                <strong className="text-[#F4F5F7]">Stated Leaning:</strong>{" "}
                {decisionData.currentLeaning || "Uncommitted / Exploring options"}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9A9EAA] font-bold">•</span>
              <div>
                <strong className="text-[#F4F5F7]">Primary Reason:</strong>{" "}
                {decisionData.reasoningSummary || decisionData.leaningReason || "Evaluated primarily through immediate visible outcomes"}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9A9EAA] font-bold">•</span>
              <div>
                <strong className="text-[#F4F5F7]">Visible Priorities:</strong>{" "}
                {(decisionData.factors && decisionData.factors.length > 0)
                  ? decisionData.factors.join(", ")
                  : "Immediate known trade-offs"}
              </div>
            </li>
          </ul>
        </div>

        {/* AFTER */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#262A34]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#A599FF]">
              <span className="w-2 h-2 rounded-full bg-[#7C6CF5]" />
              <span>AFTER AUDIT (Illuminated Field)</span>
            </div>
            <span className="text-[11px] font-mono text-[#63D5E8]">
              {blindSpotCount > 0 ? `${blindSpotCount} Blind Spots Surfaced` : "Audit Complete"}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[#F4F5F7]">
            <li className="flex items-start gap-2">
              <span className="text-[#63D5E8] font-bold">✓</span>
              <div>
                <strong className="text-[#63D5E8]">Unconsidered Factor:</strong>{" "}
                {reflectionData.unconsideredAspect || topBlindSpot}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E8B86A] font-bold">?</span>
              <div>
                <strong className="text-[#E8B86A]">Information Gaps:</strong>{" "}
                {gapCount > 0 ? `${gapCount} critical unknowns identified (e.g., "${topGap.slice(0, 70)}...")` : "Premises pressure-tested"}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A599FF] font-bold">~</span>
              <div>
                <strong className="text-[#A599FF]">Next Investigation:</strong>{" "}
                {reflectionData.investigateNext || "Verifying foundational assumptions before committing"}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
