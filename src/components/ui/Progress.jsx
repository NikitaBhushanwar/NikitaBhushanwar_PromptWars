import { cn } from "../../lib/utils"

export function Progress({
  value = 0,
  max = 100,
  className,
  color = "primary", // primary | cyan | amber
  showLabel = false,
  label = ""
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100)

  const colors = {
    primary: "bg-[#7C6CF5]",
    cyan: "bg-[#63D5E8]",
    amber: "bg-[#E8B86A]"
  }

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs text-[#9A9EAA]">
          <span>{label}</span>
          <span className="font-mono">{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="w-full h-1.5 bg-[#161922] border border-[#262A34] rounded-full overflow-hidden"
      >
        <div
          className={cn("h-full transition-all duration-300 ease-out rounded-full", colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
