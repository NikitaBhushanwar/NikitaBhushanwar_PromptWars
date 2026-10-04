import { RefreshCw } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function WhatWouldChangeYourMind({ conditions = [] }) {
  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-[#E8B86A]">
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">What Would Change Your Mind?</h3>
            <p className="text-xs text-[#9A9EAA]">
              Falsifiability test: Defining evidence thresholds that would alter your preference
            </p>
          </div>
        </div>
        <Badge variant="amber" size="sm">Falsifiability</Badge>
      </div>

      <div className="space-y-2.5">
        {conditions.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] flex items-start gap-3 text-xs sm:text-sm text-[#F4F5F7]"
          >
            <span className="font-mono text-[#E8B86A] font-bold mt-0.5">0{idx + 1}.</span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
