import { CheckSquare } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function ConsiderationsSummary({ considerations = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#E8B86A]">
            <CheckSquare className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">What to Consider Before Deciding</h3>
            <p className="text-xs text-[#9A9EAA]">
              Actionable inquiry checklist before making a final commitment
            </p>
          </div>
        </div>
        <Badge variant="amber" size="sm">Pre-Commitment</Badge>
      </div>

      <div className="space-y-2.5">
        {considerations.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded border border-[#383E4D] bg-[#08090C] flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#63D5E8] font-mono">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
