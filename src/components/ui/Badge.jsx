import { cn } from "../../lib/utils"

export function Badge({
  children,
  className,
  variant = "neutral", // neutral | primary | cyan | amber | success
  size = "md"
}) {
  const variants = {
    neutral: "bg-[#161922] text-[#9A9EAA] border border-[#262A34]",
    primary: "bg-[#7C6CF5]/10 text-[#A599FF] border border-[#7C6CF5]/30",
    cyan: "bg-[#63D5E8]/10 text-[#63D5E8] border border-[#63D5E8]/30",
    amber: "bg-[#E8B86A]/10 text-[#E8B86A] border border-[#E8B86A]/30",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
  }

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-2.5 py-1 font-medium tracking-wide"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider font-mono",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
