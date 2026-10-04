import { DoorOpen } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function ReversibilitySection({ reversibility }) {
  if (!reversibility) return null

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#63D5E8]">
            <DoorOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Reversibility Lens</h3>
            <p className="text-xs text-[#9A9EAA]">
              One-way door vs. two-way door classification & exit friction
            </p>
          </div>
        </div>
        <Badge variant="cyan" size="sm">
          {reversibility.reversibilityType || "Decision Architecture"}
        </Badge>
      </div>

      <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-3 text-xs sm:text-sm">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#63D5E8] block mb-1">
            Reversibility Assessment
          </span>
          <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
            {reversibility.assessment || reversibility.costOfReversal}
          </p>
        </div>

        {reversibility.considerations && reversibility.considerations.length > 0 && (
          <div className="pt-2 border-t border-[#262A34]/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9A9EAA] block mb-2">
              Key Exit Friction Considerations
            </span>
            <ul className="space-y-1.5 text-xs text-[#9A9EAA]">
              {reversibility.considerations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#63D5E8] font-mono">→</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
