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
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-2.5"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#63D5E8] block">
                Missing Information #{idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-[#F4F5F7] font-semibold leading-relaxed">
                {item.missing_information || item.missingInfo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {item.why_it_matters && (
                <div className="bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA]">
                  <span className="text-[10px] font-mono uppercase text-[#E8B86A] block mb-0.5">
                    Why It Matters
                  </span>
                  <span className="text-[11px] leading-relaxed block text-[#F4F5F7]/90">
                    {item.why_it_matters}
                  </span>
                </div>
              )}

              {(item.question || item.howToFindOut) && (
                <div className="bg-[#101218] p-3 rounded-lg border border-[#262A34] text-xs text-[#9A9EAA]">
                  <span className="text-[10px] font-mono uppercase text-[#63D5E8] block mb-0.5">
                    {item.question ? "Discovery Question" : "Investigation Vector"}
                  </span>
                  <span className="text-[11px] leading-relaxed block text-[#F4F5F7]/90">
                    {item.question || item.howToFindOut}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
