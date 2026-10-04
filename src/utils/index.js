import { cn } from "../lib/utils"

export { cn }

export function formatPercentage(value) {
  if (typeof value !== "number") return "0%"
  return `${Math.round(value)}%`
}

export function truncateText(text, maxLength = 80) {
  if (!text || text.length <= maxLength) return text || ""
  return `${text.slice(0, maxLength)}...`
}

export function capitalize(str) {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}
