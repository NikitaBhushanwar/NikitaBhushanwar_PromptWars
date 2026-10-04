import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Trash2, ArrowRight, ArrowLeft, HelpCircle } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { PageHeader } from "../components/common/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"

export function DecisionPage() {
  const navigate = useNavigate()
  const { decisionData, updateDecisionData, userProfile } = useSession()

  const [title, setTitle] = useState(decisionData.title || "")
  const [detailedContext, setDetailedContext] = useState(decisionData.detailedContext || "")
  const [options, setOptions] = useState(
    decisionData.options && decisionData.options.length >= 2
      ? decisionData.options
      : [
          { id: "opt-1", label: "Option A", text: "" },
          { id: "opt-2", label: "Option B", text: "" }
        ]
  )
  const [knownFacts, setKnownFacts] = useState(decisionData.knownFacts || "")
  const [uncertainties, setUncertainties] = useState(decisionData.uncertainties || "")
  const [factors, setFactors] = useState(
    decisionData.factors || ["Career", "Money", "Time", "Learning"]
  )
  const [customFactorInput, setCustomFactorInput] = useState("")
  const [leaningReason, setLeaningReason] = useState(decisionData.leaningReason || "")
  const [primaryPriority, setPrimaryPriority] = useState(decisionData.primaryPriority || "")
  const [currentLeaning, setCurrentLeaning] = useState(decisionData.currentLeaning || "Not sure")
  const [confidence, setConfidence] = useState(decisionData.confidence ?? 50)
  const [errors, setErrors] = useState({})

  const suggestedFactors = [
    "Career",
    "Education",
    "Money",
    "Time",
    "Learning",
    "Location",
    "Family",
    "Stability",
    "Personal Growth",
    "Autonomy",
    "Reputation"
  ]

  const handleAddOption = () => {
    const nextIdx = options.length
    const labelLetter = String.fromCharCode(65 + nextIdx) // 'A', 'B', 'C', ...
    setOptions([
      ...options,
      {
        id: `opt-${Date.now()}`,
        label: `Option ${labelLetter}`,
        text: ""
      }
    ])
  }

  const handleRemoveOption = (id) => {
    if (options.length <= 2) return
    setOptions(options.filter((o) => o.id !== id))
  }

  const handleOptionChange = (id, text) => {
    setOptions(
      options.map((o) => (o.id === id ? { ...o, text } : o))
    )
  }

  const toggleFactor = (f) => {
    if (factors.includes(f)) {
      setFactors(factors.filter((item) => item !== f))
    } else {
      setFactors([...factors, f])
    }
  }

  const handleAddCustomFactor = (e) => {
    e.preventDefault()
    if (customFactorInput.trim() && !factors.includes(customFactorInput.trim())) {
      setFactors([...factors, customFactorInput.trim()])
      setCustomFactorInput("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Please state the decision you are considering"
    }

    if (!detailedContext.trim()) {
      newErrors.detailedContext = "Please describe the background and what is happening"
    }

    const emptyOptions = options.some((o) => !o.text.trim())
    if (emptyOptions) {
      newErrors.options = "Please provide descriptions for all listed options"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    updateDecisionData({
      title: title.trim(),
      detailedContext: detailedContext.trim(),
      options,
      knownFacts: knownFacts.trim(),
      uncertainties: uncertainties.trim(),
      factors,
      leaningReason: leaningReason.trim(),
      primaryPriority: primaryPriority.trim(),
      currentLeaning,
      confidence
    })

    navigate("/review")
  }

  return (
    <div className="py-8 sm:py-12">
      <Container size="default">
        <PageHeader
          badge="Decision Architecture"
          badgeVariant="primary"
          title="Structure Your Decision"
          subtitle={
            userProfile.name
              ? `${userProfile.name}, define the visible parameters of your decision so we can examine what lies beneath.`
              : "Define the visible parameters of your decision so we can examine what lies beneath."
          }
        />

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {/* SECTION 1: YOUR DECISION */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#63D5E8]">
                Section 01
              </span>
              <h2 className="text-lg font-bold text-[#F4F5F7]">Your Decision</h2>
            </div>

            <Input
              label="What decision are you considering?"
              placeholder="e.g. Should I accept an offer at an established Big Tech firm or stay at my current startup?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({ ...errors, title: "" })
              }}
              error={errors.title}
              required
              helperText="Be specific about the core choice you are navigating."
            />

            <Textarea
              label="Tell us what's happening"
              placeholder="Describe the context: who is involved, the urgency, key constraints, and what has led to this moment..."
              rows={4}
              value={detailedContext}
              onChange={(e) => {
                setDetailedContext(e.target.value)
                if (errors.detailedContext) setErrors({ ...errors, detailedContext: "" })
              }}
              error={errors.detailedContext}
              required
              helperText="Share the narrative behind the choice. The richer your context, the deeper the reasoning audit."
            />
          </Card>

          {/* SECTION 2: YOUR OPTIONS */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#262A34] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C6CF5]">
                  Section 02
                </span>
                <h2 className="text-lg font-bold text-[#F4F5F7]">Your Options</h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOption}
                icon={Plus}
              >
                Add Another Option
              </Button>
            </div>

            <p className="text-xs text-[#9A9EAA]">
              Define at least two concrete alternatives. We do not restrict you to binary choices.
            </p>

            {errors.options && (
              <p className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                {errors.options}
              </p>
            )}

            <div className="space-y-3.5">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className="p-4 rounded-xl bg-[#161922] border border-[#262A34] space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#A599FF]">
                      {opt.label}
                    </span>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(opt.id)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                        title="Remove this option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Remove</span>
                      </button>
                    )}
                  </div>
                  <Input
                    placeholder={`Describe ${opt.label}... (e.g. compensation, role, team dynamic)`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 3: YOUR CONTEXT */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#63D5E8]">
                Section 03
              </span>
              <h2 className="text-lg font-bold text-[#F4F5F7]">Your Context</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="What do you already know? (Confirmed facts)"
                placeholder="e.g. Verified offer details, contract length, runway, deadlines..."
                rows={3}
                value={knownFacts}
                onChange={(e) => setKnownFacts(e.target.value)}
                helperText="Hard constraints and verified data."
              />

              <Textarea
                label="What are you uncertain about?"
                placeholder="e.g. Actual team culture, long-term equity value, personal burnout..."
                rows={3}
                value={uncertainties}
                onChange={(e) => setUncertainties(e.target.value)}
                helperText="Open questions and unknowns you have not verified."
              />
            </div>

            {/* Factors influencing thinking */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] block">
                What factors are influencing your thinking?
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedFactors.map((f) => {
                  const isSelected = factors.includes(f)
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFactor(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#7C6CF5]/15 border-[#7C6CF5] text-[#F4F5F7]"
                          : "bg-[#161922] border-[#262A34] text-[#9A9EAA] hover:text-[#F4F5F7] hover:border-[#383E4D]"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {f}
                    </button>
                  )
                })}
              </div>

              {/* Add custom factor */}
              <div className="flex items-center gap-2 pt-2 max-w-sm">
                <input
                  type="text"
                  placeholder="+ Add custom factor..."
                  value={customFactorInput}
                  onChange={(e) => setCustomFactorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddCustomFactor(e)
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#161922] border border-[#262A34] text-xs text-[#F4F5F7] placeholder-[#4E5465] w-full outline-none focus:border-[#7C6CF5]"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddCustomFactor}
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* SECTION 4: YOUR REASONING */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="border-b border-[#262A34] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8B86A]">
                Section 04
              </span>
              <h2 className="text-lg font-bold text-[#F4F5F7]">Your Reasoning</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Why are you currently leaning this way?"
                placeholder="Explain the logic or intuition guiding your current preference..."
                rows={3}
                value={leaningReason}
                onChange={(e) => setLeaningReason(e.target.value)}
                helperText="Your working hypothesis or current premise."
              />

              <Input
                label="What matters most in this decision?"
                placeholder="e.g. Velocity of learning, financial runway, stability..."
                value={primaryPriority}
                onChange={(e) => setPrimaryPriority(e.target.value)}
                helperText="Your primary North Star value for this choice."
              />
            </div>

            {/* Where are you currently leaning */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] block">
                Where are you currently leaning?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...options.map((o) => o.label), "Somewhere between", "Not sure"].map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setCurrentLeaning(choice)}
                    className={`p-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      currentLeaning === choice
                        ? "bg-[#E8B86A]/15 border-[#E8B86A] text-[#F4F5F7]"
                        : "bg-[#161922] border-[#262A34] text-[#9A9EAA] hover:text-[#F4F5F7] hover:border-[#383E4D]"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>

            {/* Confidence Slider */}
            <div className="space-y-2.5 pt-4 border-t border-[#262A34]/60">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#F4F5F7]">
                  How confident are you in your current thinking?
                </span>
                <span className="font-mono text-sm font-bold text-[#63D5E8]">
                  {confidence}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-[#161922] rounded-lg appearance-none cursor-pointer accent-[#7C6CF5]"
                aria-label="Confidence in current thinking"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#9A9EAA]">
                <span>Low Certainty (0%)</span>
                <span>Moderate (50%)</span>
                <span>High Conviction (100%)</span>
              </div>

              <div className="p-3 rounded-lg bg-[#08090C] border border-[#262A34] text-[11px] text-[#9A9EAA] flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#63D5E8] shrink-0" />
                <span>
                  Self-reflection indicator only. We never evaluate or calculate an AI decision score.
                </span>
              </div>
            </div>
          </Card>

          {/* Form Navigation Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/onboarding")}
            >
              Back to Personalization
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Review My Decision
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}
