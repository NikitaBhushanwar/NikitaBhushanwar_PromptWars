import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
import { useSession } from "../hooks/useSession"
import { Container } from "../components/common/Container"
import { PageHeader } from "../components/common/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"

export function OnboardingPage() {
  const navigate = useNavigate()
  const { userProfile, updateUserProfile } = useSession()

  const [name, setName] = useState(userProfile.name || "")
  const [role, setRole] = useState(userProfile.role || "Working Professional")
  const [customRole, setCustomRole] = useState(userProfile.customRole || "")
  const [context, setContext] = useState(userProfile.context || "")
  const [areasOfFocus, setAreasOfFocus] = useState(
    userProfile.areasOfFocus || ["Learning & Mastery", "Financial Security"]
  )
  const [error, setError] = useState("")

  const roleOptions = [
    "Working Professional",
    "Student",
    "Entrepreneur",
    "Freelancer",
    "Researcher",
    "Other"
  ]

  const suggestedFocusAreas = [
    "Learning & Mastery",
    "Financial Security",
    "Mentorship & Guidance",
    "Long-term Autonomy",
    "Velocity of Execution",
    "Work-Life Equilibrium",
    "Reputation & Network",
    "Downside Risk Minimization"
  ]

  const toggleFocusArea = (area) => {
    if (areasOfFocus.includes(area)) {
      setAreasOfFocus(areasOfFocus.filter((a) => a !== area))
    } else {
      setAreasOfFocus([...areasOfFocus, area])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please share what we should call you")
      return
    }

    updateUserProfile({
      name: name.trim(),
      role,
      customRole: role === "Other" ? customRole.trim() : "",
      context: context.trim(),
      areasOfFocus
    })

    navigate("/decision")
  }

  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        <PageHeader
          badge="Personalization"
          badgeVariant="primary"
          title="Give us enough context to understand you"
          subtitle="No passwords or accounts. We only need the baseline context of who is making this decision to tailor the audit's perspectives."
        />

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <Card variant="default" padding="lg" className="space-y-6">
            {/* Name Input */}
            <Input
              label="What should we call you?"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError("")
              }}
              error={error}
              required
              helperText="Used to address you during the reasoning audit."
            />

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] block">
                Primary Role / Profession
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roleOptions.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                      role === r
                        ? "bg-[#7C6CF5]/15 border-[#7C6CF5] text-[#F4F5F7] shadow-sm"
                        : "bg-[#161922] border-[#262A34] text-[#9A9EAA] hover:text-[#F4F5F7] hover:border-[#383E4D]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {role === "Other" && (
                <div className="pt-2">
                  <Input
                    placeholder="Specify your role or discipline"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Current Context */}
            <Textarea
              label="Current Life / Professional Context (Optional)"
              placeholder="e.g. Software engineer with 4 years experience at an early-stage startup, evaluating compensation vs mentorship."
              rows={3}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              helperText="A sentence or two describing your current situation and constraints."
            />

            {/* Areas that generally matter */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] block">
                Areas that generally matter most to you
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedFocusAreas.map((area) => {
                  const isSelected = areasOfFocus.includes(area)
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#63D5E8]/15 border-[#63D5E8] text-[#F4F5F7]"
                          : "bg-[#161922] border-[#262A34] text-[#9A9EAA] hover:text-[#F4F5F7] hover:border-[#383E4D]"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {area}
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-[#9A9EAA] mt-1">
                Select the core values that calibrate how we audit your trade-offs.
              </p>
            </div>
          </Card>

          {/* Interactive Personalized Feedback Banner */}
          {name.trim() && (
            <div className="p-4 rounded-xl bg-[#161922] border border-[#7C6CF5]/30 flex items-center gap-3 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#7C6CF5] shrink-0" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#F4F5F7]">
                Hi, <strong className="text-[#A599FF]">{name.trim()}</strong>. Let's look at this decision from another angle.
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-xs text-[#9A9EAA] hover:text-[#F4F5F7] transition-colors cursor-pointer"
            >
              ← Back to Home
            </button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue to Decision Setup
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}
