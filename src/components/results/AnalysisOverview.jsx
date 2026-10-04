import { Shield, Sparkles } from "lucide-react"
import { Badge } from "../ui/Badge"

export function AnalysisOverview({ decisionTitle, summary, isShellPreview = true }) {
  return (
    <div className="w-full rounded-2xl bg-[#101218] border border-[#262A34] p-6 sm:p-8 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#262A34]">
        <div className="flex items-center gap-2.5">
          <Badge variant="primary" size="sm">
            Reasoning Audit Shell
          </Badge>
          <span className="text-xs text-[#9A9EAA] font-mono">
            Phase 1 Contract Compliant
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#E8B86A] bg-[#161922] px-3 py-1.5 rounded-lg border border-[#E8B86A]/20">
          <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Non-Directive: The AI never chooses for you</span>
        </div>
      </div>

      {/* Main summary */}
      <div className="mt-6">
        <span className="text-xs font-mono uppercase tracking-wider text-[#63D5E8]">
          Focal Decision
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#F4F5F7] mt-1 tracking-tight">
          {decisionTitle || "Your Evaluated Decision"}
        </h2>
        <p className="text-sm sm:text-base text-[#9A9EAA] mt-3 leading-relaxed">
          {summary ||
            "This reasoning audit maps your assumptions, illuminates potential blind spots, and identifies critical information gaps before you make a commitment."}
        </p>
      </div>

      {/* Phase 2 Architecture Notice */}
      {isShellPreview && (
        <div className="mt-6 p-3.5 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 flex items-start gap-3 text-xs text-[#9A9EAA]">
          <Sparkles className="w-4 h-4 text-[#7C6CF5] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="text-[#F4F5F7]">Phase 1 Structural Shell:</strong>{" "}
            This results view is populated using the Zod analysis contract schema. In Phase 2, Google Gemini will dynamically inject customized reasoning audits directly into this structure without modifying the UI layer.
          </div>
        </div>
      )}
    </div>
  )
}
