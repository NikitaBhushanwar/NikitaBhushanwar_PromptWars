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
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#A599FF] bg-[#7C6CF5]/10 px-2 py-0.5 rounded border border-[#7C6CF5]/30">
                  Assumption #{index + 1}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#F4F5F7] font-semibold leading-relaxed">
                "{item.assumption}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {(item.why_it_matters || item.vulnerability) && (
                <div className="bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA] flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-[#E8B86A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#E8B86A] block mb-0.5">
                      Why It Matters
                    </span>
                    <span className="text-[11px] leading-relaxed block text-[#F4F5F7]/90">
                      {item.why_it_matters || item.vulnerability}
                    </span>
                  </div>
                </div>
              )}

              {item.question && (
                <div className="bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA] flex items-start gap-2">
                  <span className="text-[#63D5E8] font-bold text-xs">?</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#63D5E8] block mb-0.5">
                      Inquiry to Explore
                    </span>
                    <span className="text-[11px] leading-relaxed block text-[#F4F5F7]/90">
                      {item.question}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
