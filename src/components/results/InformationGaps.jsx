import { Search } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function InformationGaps({ gaps = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#63D5E8]">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Information Gaps</h3>
            <p className="text-xs text-[#9A9EAA]">
              Key pieces of missing data and practical methods to discover them
            </p>
          </div>
        </div>
        <Badge variant="cyan" size="sm">Epistemic Holes</Badge>
      </div>

      <div className="space-y-3">
        {gaps.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono uppercase text-[#63D5E8] block">
                Missing Information
              </span>
              <p className="text-xs sm:text-sm text-[#F4F5F7] font-medium leading-relaxed">
                {item.missingInfo}
              </p>
            </div>

            <div className="md:w-80 bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA] shrink-0">
              <span className="text-[10px] font-mono uppercase text-[#A599FF] block mb-1">
                Investigation Vector
              </span>
              <span className="text-[11px] leading-relaxed block">{item.howToFindOut}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
