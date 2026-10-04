import { Users } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function PerspectivesSection({ perspectives = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#A599FF]">
            <Users className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Alternative Perspectives</h3>
            <p className="text-xs text-[#9A9EAA]">
              How distinct thinking archetypes with varied time horizons evaluate this choice
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Multi-Lens</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {perspectives.map((p, idx) => (
          <div
            key={p.id || idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A599FF] bg-[#7C6CF5]/10 px-2 py-0.5 rounded border border-[#7C6CF5]/20">
                Lens: {p.viewpoint}
              </span>
              <p className="text-xs sm:text-sm text-[#F4F5F7] mt-3 leading-relaxed">
                "{p.critiqueOrAngle}"
              </p>
            </div>
            <div className="mt-4 pt-2 text-[10px] text-[#9A9EAA] font-mono border-t border-[#262A34]/50">
              Observer Archetype Analysis
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
