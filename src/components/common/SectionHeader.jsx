import { cn } from "../../lib/utils"

export function SectionHeader({
  icon: Icon,
  iconColor = "text-[#7C6CF5]",
  title,
  subtitle,
  action,
  className
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#262A34]/60", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={cn("p-2 rounded-lg bg-[#161922] border border-[#262A34] shrink-0", iconColor)}>
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[#F4F5F7] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#9A9EAA] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 pt-2 sm:pt-0">{action}</div>}
    </div>
  )
}
