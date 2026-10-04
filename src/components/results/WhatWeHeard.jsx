import { MessageSquareText } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function WhatWeHeard({ context, options = [], currentLeaning, confidence, priorities = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-5">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#63D5E8]">
            <MessageSquareText className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">What We Heard</h3>
            <p className="text-xs text-[#9A9EAA]">Synthesis of your stated situation and premises</p>
          </div>
        </div>
        <Badge variant="cyan" size="sm">Stated Context</Badge>
      </div>

      <div className="text-sm text-[#F4F5F7] leading-relaxed bg-[#161922] p-4 rounded-xl border border-[#262A34]">
        {context || "No context was provided for this decision."}
      </div>

      {/* Options Grid */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#9A9EAA] mb-2.5">
          Considered Options
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt, i) => (
            <div
              key={opt.id || i}
              className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] text-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-[#7C6CF5] mb-1.5">
                <span>{opt.label || `Option ${i + 1}`}</span>
                {currentLeaning === opt.label && (
                  <span className="text-[10px] text-[#E8B86A] bg-[#E8B86A]/10 px-2 py-0.5 rounded border border-[#E8B86A]/20">
                    Currently Leaning
                  </span>
                )}
              </div>
              <p className="text-[#F4F5F7] font-medium leading-normal">
                {opt.text || "Pending description"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Priorities and Confidence metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] text-xs">
          <span className="text-[11px] font-mono uppercase text-[#9A9EAA] block mb-2">
            Stated Influencing Factors
          </span>
          <div className="flex flex-wrap gap-1.5">
            {priorities.map((factor) => (
              <span
                key={factor}
                className="px-2 py-0.5 rounded bg-[#08090C] border border-[#262A34] text-[11px] text-[#F4F5F7]"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] text-xs flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase text-[#9A9EAA] block mb-1">
            Self-Reported Initial Confidence
          </span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold font-mono text-[#63D5E8]">
              {confidence ?? 50}%
            </span>
            <span className="text-[10px] text-[#9A9EAA] text-right max-w-[160px] leading-tight">
              (Subjective self-assessment, not an AI quality score)
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
