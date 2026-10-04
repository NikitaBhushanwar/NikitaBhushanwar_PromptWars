import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names cleanly with tailwind-merge and clsx.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
