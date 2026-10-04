import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
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
import { ReflectionQuestions } from "../components/results/ReflectionQuestions"
import { BeforeAfter } from "../components/results/BeforeAfter"

export function ResultsPage() {
  const { analysis, decisionData, userProfile } = useSession()

  // If no analysis is loaded in session, safely provide the structured shell from current decisionData
  const activeAudit =
    analysis || analysisService.generateShellAudit(decisionData, userProfile)

  // Epistemic breakdown derivation
  const knownItems = (activeAudit.knownAssumedUnknown?.known?.length > 0)
    ? activeAudit.knownAssumedUnknown.known
    : (activeAudit.facts || []).map(f => typeof f === "string" ? f : f.statement || "")

  const assumedItems = (activeAudit.knownAssumedUnknown?.assumed?.length > 0)
    ? activeAudit.knownAssumedUnknown.assumed
    : (activeAudit.assumptions || []).map(a => typeof a === "string" ? a : a.assumption || "")

  const unknownItems = (activeAudit.knownAssumedUnknown?.unknown?.length > 0)
    ? activeAudit.knownAssumedUnknown.unknown
    : (activeAudit.information_gaps || []).map(g => typeof g === "string" ? g : g.missing_information || g.missingInfo || "")

  // Check if live analysis was generated
  const isLiveAudit = Boolean(analysis && !analysis._isFallback)

  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-14">
      <Container size="default">
        {/* Navigation Breadcrumb / Control bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#262A34]">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">
              Decision Audit
            </Badge>
            <span className="text-xs text-[#9A9EAA] font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#63D5E8]" />
              {isLiveAudit ? "Google Gemini Reasoning Engine" : "Structured Decision Shell"}
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
            decisionTitle={decisionData.title || "Your Decision Under Review"}
            summary={activeAudit.summary || activeAudit.what_we_heard || activeAudit.whatWeHeard}
            isShellPreview={!isLiveAudit}
          />
        </div>

        <div className="space-y-8 mt-8">
          {/* 2. What We Heard */}
          <WhatWeHeard
            context={activeAudit.what_we_heard || activeAudit.whatWeHeard || decisionData.detailedContext}
            options={decisionData.options}
            currentLeaning={decisionData.currentLeaning}
            confidence={decisionData.confidence}
            priorities={activeAudit.priorities || decisionData.factors || []}
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
            known={knownItems}
            assumed={assumedItems}
            unknown={unknownItems}
          />

          {/* 15. Blind Spot Map */}
          <BlindSpotMap
            decisionTitle={decisionData.title || "Core Decision"}
            reasoningMap={activeAudit.reasoning_map || activeAudit.reasoningMap}
            visibleFactors={activeAudit.priorities || ["Money", "Career", "Learning", "Time"]}
          />

          {/* 5. Potential Blind Spots */}
          <BlindSpotsSection
            blindSpots={activeAudit.potential_blind_spots || activeAudit.blindSpots || []}
          />

          {/* 4. Underlying Assumptions */}
          <AssumptionsSection
            assumptions={activeAudit.assumptions || []}
          />

          {/* 6. Overlooked Factors */}
          <OverlookedFactors
            factors={activeAudit.overlooked_factors || activeAudit.overlookedFactors || []}
          />

          {/* 7. Reasoning Tensions */}
          <ReasoningTensions
            tensions={activeAudit.reasoning_tensions || activeAudit.reasoningTensions || []}
          />

          {/* 8. Information Gaps */}
          <InformationGaps
            gaps={activeAudit.information_gaps || activeAudit.informationGaps || []}
          />

          {/* 9. Alternative Perspectives */}
          <PerspectivesSection
            perspectives={activeAudit.alternative_perspectives || activeAudit.perspectives || []}
          />

          {/* 10. Challenge My Reasoning CTA Banner */}
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

          {/* 11. What Would Change Your Mind? */}
          <WhatWouldChangeYourMind
            conditions={activeAudit.what_would_change_your_mind || activeAudit.whatWouldChangeMyMind || []}
          />

          {/* 12. Pre-Mortem */}
          <PremortemSection
            premortem={activeAudit.pre_mortem || activeAudit.preMortem}
          />

          {/* 13. Reversibility */}
          <ReversibilitySection
            reversibility={activeAudit.reversibility}
          />

          {/* 14. Timeline / Future Lens */}
          <TimelineSection
            timeline={activeAudit.timeline}
          />

          {/* 16. What to Consider */}
          <ConsiderationsSummary
            considerations={activeAudit.what_to_consider || activeAudit.considerations || []}
          />

          {/* 17. Reflection Questions */}
          <ReflectionQuestions
            questions={activeAudit.reflection_questions || activeAudit.reflectionQuestions || []}
          />

          {/* Before vs After */}
          <BeforeAfter />

          {/* Sovereign Principle / You Decide Banner */}
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
