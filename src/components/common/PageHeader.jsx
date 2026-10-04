import { Badge } from "../ui/Badge"
import { cn } from "../../lib/utils"

export function PageHeader({
  badge,
  badgeVariant = "primary",
  title,
  subtitle,
  className,
  align = "center"
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 py-6 sm:py-8",
        align === "center" ? "text-center items-center" : "text-left items-start",
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} size="sm">
          {badge}
        </Badge>
      )}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F5F7]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#9A9EAA] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
