import { useState, useEffect } from "react"
import { SessionContext } from "./sessionContextDef"

const STORAGE_KEY = "the_blind_spot_session_v1"

const initialUserProfile = {
  name: "",
  role: "Working Professional",
  customRole: "",
  context: "",
  areasOfFocus: ["Long-term Growth", "Financial Security", "Learning & Mastery"]
}

const initialDecisionData = {
  title: "",
  detailedContext: "",
  options: [
    { id: "opt-1", label: "Option A", text: "" },
    { id: "opt-2", label: "Option B", text: "" }
  ],
  knownFacts: "",
  uncertainties: "",
  factors: ["Career", "Learning", "Money", "Time"],
  leaningReason: "",
  primaryPriority: "",
  currentLeaning: "Not sure",
  confidence: 50
}

const initialChallengeData = {
  notes: {},
  exploredQuestions: []
}

const initialReflectionData = {
  unconsideredAspect: "",
  thinkingChanged: "A little",
  investigateNext: "",
  notes: ""
}

export function SessionProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_profile`)
      return saved ? JSON.parse(saved) : initialUserProfile
    } catch {
      return initialUserProfile
    }
  })

  const [decisionData, setDecisionData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_decision`)
      return saved ? JSON.parse(saved) : initialDecisionData
    } catch {
      return initialDecisionData
    }
  })

  // In Phase 1, analysis remains null or holds mock preview shell data.
  // Phase 2 will populate this directly from Gemini API service.
  const [analysis, setAnalysis] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_analysis`)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [challengeData, setChallengeData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_challenge`)
      return saved ? JSON.parse(saved) : initialChallengeData
    } catch {
      return initialChallengeData
    }
  })

  const [reflectionData, setReflectionData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_reflection`)
      return saved ? JSON.parse(saved) : initialReflectionData
    } catch {
      return initialReflectionData
    }
  })

  // Persist state across navigation and browser refresh
  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(userProfile))
    } catch (e) {
      console.warn("Session storage quota exceeded or unavailable", e)
    }
  }, [userProfile])

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_decision`, JSON.stringify(decisionData))
    } catch (e) {
      console.warn("Session storage quota exceeded or unavailable", e)
    }
  }, [decisionData])

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_analysis`, JSON.stringify(analysis))
    } catch (e) {
      console.warn("Session storage quota exceeded or unavailable", e)
    }
  }, [analysis])

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_challenge`, JSON.stringify(challengeData))
    } catch (e) {
      console.warn("Session storage quota exceeded or unavailable", e)
    }
  }, [challengeData])

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_reflection`, JSON.stringify(reflectionData))
    } catch (e) {
      console.warn("Session storage quota exceeded or unavailable", e)
    }
  }, [reflectionData])

  const updateUserProfile = (updates) => {
    setUserProfile((prev) => ({ ...prev, ...updates }))
  }

  const updateDecisionData = (updates) => {
    setDecisionData((prev) => ({ ...prev, ...updates }))
  }

  const updateChallengeData = (updates) => {
    setChallengeData((prev) => ({ ...prev, ...updates }))
  }

  const updateReflectionData = (updates) => {
    setReflectionData((prev) => ({ ...prev, ...updates }))
  }

  const resetSession = () => {
    setUserProfile(initialUserProfile)
    setDecisionData(initialDecisionData)
    setAnalysis(null)
    setChallengeData(initialChallengeData)
    setReflectionData(initialReflectionData)
    try {
      sessionStorage.removeItem(`${STORAGE_KEY}_profile`)
      sessionStorage.removeItem(`${STORAGE_KEY}_decision`)
      sessionStorage.removeItem(`${STORAGE_KEY}_analysis`)
      sessionStorage.removeItem(`${STORAGE_KEY}_challenge`)
      sessionStorage.removeItem(`${STORAGE_KEY}_reflection`)
    } catch (e) {
      console.warn("Error clearing session storage", e)
    }
  }

  /**
   * Helper to load an illustrative realistic scenario
   * for seamless reviewer verification without requiring lengthy typing.
   */
  const loadSampleScenario = () => {
    setUserProfile({
      name: "Alex",
      role: "Working Professional",
      customRole: "",
      context: "Software engineer with 4 years of experience weighing a pivotal career inflection point.",
      areasOfFocus: ["Learning & Mastery", "Mentorship", "Financial Security", "Long-term Autonomy"]
    })

    setDecisionData({
      title: "Should I accept an offer at an established Big Tech firm or stay at my current early-stage startup?",
      detailedContext: "I have been at an 18-person AI startup for 2 years as a founding engineer. We recently closed a Series A round, but runway is 18 months. I received an L5 offer from an established cloud infrastructure company in a new city offering a 45% total compensation jump, but less product scope.",
      options: [
        {
          id: "opt-1",
          label: "Option A",
          text: "Accept Big Tech offer: Relocate, $220k compensation, clear ladder, brand credibility, structured mentorship."
        },
        {
          id: "opt-2",
          label: "Option B",
          text: "Stay at Startup: Maintain 1.2% equity, core architecture ownership, close founder relationship, higher execution autonomy."
        }
      ],
      knownFacts: "Offer deadline is in 10 days. The Big Tech package is verified. Current startup has $3.8M cash remaining. Startup equity vesting is 50% completed.",
      uncertainties: "Whether the startup can achieve product-market fit before next round. How bureaucratic Big Tech team day-to-day will actually feel. Long-term value of equity vs guaranteed liquid compensation.",
      factors: ["Career", "Learning", "Money", "Mentorship", "Personal Growth", "Stability"],
      leaningReason: "The compensation bump provides financial peace of mind, but I dread becoming a small cog in a huge machine.",
      primaryPriority: "Accelerating technical judgment and leadership credibility over the next 3-5 years.",
      currentLeaning: "Option A",
      confidence: 62
    })
  }

  const value = {
    userProfile,
    decisionData,
    analysis,
    challengeData,
    reflectionData,
    updateUserProfile,
    updateDecisionData,
    updateChallengeData,
    updateReflectionData,
    setAnalysis,
    resetSession,
    loadSampleScenario
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
