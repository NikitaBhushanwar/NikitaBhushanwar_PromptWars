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
            <h3 className="text-base font-semibold text-[#F4F5F7]">Pre-Mortem (Hypothetical Scenarios)</h3>
            <p className="text-xs text-[#9A9EAA]">
              Possible scenarios to consider (not predictions) — Stress-testing assumptions through prospective hindsight
            </p>
          </div>
        </div>
        <Badge variant="neutral" size="sm">Possible Scenarios to Consider</Badge>
      </div>

      {Array.isArray(premortem) ? (
        <div className="space-y-3">
          {premortem.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-red-950/15 border border-red-500/20 space-y-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">
                  Hypothetical Failure Scenario #{idx + 1}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#F4F5F7] mt-1">
                  "{item.scenario}"
                </p>
              </div>

              {item.what_could_lead_to_it && (
                <div className="pt-2 text-xs text-[#9A9EAA]">
                  <strong className="text-red-300 font-mono text-[10px] uppercase block mb-0.5">What could lead to this:</strong>
                  {item.what_could_lead_to_it}
                </div>
              )}

              {item.question && (
                <div className="pt-2 border-t border-red-500/15 text-xs text-[#63D5E8] italic">
                  Preventative Inquiry: "{item.question}"
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">
              Hypothetical Failure Scenario
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
      )}
    </Card>
  )
}
