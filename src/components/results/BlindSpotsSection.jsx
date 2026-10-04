import { EyeOff, HelpCircle } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function BlindSpotsSection({ blindSpots = [] }) {
  return (
    <Card variant="blindspot" padding="md" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#E8B86A]/10 border border-[#E8B86A]/30 text-[#E8B86A]">
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F5F7]">
              Potential Blind Spots
            </h3>
            <p className="text-xs text-[#9A9EAA]">
              Unexamined dynamics and second-order dependencies hidden behind your visible reasons
            </p>
          </div>
        </div>
        <Badge variant="amber" size="sm">
          Focal Audit Zone
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blindSpots.map((bs, index) => (
          <div
            key={bs.id || index}
            className="p-5 rounded-xl bg-[#101218] border border-[#262A34] hover:border-[#E8B86A]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8B86A] bg-[#E8B86A]/10 px-2 py-0.5 rounded border border-[#E8B86A]/20">
                  {bs.domain || "Cognitive Architecture"}
                </span>
                <span className="text-xs font-mono text-[#9A9EAA]">#0{index + 1}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#F4F5F7] group-hover:text-[#E8B86A] transition-colors">
                {bs.title}
              </h4>
              <p className="text-xs text-[#9A9EAA] mt-2 leading-relaxed">
                {bs.description}
              </p>

              {bs.why_it_matters && (
                <div className="mt-3 p-2.5 rounded bg-[#161922] border border-[#262A34] text-[11px] text-[#9A9EAA]">
                  <strong className="text-[#E8B86A] font-mono uppercase text-[10px] block mb-0.5">Why this matters:</strong>
                  {bs.why_it_matters}
                </div>
              )}
            </div>

            {/* Question to explore */}
            <div className="mt-4 pt-3.5 border-t border-[#262A34] bg-[#161922]/60 p-3 rounded-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#63D5E8] flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3 h-3" />
                Question Worth Exploring
              </span>
              <p className="text-xs text-[#F4F5F7] font-medium italic">
                "{bs.question || bs.questionToExplore}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
