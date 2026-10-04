import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, CheckCircle2, ArrowRight, Loader2, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react"
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
  "Checking for overlooked factors...",
  "Finding information gaps...",
  "Generating questions to explore...",
  "Preparing your reflection...",
  "Your decision audit is ready."
]

export function AnalyzePage() {
  const navigate = useNavigate()
  const { decisionData, userProfile, setAnalysis } = useSession()

  const [currentStageIdx, setCurrentStageIdx] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const stageIntervalRef = useRef(null)
  const isMountedRef = useRef(true)

  // Redirect to /decision if accessed without decision data
  useEffect(() => {
    if (!decisionData || !decisionData.title) {
      navigate("/decision")
    }
  }, [decisionData, navigate])

  const executeAnalysis = useCallback(async () => {
    setIsComplete(false)
    setErrorMessage("")
    setCurrentStageIdx(0)

    // Progress through high-level stage messages smoothly
    stageIntervalRef.current = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < STAGES.length - 2) {
          return prev + 1
        }
        return prev
      })
    }, 900)

    try {
      const liveResult = await analysisService.executeLiveGeminiAudit(decisionData, userProfile)
      
      if (!isMountedRef.current) return

      clearInterval(stageIntervalRef.current)
      setCurrentStageIdx(STAGES.length - 1) // "Your decision audit is ready."
      setAnalysis(liveResult)
      setIsComplete(true)

    } catch (err) {
      if (!isMountedRef.current) return

      clearInterval(stageIntervalRef.current)
      const message = err.message || "Unable to complete the analysis right now. Please try again."
      setErrorMessage(message)
    }
  }, [decisionData, userProfile, setAnalysis])

  useEffect(() => {
    isMountedRef.current = true
    if (decisionData?.title) {
      const timer = setTimeout(() => {
        executeAnalysis()
      }, 50)
      return () => {
        clearTimeout(timer)
        isMountedRef.current = false
        if (stageIntervalRef.current) {
          clearInterval(stageIntervalRef.current)
        }
      }
    }
  }, [decisionData?.title, executeAnalysis])

  const handleProceedToResults = () => {
    navigate("/results")
  }

  const handleUsePreviewShell = () => {
    const shellData = analysisService.generateShellAudit(decisionData, userProfile)
    setAnalysis(shellData)
    navigate("/results")
  }

  const progressPercentage = Math.round(((currentStageIdx + 1) / STAGES.length) * 100)

  return (
    <div className="py-12 sm:py-20 flex-1 flex items-center justify-center">
      <Container size="narrow">
        <Card variant="default" padding="lg" className="text-center space-y-8 relative overflow-hidden">
          {/* Radar / Pulsing Ring Visual */}
          <div className="flex justify-center pt-4">
            <div className="relative flex items-center justify-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  errorMessage
                    ? "bg-red-500/10 border border-red-500/30"
                    : isComplete
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-[#7C6CF5]/10 border border-[#7C6CF5]/30 animate-pulse"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[#161922] border border-[#262A34] flex items-center justify-center">
                  {errorMessage ? (
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  ) : isComplete ? (
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
            <Badge
              variant={errorMessage ? "neutral" : isComplete ? "success" : "primary"}
              size="sm"
            >
              {errorMessage
                ? "Analysis Encountered an Issue"
                : isComplete
                ? "Reasoning Audit Ready"
                : "Google Gemini Reasoning Engine"}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
              {errorMessage
                ? "Analysis Incomplete"
                : isComplete
                ? "Your Decision Audit is Prepared"
                : "Auditing Your Decision Architecture"}
            </h1>

            <p className="text-xs sm:text-sm text-[#9A9EAA] max-w-md mx-auto leading-relaxed">
              {errorMessage
                ? "We were unable to complete the live reasoning audit from Google Gemini."
                : isComplete
                ? "Your stated options, assumptions, and blind spots have been synthesized without ranking or recommendation."
                : "Examining your stated options, visible assumptions, and hidden inquiry zones."}
            </p>
          </div>

          {/* Progress / Status display if not error */}
          {!errorMessage ? (
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
          ) : (
            /* Error State Notice */
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Notice</span>
              </div>
              <p className="text-[#F4F5F7] leading-relaxed text-[11px]">
                {errorMessage}
              </p>
              {errorMessage.includes("API key") && (
                <p className="text-[#9A9EAA] text-[10px] pt-1 border-t border-red-500/20">
                  Tip: Provide <code className="bg-[#08090C] px-1 py-0.5 rounded text-[#E8B86A]">GEMINI_API_KEY</code> in your environment to enable live AI reasoning.
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {errorMessage ? (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate("/review")}
                  icon={ArrowLeft}
                >
                  Return to Review
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={executeAnalysis}
                  icon={RefreshCw}
                >
                  Retry Analysis
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleUsePreviewShell}
                >
                  Preview with Shell Data
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </Card>
      </Container>
    </div>
  )
}
