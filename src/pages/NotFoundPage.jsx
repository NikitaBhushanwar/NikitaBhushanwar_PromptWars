import { Link } from "react-router-dom"
import { Eye, ArrowLeft } from "lucide-react"
import { Container } from "../components/common/Container"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"

export function NotFoundPage() {
  return (
    <div className="py-20 flex-1 flex items-center justify-center">
      <Container size="narrow">
        <Card variant="default" padding="lg" className="text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-[#161922] border border-[#262A34] mx-auto flex items-center justify-center text-[#7C6CF5]">
            <Eye className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#F4F5F7]">404 — Page Not Found</h1>
            <p className="text-sm text-[#9A9EAA] max-w-sm mx-auto">
              This path lies beyond the mapped topology. Return to the home screen to continue your reasoning audit.
            </p>
          </div>
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft}>
              Return Home
            </Button>
          </Link>
        </Card>
      </Container>
    </div>
  )
}
