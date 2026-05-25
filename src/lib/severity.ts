export const SEVERITY_DOT_COLORS: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
  unknown: "bg-gray-500",
};

export const SEVERITY_BADGE_COLORS: Record<string, string> = {
  critical: "bg-red-500/80",
  high: "bg-orange-500/80",
  medium: "bg-yellow-500/80",
  low: "bg-green-500/80",
  unknown: "bg-gray-500/80",
};

export const SEVERITY_HOVER_BORDERS: Record<string, string> = {
  critical: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]",
  high: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]",
  medium: "hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]",
  low: "hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]",
  unknown: "hover:border-gray-500/50 hover:shadow-[0_0_20px_rgba(107,114,128,0.1)]",
};

export const SEVERITY_DETAIL_STYLES: Record<string, string> = {
  critical: "bg-red-500/10 border-red-500/20 text-red-500",
  high: "bg-orange-500/10 border-orange-500/20 text-orange-500",
  medium: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
  low: "bg-green-500/10 border-green-500/20 text-green-500",
  unknown: "bg-gray-500/10 border-gray-500/20 text-gray-500",
};

export function getSeverityDot(severity: string): string {
  const s = severity ? severity.toLowerCase() : "unknown";
  return SEVERITY_DOT_COLORS[s] || SEVERITY_DOT_COLORS.unknown;
}

export function getSeverityBadge(severity: string): string {
  const s = severity ? severity.toLowerCase() : "unknown";
  return SEVERITY_BADGE_COLORS[s] || SEVERITY_BADGE_COLORS.unknown;
}

export function getSeverityHoverBorder(severity: string): string {
  const s = severity ? severity.toLowerCase() : "unknown";
  return SEVERITY_HOVER_BORDERS[s] || SEVERITY_HOVER_BORDERS.unknown;
}

export function getSeverityDetailStyles(severity: string): string {
  const s = severity ? severity.toLowerCase() : "unknown";
  return SEVERITY_DETAIL_STYLES[s] || SEVERITY_DETAIL_STYLES.unknown;
}
