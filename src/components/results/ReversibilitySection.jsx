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
          {reversibility.reversibilityType || "Two-Way Door"}
        </Badge>
      </div>

      <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-2.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#F4F5F7]">
            Classification: {reversibility.reversibilityType}
          </span>
          <span className="text-[11px] font-mono text-[#63D5E8]">
            {reversibility.isReversible ? "Reversible with deliberate effort" : "Irreversible lock-in"}
          </span>
        </div>
        <p className="text-xs text-[#9A9EAA] leading-relaxed">
          <strong className="text-[#F4F5F7]">Cost & Friction of Reversal:</strong> {reversibility.costOfReversal}
        </p>
      </div>
    </Card>
  )
}
