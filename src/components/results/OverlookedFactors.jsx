import { AlertTriangle } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function OverlookedFactors({ factors = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#E8B86A]">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Overlooked Factors</h3>
            <p className="text-xs text-[#9A9EAA]">
              Subtle externalities and friction points often excluded from decision models
            </p>
          </div>
        </div>
        <Badge variant="amber" size="sm">Second-Order</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {factors.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] hover:border-[#383E4D] transition-colors"
          >
            <h4 className="text-xs sm:text-sm font-semibold text-[#F4F5F7] mb-1.5">
              {item.factor}
            </h4>
            <p className="text-xs text-[#9A9EAA] leading-relaxed">
              <strong className="text-[#63D5E8] font-mono font-normal">Why it matters:</strong> {item.whyItMatters}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
