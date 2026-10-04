import { AlertOctagon } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function PremortemSection({ premortem }) {
  if (!premortem) return null

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-red-400">
            <AlertOctagon className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Pre-Mortem Analysis</h3>
            <p className="text-xs text-[#9A9EAA]">
              Prospective hindsight: Assuming failure occurred to detect subtle vulnerabilities
            </p>
          </div>
        </div>
        <Badge variant="neutral" size="sm">Prospective Hindsight</Badge>
      </div>

      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">
            Hypothetical Failure Scenario (24 Months Out)
          </span>
          <p className="text-sm font-semibold text-[#F4F5F7] mt-1">
            "{premortem.failureScenario}"
          </p>
        </div>

        {premortem.subtleCauses && premortem.subtleCauses.length > 0 && (
          <div className="pt-3 border-t border-red-500/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9A9EAA] block mb-2">
              Most Probable Subtle Precipitators
            </span>
            <ul className="space-y-2 text-xs text-[#F4F5F7]">
              {premortem.subtleCauses.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-mono">•</span>
                  <span className="leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
