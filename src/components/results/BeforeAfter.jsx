import { Sparkles } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function BeforeAfter() {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Thinking Shift: Before vs. After Audit</h3>
            <p className="text-xs text-[#9A9EAA]">
              Contrast your initial focus with the expanded perspective revealed by the audit
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Perspective Shift</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9A9EAA] pb-2 border-b border-[#262A34]">
            <span className="w-2 h-2 rounded-full bg-[#9A9EAA]" />
            <span>Before Audit (Visible Frame)</span>
          </div>
          <ul className="space-y-2 text-xs text-[#9A9EAA] pt-1">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Framed primarily around title, baseline salary, and immediate prestige.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Implicit assumption that mentorship and autonomy exist equally in both roles.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Evaluating through a short 6-month adaptation horizon.</span>
            </li>
          </ul>
        </div>

        {/* After */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#A599FF] pb-2 border-b border-[#262A34]">
            <span className="w-2 h-2 rounded-full bg-[#7C6CF5]" />
            <span>After Audit (Expanded Topology)</span>
          </div>
          <ul className="space-y-2 text-xs text-[#F4F5F7] pt-1">
            <li className="flex items-start gap-2">
              <span className="text-[#63D5E8]">✓</span>
              <span>Explicitly recognizes mentorship availability as the high-leverage multiplier.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E8B86A]">?</span>
              <span>Action plan formed to verify actual team culture before signing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A599FF]">~</span>
              <span>Assessing decision reversibility and long-term compounding network effects.</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
