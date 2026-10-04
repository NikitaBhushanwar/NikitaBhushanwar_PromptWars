import { Split } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function ReasoningTensions({ tensions = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Split className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Reasoning Tensions</h3>
            <p className="text-xs text-[#9A9EAA]">
              Identified friction between stated values and implied behavioral trade-offs
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Internal Conflict</Badge>
      </div>

      <div className="space-y-3">
        {tensions.map((t, idx) => (
          <div
            key={t.id || idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-2.5"
          >
            {t.poleA && t.poleB ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="p-2 rounded bg-[#08090C] border border-[#262A34] text-[#63D5E8] font-mono">
                  Pole A: {t.poleA}
                </span>
                <span className="text-[#9A9EAA] font-mono text-center sm:px-2">⚡ vs ⚡</span>
                <span className="p-2 rounded bg-[#08090C] border border-[#262A34] text-[#E8B86A] font-mono">
                  Pole B: {t.poleB}
                </span>
              </div>
            ) : null}

            <p className="text-xs sm:text-sm text-[#F4F5F7] leading-relaxed">
              <strong className="text-[#A599FF] font-mono uppercase text-[10px] block mb-0.5">Tension Observation:</strong>
              {t.observation || t.explanation}
            </p>

            {t.question && (
              <div className="pt-2 border-t border-[#262A34]/50 text-xs text-[#63D5E8] italic">
                Inquiry: "{t.question}"
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
