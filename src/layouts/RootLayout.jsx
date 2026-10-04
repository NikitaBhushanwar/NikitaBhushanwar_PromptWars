import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"

export function RootLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F4F5F7] flex flex-col font-sans selection:bg-[#7C6CF5]/30 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
