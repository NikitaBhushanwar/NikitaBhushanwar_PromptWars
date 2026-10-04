import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export const Textarea = forwardRef(function Textarea(
  {
    label,
    helperText,
    error,
    id,
    className,
    rows = 4,
    required = false,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-[#7C6CF5]">*</span>}
          </span>
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg bg-[#101218] border border-[#262A34] text-[#F4F5F7] placeholder-[#4E5465]",
          "text-sm transition-all duration-200 outline-none resize-y min-h-[90px] leading-relaxed",
          "focus:border-[#7C6CF5] focus:ring-1 focus:ring-[#7C6CF5]",
          error && "border-red-500/60 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />

      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="text-xs text-[#9A9EAA]">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${textareaId}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})
