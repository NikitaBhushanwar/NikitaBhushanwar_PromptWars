import { Link, useLocation } from "react-router-dom"
import { Eye, Compass, ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "../ui/Button"
import { useSession } from "../../hooks/useSession"

export function Navbar() {
  const location = useLocation()
  const { resetSession } = useSession()
  const isHome = location.pathname === "/"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262A34] bg-[#08090C]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#F4F5F7] hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#161922] border border-[#262A34] flex items-center justify-center group-hover:border-[#7C6CF5]/60 transition-colors">
            <Eye className="w-4 h-4 text-[#7C6CF5]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-xs uppercase text-[#F4F5F7]">
              The Blind Spot
            </span>
            <span className="text-[10px] text-[#9A9EAA] tracking-tight hidden sm:inline">
              Reasoning Audit
            </span>
          </div>
        </Link>

        {/* Navigation links & Actions */}
        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main Navigation">
          {isHome ? (
            <>
              <a
                href="#how-it-works"
                className="text-xs sm:text-sm text-[#9A9EAA] hover:text-[#F4F5F7] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#philosophy"
                className="text-xs sm:text-sm text-[#9A9EAA] hover:text-[#F4F5F7] transition-colors"
              >
                Philosophy
              </a>
              <a
                href="#about"
                className="text-xs sm:text-sm text-[#9A9EAA] hover:text-[#F4F5F7] transition-colors hidden md:inline"
              >
                About
              </a>
              <Link to="/onboarding">
                <Button size="sm" variant="primary" icon={ArrowRight} iconPosition="right">
                  Begin Your Analysis
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-2 text-xs text-[#9A9EAA]">
                <Compass className="w-3.5 h-3.5 text-[#63D5E8]" aria-hidden="true" />
                <span className="capitalize">
                  {location.pathname.replace("/", "") || "Audit"}
                </span>
              </div>
              <button
                type="button"
                onClick={resetSession}
                className="text-xs text-[#9A9EAA] hover:text-[#F4F5F7] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset current session data"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <Link to="/decision">
                <Button size="sm" variant="outline">
                  Edit Decision
                </Button>
              </Link>
              <Link to="/">
                <Button size="sm" variant="ghost">
                  Exit
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
