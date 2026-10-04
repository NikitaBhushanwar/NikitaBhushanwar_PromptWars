import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export const Card = forwardRef(function Card(
  {
    children,
    className,
    variant = "default", // default | elevated | interactive | highlight | blindspot
    padding = "md",      // none | sm | md | lg
    ...props
  },
  ref
) {
  const baseStyles = "rounded-xl transition-all duration-200"

  const variants = {
    default: "bg-[#101218] border border-[#262A34] text-[#F4F5F7]",
    elevated: "bg-[#161922] border border-[#262A34] shadow-lg text-[#F4F5F7]",
    interactive:
      "bg-[#101218] border border-[#262A34] hover:border-[#383E4D] hover:bg-[#131620] cursor-pointer text-[#F4F5F7]",
    highlight:
      "bg-[#101218] border border-[#7C6CF5]/30 shadow-[0_0_25px_rgba(124,108,245,0.06)] text-[#F4F5F7]",
    blindspot:
      "bg-[#161922] border border-[#E8B86A]/30 shadow-[0_0_25px_rgba(232,184,106,0.08)] text-[#F4F5F7]"
  }

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
})
