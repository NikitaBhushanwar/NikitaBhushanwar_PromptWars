import { cn } from "../../lib/utils"

export function Container({ children, className, size = "default" }) {
  const sizes = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
    full: "max-w-7xl"
  }

  return (
    <div className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  )
}
