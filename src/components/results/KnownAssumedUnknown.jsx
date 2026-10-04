import { Card } from "../ui/Card"

export function KnownAssumedUnknown({
  known = [],
  assumed = [],
  unknown = []
}) {
  return (
    <Card variant="default" padding="md" className="space-y-6">
      <div className="border-b border-[#262A34] pb-4">
        <h3 className="text-base font-semibold text-[#F4F5F7] tracking-tight">
          Epistemic Breakdown: Known vs. Assumed vs. Unknown
        </h3>
        <p className="text-xs text-[#9A9EAA] mt-0.5">
          Separating empirical constraints from unverified assumptions and active information gaps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FACT (KNOWN) Column */}
        <div className="p-4 rounded-xl bg-[#161922] border border-emerald-500/20 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262A34]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                ✓
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                FACT
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#9A9EAA]">Empirical / Verified</span>
          </div>

          <ul className="space-y-2.5 text-xs text-[#F4F5F7] flex-1">
            {known.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#08090C]/50 p-2.5 rounded-lg border border-[#262A34]">
                <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ASSUMPTION Column */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262A34]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#7C6CF5]/20 text-[#A599FF] flex items-center justify-center text-xs font-bold font-mono">
                ~
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-[#A599FF]">
                ASSUMPTION
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#9A9EAA]">Unverified Premise</span>
          </div>

          <ul className="space-y-2.5 text-xs text-[#F4F5F7] flex-1">
            {assumed.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#08090C]/50 p-2.5 rounded-lg border border-[#262A34]">
                <span className="text-[#A599FF] shrink-0 font-mono mt-0.5">~</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* UNKNOWN Column */}
        <div className="p-4 rounded-xl bg-[#161922] border border-[#E8B86A]/30 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262A34]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8B86A]/20 text-[#E8B86A] flex items-center justify-center text-xs font-bold font-mono">
                ?
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-[#E8B86A]">
                UNKNOWN
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#9A9EAA]">Information Gap</span>
          </div>

          <ul className="space-y-2.5 text-xs text-[#F4F5F7] flex-1">
            {unknown.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#08090C]/50 p-2.5 rounded-lg border border-[#262A34]">
                <span className="text-[#E8B86A] shrink-0 font-mono font-bold mt-0.5">?</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
