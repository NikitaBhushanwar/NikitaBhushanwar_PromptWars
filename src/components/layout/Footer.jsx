import { Eye } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-[#262A34] bg-[#08090C] py-12 text-[#9A9EAA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#161922] border border-[#262A34] flex items-center justify-center">
            <Eye className="w-3.5 h-3.5 text-[#7C6CF5]" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4F5F7]">
              The Blind Spot
            </span>
            <p className="text-[11px] text-[#9A9EAA] mt-0.5">
              You decide. We help you see more clearly.
            </p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-[#F4F5F7] font-medium">
            "The AI doesn't make the decision. It makes the thinking better."
          </p>
          <p className="text-[11px] text-[#4E5465] mt-1">
            Phase 1 Architecture • Gemini Reasoner Engine Scheduled for Phase 2
          </p>
        </div>
      </div>
    </footer>
  )
}
