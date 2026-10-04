import { Target } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function PrioritiesSection({ priorities = [], primaryPriority = "" }) {
  if (!priorities || priorities.length === 0) return null

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Target className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Decision Priorities & Value Anchors</h3>
            <p className="text-xs text-[#9A9EAA]">Stated core factors calibrating your evaluation</p>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          Value Hierarchy
        </Badge>
      </div>

      <div className="space-y-3">
        {primaryPriority && (
          <div className="p-3.5 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A599FF] block">
                Declared Primary North Star
              </span>
              <span className="text-sm font-bold text-[#F4F5F7]">
                {primaryPriority}
              </span>
            </div>
            <span className="text-xs text-[#9A9EAA] italic">
              Primary criterion against which trade-offs will be stress-tested
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {priorities.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#161922] border border-[#262A34] flex items-center justify-between"
            >
              <span className="text-xs font-medium text-[#F4F5F7]">{item}</span>
              <span className="text-[10px] font-mono text-[#63D5E8]">#{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
