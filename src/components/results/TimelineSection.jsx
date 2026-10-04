import { Clock } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function TimelineSection({ timeline }) {
  if (!timeline) return null

  const intervals = Array.isArray(timeline)
    ? timeline.map((item) => ({
        label: item.timeframe,
        desc: item.consideration,
        tag: "Temporal Horizon"
      }))
    : [
        { label: "10 Days", desc: timeline.tenDays, tag: "Immediate Friction" },
        { label: "10 Months", desc: timeline.tenMonths, tag: "Competence & Culture" },
        { label: "10 Years", desc: timeline.tenYears, tag: "Compounding Impact" }
      ]

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Clock className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Temporal Lens (10 / 10 / 10)</h3>
            <p className="text-xs text-[#9A9EAA]">
              Evaluating emotional friction across distinct temporal horizons
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Time Horizons</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {intervals.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-[#7C6CF5]">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono text-[#9A9EAA] uppercase">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-[#F4F5F7] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
