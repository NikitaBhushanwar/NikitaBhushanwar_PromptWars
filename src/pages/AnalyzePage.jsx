import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { Container } from "../components/common/Container"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Progress } from "../components/ui/Progress"
import { useSession } from "../hooks/useSession"
import { analysisService } from "../services/analysisService"

const STAGES = [
  "Understanding your decision...",
  "Mapping your priorities...",
  "Examining your reasoning...",
  "Identifying assumptions...",
  "Looking for potential blind spots...",
  "Checking overlooked factors...",
  "Finding information gaps...",
  "Exploring other perspectives...",
  "Preparing your decision audit..."
]

export function AnalyzePage() {
  const navigate = useNavigate()
  const { decisionData, userProfile, setAnalysis } = useSession()

  const [currentStageIdx, setCurrentStageIdx] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Step through stages with smooth timing
  useEffect(() => {
    if (currentStageIdx < STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStageIdx((prev) => prev + 1)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      const completionTimer = setTimeout(() => {
        // Generate structured shell audit for Phase 1 preview
        const shellData = analysisService.generateShellAudit(decisionData, userProfile)
        setAnalysis(shellData)
        setIsComplete(true)
      }, 800)
      return () => clearTimeout(completionTimer)
    }
  }, [currentStageIdx, decisionData, userProfile, setAnalysis])

  const progressPercentage = Math.round(((currentStageIdx + 1) / STAGES.length) * 100)

  const handleProceedToResults = () => {
    navigate("/results")
  }

  return (
    <div className="py-12 sm:py-20 flex-1 flex items-center justify-center">
      <Container size="narrow">
        <Card variant="default" padding="lg" className="text-center space-y-8 relative overflow-hidden">
          {/* Subtle radar / lens pulse ring */}
          <div className="flex justify-center pt-4">
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#7C6CF5]/10 border border-[#7C6CF5]/30 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-[#161922] border border-[#262A34] flex items-center justify-center">
                  {isComplete ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <Eye className="w-8 h-8 text-[#7C6CF5] animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <Badge variant={isComplete ? "success" : "primary"} size="sm">
              {isComplete ? "Audit Shell Ready" : "Reasoning Audit Engine"}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
              {isComplete
                ? "Your Decision Audit is Prepared"
                : "Auditing Your Decision Architecture"}
            </h1>

            <p className="text-xs sm:text-sm text-[#9A9EAA] max-w-md mx-auto">
              {isComplete
                ? "Your reasoning premises have been mapped according to the Phase 1 schema."
                : "Examining your stated options, visible assumptions, and hidden inquiry zones."}
            </p>
          </div>

          {/* Progress Bar & Stage Indicator */}
          <div className="space-y-3 max-w-md mx-auto">
            <Progress
              value={progressPercentage}
              max={100}
              color={isComplete ? "amber" : "primary"}
              showLabel={true}
              label={isComplete ? "Complete" : "Audit Stage"}
            />

            <div className="h-8 flex items-center justify-center font-mono text-xs sm:text-sm text-[#63D5E8]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStageIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  {!isComplete && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {STAGES[currentStageIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Phase 2 Architecture Notice */}
          <div className="p-4 rounded-xl bg-[#161922] border border-[#262A34] text-xs text-[#9A9EAA] text-left max-w-md mx-auto space-y-1.5">
            <div className="flex items-center gap-2 text-[#F4F5F7] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#7C6CF5]" />
              <span>Phase 1 Verification Shell</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              In Phase 2, this transition stage will interface with the Google Gemini reasoning engine via{" "}
              <code className="bg-[#08090C] px-1 py-0.5 rounded text-[#A599FF]">/api/analyze</code>. The data will stream directly into the standardized Zod results contract.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant={isComplete ? "amber" : "secondary"}
              size="lg"
              disabled={!isComplete}
              onClick={handleProceedToResults}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full max-w-xs"
            >
              {isComplete ? "View Decision Audit" : "Auditing..."}
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}
