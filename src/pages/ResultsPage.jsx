import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { analysisService } from "../services/analysisService"

// Results Modular Components
import { AnalysisOverview } from "../components/results/AnalysisOverview"
import { WhatWeHeard } from "../components/results/WhatWeHeard"
import { FactsSection } from "../components/results/FactsSection"
import { PrioritiesSection } from "../components/results/PrioritiesSection"
import { KnownAssumedUnknown } from "../components/results/KnownAssumedUnknown"
import { AssumptionsSection } from "../components/results/AssumptionsSection"
import { BlindSpotsSection } from "../components/results/BlindSpotsSection"
import { OverlookedFactors } from "../components/results/OverlookedFactors"
import { ReasoningTensions } from "../components/results/ReasoningTensions"
import { InformationGaps } from "../components/results/InformationGaps"
import { PerspectivesSection } from "../components/results/PerspectivesSection"
import { WhatWouldChangeYourMind } from "../components/results/WhatWouldChangeYourMind"
import { PremortemSection } from "../components/results/PremortemSection"
import { ReversibilitySection } from "../components/results/ReversibilitySection"
import { TimelineSection } from "../components/results/TimelineSection"
import { BlindSpotMap } from "../components/visuals/BlindSpotMap"
import { ConsiderationsSummary } from "../components/results/ConsiderationsSummary"
import { BeforeAfter } from "../components/results/BeforeAfter"

export function ResultsPage() {
  const { analysis, decisionData, userProfile } = useSession()

  // If no analysis is loaded, safely generate the schema-compliant shell audit from current decisionData
  const activeAudit =
    analysis || analysisService.generateShellAudit(decisionData, userProfile)

  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-14">
      <Container size="default">
        {/* Navigation Breadcrumb / Control bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#262A34]">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">
              Decision Audit
            </Badge>
            <span className="text-xs text-[#9A9EAA] font-mono">
              Ready for Phase 2 Gemini Injection
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/decision">
              <Button size="sm" variant="outline">
                ← Edit Inputs
              </Button>
            </Link>
            <Link to="/challenge">
              <Button size="sm" variant="primary" icon={ArrowRight} iconPosition="right">
                Challenge My Reasoning
              </Button>
            </Link>
          </div>
        </div>

        {/* 1. Analysis Overview */}
        <div className="mt-8">
          <AnalysisOverview
            decisionTitle={decisionData.title || "Your Career & Direction Inflection Point"}
            summary={activeAudit.summary}
            isShellPreview={true}
          />
        </div>

        <div className="space-y-8 mt-8">
          {/* 2. What We Heard */}
          <WhatWeHeard
            context={decisionData.detailedContext || activeAudit.whatWeHeard}
            options={decisionData.options}
            currentLeaning={decisionData.currentLeaning}
            confidence={decisionData.confidence}
            priorities={activeAudit.priorities}
          />

          {/* 3. Facts */}
          <FactsSection facts={activeAudit.facts || []} />

          {/* 4. Priorities */}
          <PrioritiesSection
            priorities={activeAudit.priorities || []}
            primaryPriority={decisionData.primaryPriority}
          />

          {/* 5. Known / Assumed / Unknown */}
          <KnownAssumedUnknown
            known={activeAudit.knownAssumedUnknown?.known || []}
            assumed={activeAudit.knownAssumedUnknown?.assumed || []}
            unknown={activeAudit.knownAssumedUnknown?.unknown || []}
          />

          {/* 17. Blind Spot Map */}
          <BlindSpotMap
            decisionTitle={decisionData.title || "Core Decision"}
            visibleFactors={activeAudit.priorities || ["Money", "Career", "Learning", "Time"]}
          />

          {/* 7. Potential Blind Spots */}
          <BlindSpotsSection blindSpots={activeAudit.blindSpots || []} />

          {/* 6. Underlying Assumptions */}
          <AssumptionsSection assumptions={activeAudit.assumptions || []} />

          {/* 8. Overlooked Factors */}
          <OverlookedFactors factors={activeAudit.overlookedFactors || []} />

          {/* 9. Reasoning Tensions */}
          <ReasoningTensions tensions={activeAudit.reasoningTensions || []} />

          {/* 10. Information Gaps */}
          <InformationGaps gaps={activeAudit.informationGaps || []} />

          {/* 11. Alternative Perspectives */}
          <PerspectivesSection perspectives={activeAudit.perspectives || []} />

          {/* 12. Challenge My Reasoning CTA Banner */}
          <Card variant="highlight" padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A599FF]">
                Active Stress-Testing
              </span>
              <h3 className="text-lg font-bold text-[#F4F5F7]">
                Ready to pressure-test your premises?
              </h3>
              <p className="text-xs text-[#9A9EAA] max-w-lg">
                Step into the interactive challenge shell to defend or adapt your reasoning against contrarian probes.
              </p>
            </div>
            <Link to="/challenge" className="shrink-0">
              <Button size="md" variant="primary" icon={ArrowRight} iconPosition="right">
                Challenge My Reasoning
              </Button>
            </Link>
          </Card>

          {/* 13. What Would Change Your Mind? */}
          <WhatWouldChangeYourMind conditions={activeAudit.whatWouldChangeMyMind || []} />

          {/* 14. Pre-Mortem */}
          <PremortemSection premortem={activeAudit.preMortem} />

          {/* 15. Reversibility */}
          <ReversibilitySection reversibility={activeAudit.reversibility} />

          {/* 16. Timeline / Future Lens */}
          <TimelineSection timeline={activeAudit.timeline} />

          {/* 18. What to Consider */}
          <ConsiderationsSummary considerations={activeAudit.considerations || []} />

          {/* 21. Before vs After */}
          <BeforeAfter />

          {/* 22. You Decide Banner (Core Philosophy) */}
          <Card variant="default" padding="lg" className="text-center space-y-4 border-[#7C6CF5]/30">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8B86A]">
              Human Sovereignty
            </span>
            <h3 className="text-2xl font-bold text-[#F4F5F7]">
              You Decide. We Help You See More Clearly.
            </h3>
            <p className="text-sm text-[#9A9EAA] max-w-xl mx-auto leading-relaxed">
              The Blind Spot does not choose for you, rank your options, or evaluate your decision. Take these perspectives, review the information gaps, and complete your reflection.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link to="/reflection">
                <Button size="lg" variant="amber" icon={ArrowRight} iconPosition="right">
                  Proceed to Final Reflection
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  )
}
