import { CheckCircle, Shield } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export function FactsSection({ facts = [] }) {
  if (!facts || facts.length === 0) return null

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-emerald-400">
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#F4F5F7]">Established Facts & Baseline Parameters</h3>
            <p className="text-xs text-[#9A9EAA]">Empirical anchors and verified constraints you provided</p>
          </div>
        </div>
        <Badge variant="success" size="sm">
          Empirical Anchors
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {facts.map((fact) => (
          <div
            key={fact.id}
            className="p-3.5 rounded-xl bg-[#161922] border border-[#262A34] flex flex-col justify-between"
          >
            <p className="text-xs text-[#F4F5F7] leading-relaxed">
              {fact.statement}
            </p>
            {fact.source && (
              <div className="pt-2 mt-2 border-t border-[#262A34]/60 flex items-center gap-1.5 text-[10px] font-mono text-[#9A9EAA]">
                <Shield className="w-3 h-3 text-[#63D5E8]" />
                <span>Source: {fact.source}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
