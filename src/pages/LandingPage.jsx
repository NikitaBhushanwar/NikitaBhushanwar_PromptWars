import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  RotateCcw,
  Lightbulb
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Card } from "../components/ui/Card"
import { Container } from "../components/common/Container"
import { ReasoningLayersVisual } from "../components/visuals/ReasoningLayersVisual"
import { useSession } from "../hooks/useSession"

export function LandingPage() {
  const navigate = useNavigate()
  const { loadSampleScenario } = useSession()

  const handleQuickDemo = () => {
    loadSampleScenario()
    navigate("/review")
  }

  const steps = [
    {
      num: "01",
      title: "Tell Us",
      desc: "Describe the decision and your reasoning, options, factors, and what you currently know and assume.",
      tag: "Input Stage"
    },
    {
      num: "02",
      title: "Examine",
      desc: "Examine assumptions, blind spots, tensions, and missing information hiding beneath your first-order premises.",
      tag: "Reasoning Audit"
    },
    {
      num: "03",
      title: "Challenge",
      desc: "Explore alternative perspectives, pre-mortems, and thought experiments that pressure-test current thinking.",
      tag: "Stress Testing"
    },
    {
      num: "04",
      title: "You Decide",
      desc: "The AI never chooses for you, never ranks options, and never scores your decision. You remain the sole authority.",
      tag: "Human Agency"
    }
  ]

  const trustPrinciples = [
    {
      title: "AI Can Misunderstand",
      desc: "Reasoning models interpret your stated words. If a premise is misconstrued, you can refine your inputs anytime.",
      icon: HelpCircle
    },
    {
      title: "Possibilities, Not Absolute Truths",
      desc: "Audit findings represent hypotheses and angles worth exploring, never definitive verdicts or prescriptions.",
      icon: Lightbulb
    },
    {
      title: "You Can Correct & Re-Audit",
      desc: "Iterative thinking is encouraged. Edit your constraints and options at any point to generate fresh angles.",
      icon: RotateCcw
    },
    {
      title: "Full Human Autonomy",
      desc: "The system will never say 'You should choose Option A'. Better decisions come from clearer thinking, not outsourced judgment.",
      icon: ShieldCheck
    }
  ]

  return (
    <div className="flex flex-col gap-20 sm:gap-28 py-10 sm:py-16">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading">
        <Container size="wide">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="primary" size="md">
                Reasoning Audit • Phase 1
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F5F7] leading-[1.15]"
            >
              What if the most important part of your decision is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A599FF] via-[#7C6CF5] to-[#63D5E8]">
                what you haven't considered?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#9A9EAA] max-w-2xl leading-relaxed"
            >
              An AI-powered reasoning audit that helps uncover assumptions, overlooked factors,
              information gaps, and questions hiding behind your thinking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3 pt-2"
            >
              <Link to="/onboarding">
                <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                  Begin Your Analysis
                </Button>
              </Link>
              <Button size="lg" variant="secondary" onClick={handleQuickDemo}>
                Load Sample Scenario
              </Button>
            </motion.div>

            <p className="text-xs font-mono text-[#9A9EAA] pt-1">
              "You decide. We help you see more clearly."
            </p>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 sm:mt-16"
          >
            <ReasoningLayersVisual />
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" aria-labelledby="how-it-works-heading">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <Badge variant="cyan" size="sm">
              The 4-Step Process
            </Badge>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
              How the Reasoning Audit Works
            </h2>
            <p className="text-sm text-[#9A9EAA]">
              A structured inquiry designed to elevate your critical thinking without encroaching on your autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, idx) => (
              <Card
                key={s.num}
                variant="default"
                padding="md"
                className="flex flex-col justify-between hover:border-[#383E4D] transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#7C6CF5]">
                      {s.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-[#161922] text-[#9A9EAA] px-2 py-0.5 rounded border border-[#262A34]">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F5F7] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#9A9EAA] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#262A34]/50 flex items-center gap-1.5 text-[11px] font-mono text-[#63D5E8]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" aria-labelledby="philosophy-heading">
        <Container size="default">
          <div className="rounded-2xl bg-[#101218] border border-[#262A34] p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl space-y-6">
              <Badge variant="amber" size="sm">
                Foundational Philosophy
              </Badge>

              <blockquote className="text-2xl sm:text-3xl font-bold text-[#F4F5F7] tracking-tight leading-snug">
                "The AI doesn't make the decision.
                <br />
                <span className="text-[#E8B86A]">It makes the thinking better."</span>
              </blockquote>

              <p className="text-sm sm:text-base text-[#9A9EAA] leading-relaxed">
                Most AI decision tools try to give you an answer. They recommend an option, assign a synthetic confidence score, or rank alternatives according to an opaque utility function.
              </p>

              <p className="text-sm sm:text-base text-[#9A9EAA] leading-relaxed">
                <strong className="text-[#F4F5F7]">The Blind Spot rejects this premise.</strong> A high-stakes career, financial, or educational decision cannot be outsourced. The purpose of this system is not to change your mind, but to ensure that whatever you choose, you do so with your eyes wide open to what was previously unconsidered.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#F4F5F7]">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#161922] border border-[#262A34]">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No Decision Scoring</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#161922] border border-[#262A34]">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No Ranked Options</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#161922] border border-[#262A34]">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Assumptions Illuminated</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#161922] border border-[#262A34]">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Blind Spots Questioned</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust & About Section */}
      <section id="about" aria-labelledby="trust-heading">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge variant="primary" size="sm">
              Trust & Calibration
            </Badge>
            <h2 id="trust-heading" className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
              Engineered for Intellectual Honesty
            </h2>
            <p className="text-sm text-[#9A9EAA]">
              How we maintain transparency, respect user agency, and prepare for multi-turn reasoning refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPrinciples.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} variant="default" padding="md" className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#161922] border border-[#262A34] flex items-center justify-center text-[#7C6CF5]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F5F7]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9EAA] leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Final Call to Action */}
      <section aria-labelledby="final-cta-heading">
        <Container size="default">
          <div className="rounded-2xl bg-gradient-to-b from-[#161922] to-[#101218] border border-[#262A34] p-8 sm:p-12 text-center flex flex-col items-center space-y-6">
            <h2 id="final-cta-heading" className="text-2xl sm:text-4xl font-bold text-[#F4F5F7] tracking-tight">
              See what your reasoning might be missing.
            </h2>
            <p className="text-sm sm:text-base text-[#9A9EAA] max-w-lg">
              Begin your structured decision audit. Clarify your assumptions, pressure-test your premises, and decide with confidence.
            </p>
            <Link to="/onboarding">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                Begin Your Analysis
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
