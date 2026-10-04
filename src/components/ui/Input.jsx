import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    id,
    className,
    required = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium uppercase tracking-wider text-[#9A9EAA] flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-[#7C6CF5]">*</span>}
          </span>
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg bg-[#101218] border border-[#262A34] text-[#F4F5F7] placeholder-[#4E5465]",
          "text-sm transition-all duration-200 outline-none",
          "focus:border-[#7C6CF5] focus:ring-1 focus:ring-[#7C6CF5]",
          error && "border-red-500/60 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />

      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-xs text-[#9A9EAA]">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})
