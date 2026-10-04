import { Sparkles } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function ReflectionQuestions({ questions = [] }) {
  if (!questions || questions.length === 0) return null

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#7C6CF5]">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Tailored Reflection Inquiries</h3>
            <p className="text-xs text-[#9A9EAA]">
              Open-ended questions surfaced by the reasoning audit to deepen your deliberation
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Self-Deliberation</Badge>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#161922] border border-[#262A34] flex items-start gap-3.5 hover:border-[#7C6CF5]/40 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#7C6CF5]/15 border border-[#7C6CF5]/30 text-[#A599FF] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm text-[#F4F5F7] font-medium leading-relaxed">
              "{q}"
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
