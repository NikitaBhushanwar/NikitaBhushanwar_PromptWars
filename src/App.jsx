import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SessionProvider } from "./context/SessionContext"
import { RootLayout } from "./layouts/RootLayout"

// Pages
import { LandingPage } from "./pages/LandingPage"
import { OnboardingPage } from "./pages/OnboardingPage"
import { DecisionPage } from "./pages/DecisionPage"
import { ReviewPage } from "./pages/ReviewPage"
import { AnalyzePage } from "./pages/AnalyzePage"
import { ResultsPage } from "./pages/ResultsPage"
import { ChallengePage } from "./pages/ChallengePage"
import { ReflectionPage } from "./pages/ReflectionPage"
import { NotFoundPage } from "./pages/NotFoundPage"

export function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="decision" element={<DecisionPage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="analyze" element={<AnalyzePage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="challenge" element={<ChallengePage />} />
            <Route path="reflection" element={<ReflectionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}

export default App
