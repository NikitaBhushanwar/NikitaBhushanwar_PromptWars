import { motion } from "framer-motion"
import { Eye, HelpCircle, Layers, ArrowDown } from "lucide-react"

export function ReasoningLayersVisual() {
  const visibleNodes = [
    { label: "Decision", tag: "Focal Point", color: "border-[#7C6CF5]/60 bg-[#7C6CF5]/10 text-[#F4F5F7]" },
    { label: "Money", tag: "Liquid Comp", color: "border-[#262A34] bg-[#161922] text-[#F4F5F7]" },
    { label: "Career", tag: "Stated Title", color: "border-[#262A34] bg-[#161922] text-[#F4F5F7]" },
    { label: "Time", tag: "Immediate Deadline", color: "border-[#262A34] bg-[#161922] text-[#F4F5F7]" }
  ]

  const hiddenNodes = [
    { label: "Opportunity Cost", tag: "Unstated Trade-offs", icon: HelpCircle, color: "border-[#E8B86A]/40 bg-[#E8B86A]/10 text-[#E8B86A]" },
    { label: "Mentorship", tag: "Feedback Velocity", icon: HelpCircle, color: "border-[#63D5E8]/40 bg-[#63D5E8]/10 text-[#63D5E8]" },
    { label: "Long-Term Impact", tag: "10-Year Trajectory", icon: HelpCircle, color: "border-[#E8B86A]/40 bg-[#E8B86A]/10 text-[#E8B86A]" },
    { label: "Academic Impact", tag: "Mastery & Research", icon: HelpCircle, color: "border-[#63D5E8]/40 bg-[#63D5E8]/10 text-[#63D5E8]" }
  ]

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#101218] border border-[#262A34] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#F4F5F7 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Header bar of the visual */}
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#7C6CF5]" aria-hidden="true" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#9A9EAA]">
            Reasoning Architecture Lens
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#63D5E8] animate-pulse" />
          <span className="text-[#9A9EAA]">Visible</span>
          <span className="mx-1 text-[#262A34]">•</span>
          <span className="w-2 h-2 rounded-full bg-[#E8B86A]" />
          <span className="text-[#E8B86A]">Underneath</span>
        </div>
      </div>

      {/* Layer 1: Visible Reasoning */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4F5F7] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#63D5E8]" />
              What You See
            </span>
            <span className="text-[11px] text-[#9A9EAA]">(Surface Reasoning)</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-[#161922] text-[#9A9EAA] px-2 py-0.5 rounded border border-[#262A34]">
            First-Order
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {visibleNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded-lg border ${node.color} flex flex-col justify-between transition-all`}
            >
              <span className="text-xs font-semibold">{node.label}</span>
              <span className="text-[10px] text-[#9A9EAA] mt-1 font-mono">{node.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider / Depth Transition */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-[#262A34]" />
        </div>
        <div className="relative bg-[#101218] px-3 py-1 rounded-full border border-[#262A34] text-[11px] text-[#9A9EAA] font-mono flex items-center gap-1.5 shadow-sm">
          <ArrowDown className="w-3 h-3 text-[#E8B86A] animate-bounce" />
          <span>The Blind Spot Boundary</span>
        </div>
      </div>

      {/* Layer 2: Hidden / Subterranean Reasoning */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B86A] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#E8B86A]" />
              What's Underneath
            </span>
            <span className="text-[11px] text-[#9A9EAA]">(Overlooked Factors & Gaps)</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-[#161922] text-[#E8B86A] px-2 py-0.5 rounded border border-[#E8B86A]/30">
            Second-Order
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {hiddenNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className={`p-3 rounded-lg border ${node.color} flex flex-col justify-between hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold">{node.label}</span>
                <span className="text-[10px] font-mono text-[#E8B86A]">?</span>
              </div>
              <span className="text-[10px] text-[#9A9EAA] mt-1 font-mono">{node.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#262A34]/60 text-center">
        <p className="text-xs text-[#9A9EAA] italic">
          "There may be more underneath what you currently see."
        </p>
      </div>
    </div>
  )
}
