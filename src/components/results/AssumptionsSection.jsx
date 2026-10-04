import { Layers, AlertCircle } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function AssumptionsSection({ assumptions = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">
              Underlying Assumptions
            </h3>
            <p className="text-xs text-[#9A9EAA]">
              Beliefs that must be true for your current inclination to hold
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          Reasoning Premises
        </Badge>
      </div>

      <div className="space-y-3">
        {assumptions.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#A599FF] bg-[#7C6CF5]/10 px-2 py-0.5 rounded border border-[#7C6CF5]/30">
                  {item.type || "explicit"} assumption
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#F4F5F7] font-medium leading-relaxed">
                "{item.assumption}"
              </p>
            </div>

            {item.vulnerability && (
              <div className="md:w-72 bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA] flex items-start gap-2 shrink-0">
                <AlertCircle className="w-3.5 h-3.5 text-[#E8B86A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E8B86A] block mb-0.5">
                    Vulnerability to Verify
                  </span>
                  <span className="text-[11px] leading-relaxed block">{item.vulnerability}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
