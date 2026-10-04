import { Compass, HelpCircle, CheckCircle2 } from "lucide-react"

export function BlindSpotMap({
  decisionTitle = "Your Core Decision",
  reasoningMap = null,
  visibleFactors = ["Money", "Career", "Learning", "Time"],
  hiddenFactors = null
}) {
  const finalVisible = reasoningMap?.visible_factors?.length > 0 
    ? reasoningMap.visible_factors 
    : visibleFactors

  const defaultHidden = [
    { name: "Opportunity Cost", note: "Second-order alternative" },
    { name: "Mentorship", note: "Feedback & sponsorship bandwidth" },
    { name: "Long-Term Impact", note: "Compounding trajectory beyond 3 years" },
    { name: "Academic Impact", note: "Depth of formal craft & knowledge" }
  ]

  const mappedHidden = reasoningMap?.uncertain_areas?.map((area, i) => ({
    name: typeof area === "string" ? area : area.name || "Inquiry Zone",
    note: reasoningMap?.questions_to_explore?.[i] || "Inquiry to probe"
  }))

  const activeHidden = (mappedHidden && mappedHidden.length > 0)
    ? mappedHidden
    : (hiddenFactors || defaultHidden)
  return (
    <div className="w-full rounded-2xl bg-[#101218] border border-[#262A34] p-5 sm:p-7 relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262A34] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#161922] border border-[#262A34] text-[#E8B86A]">
            <Compass className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F4F5F7]">
              Decision Topology Map
            </h3>
            <p className="text-xs text-[#9A9EAA]">
              Visualizing visible focus areas versus inquiry zones worth examining
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#63D5E8]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Visible Factors</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#E8B86A]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Inquiry Zones (?)</span>
          </div>
        </div>
      </div>

      {/* Graphical Map Layout */}
      <div className="relative py-6 sm:py-10 flex flex-col items-center">
        {/* Outer Perimeter: Surrounding / Hidden Areas (Inquiry Zones) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {activeHidden.map((zone, idx) => (
            <div
              key={zone.name || idx}
              className="p-3.5 rounded-xl bg-[#161922] border border-[#E8B86A]/30 flex flex-col justify-between hover:border-[#E8B86A]/60 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#E8B86A] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#E8B86A]/20 flex items-center justify-center text-[10px] font-mono">
                    ?
                  </span>
                  {zone.name}
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#08090C] text-[#9A9EAA] px-1.5 py-0.5 rounded border border-[#262A34]">
                  Inquiry
                </span>
              </div>
              <p className="text-[11px] text-[#9A9EAA] mt-2 line-clamp-2">
                {zone.note}
              </p>
            </div>
          ))}
        </div>

        {/* Central Core & Connected Visible Factors */}
        <div className="w-full max-w-xl bg-[#08090C] border border-[#262A34] rounded-2xl p-6 relative flex flex-col items-center my-2 shadow-inner">
          {/* Connector lines simulation */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#63D5E8] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#63D5E8]" />
            Direct Visible Connections
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {finalVisible.slice(0, 8).map((f) => (
              <span
                key={f}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-[#161922] border border-[#63D5E8]/30 text-[#F4F5F7] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#63D5E8]" />
                {f}
              </span>
            ))}
          </div>

          {/* Central Decision Node */}
          <div className="w-full max-w-md bg-[#161922] border border-[#7C6CF5]/50 rounded-xl p-4 text-center shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A599FF]">
              Core Decision Node
            </span>
            <h4 className="text-sm font-semibold text-[#F4F5F7] mt-1 line-clamp-2">
              {decisionTitle}
            </h4>
          </div>
        </div>
      </div>

      {/* Philosophy note footer */}
      <div className="mt-4 pt-3 border-t border-[#262A34]/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9A9EAA] gap-2">
        <span>Note: Inquiry zones highlight areas worth examining, not flaws in your decision.</span>
        <span className="font-mono text-[#E8B86A]">No scores or judgments assigned.</span>
      </div>
    </div>
  )
}
