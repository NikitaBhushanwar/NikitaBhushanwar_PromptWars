import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    icon: Icon,
    iconPosition = "left",
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090C] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]"

  const variants = {
    primary:
      "bg-[#7C6CF5] text-white hover:bg-[#6C5CE7] shadow-sm hover:shadow-[0_0_20px_rgba(124,108,245,0.35)] focus-visible:ring-[#7C6CF5] border border-transparent",
    secondary:
      "bg-[#161922] text-[#F4F5F7] hover:bg-[#1E222E] border border-[#262A34] hover:border-[#383E4D] focus-visible:ring-[#63D5E8]",
    outline:
      "bg-transparent text-[#F4F5F7] hover:bg-[#161922] border border-[#262A34] hover:border-[#383E4D] focus-visible:ring-[#7C6CF5]",
    ghost:
      "bg-transparent text-[#9A9EAA] hover:text-[#F4F5F7] hover:bg-[#161922]/50 focus-visible:ring-[#7C6CF5]",
    amber:
      "bg-[#E8B86A] text-[#08090C] font-semibold hover:bg-[#DDA955] shadow-sm hover:shadow-[0_0_20px_rgba(232,184,106,0.35)] focus-visible:ring-[#E8B86A]",
    danger:
      "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 focus-visible:ring-red-400"
  }

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5"
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  )
})
