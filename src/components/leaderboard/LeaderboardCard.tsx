import Link from "next/link";
import { ShieldAlert, Trophy, Zap, ExternalLink } from "lucide-react";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { getSeverityDot } from "@/lib/severity";

interface LeaderboardCardProps {
  v: Vulnerability;
  idx: number;
}

export function getRankStyles(index: number) {
  switch (index) {
    case 0:
      return {
        bg: "bg-elevated-surface bg-gradient-to-br from-[#10b981]/10 to-transparent",
        border: "border-[#10b981]/30",
        text: "text-[#10b981]",
        label: "Green Rank",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      };
    case 1:
      return {
        bg: "bg-elevated-surface bg-gradient-to-br from-[#f97316]/5 to-transparent",
        border: "border-[#f97316]/20",
        text: "text-[#f97316]",
        label: "Orange Rank",
        glow: "",
      };
    case 2:
      return {
        bg: "bg-elevated-surface bg-gradient-to-br from-[#8b5cf6]/5 to-transparent",
        border: "border-[#8b5cf6]/20",
        text: "text-[#8b5cf6]",
        label: "Purple Rank",
        glow: "",
      };
    default:
      return {
        bg: "bg-elevated-surface",
        border: "border-border-smoke/50",
        text: "text-fog-text",
        label: `Rank #${index + 1}`,
        glow: "",
      };
  }
}

export function LeaderboardCard({ v, idx }: LeaderboardCardProps) {
  const styles = getRankStyles(idx);

  return (
    <Link
      href={`/vulnerability/${v.id}`}
      className={`group relative flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6 rounded-[24px] border ${styles.border} ${styles.bg} ${styles.glow} hover:border-border-smoke transition-all duration-300`}
    >
      {/* Rank Badge */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-void-base/40 border border-border-smoke/30">
        {idx === 0 ? (
          <Trophy className="w-6 h-6 text-[#10b981] mb-1" />
        ) : (
          <span className={`text-2xl font-medium ${styles.text}`}>#{idx + 1}</span>
        )}
        <span className="text-[8px] uppercase tracking-widest text-fog-text font-bold">
          {styles.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <h3
            className="text-2xl font-medium text-cloud-white group-hover:text-electric-current transition-colors truncate max-w-full mb-2"
            title={v.title || v.id}
          >
            <span className="text-ash-text mr-3 text-xl opacity-60">[{v.id}]</span>
            {v.title || v.id}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Severity Badge */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getSeverityDot(v.severity)}`} />
              <span className="text-[11px] text-cloud-white bg-muted-shell/50 border border-border-smoke/50 px-2 py-0.5 rounded-full font-medium">
                {v.severity}
              </span>
            </div>

            {/* CVSS Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-electric-current/10 border border-electric-current/20">
              <ShieldAlert className="w-3.5 h-3.5 text-electric-current" />
              <span className="text-[11px] text-cloud-white font-medium uppercase tracking-wider">
                CVSS <span className="text-electric-current font-bold">{v.cvssScore ?? "N/A"}</span>
              </span>
            </div>

            {v.isRansomware && (
              <span className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/20 px-2.5 py-1 rounded-md font-bold uppercase tracking-tighter animate-pulse flex items-center gap-1.5 shadow-[0_0_8px_rgba(248,113,113,0.15)]">
                <Zap className="w-3 h-3 fill-red-400" />
                Ransomware Used
              </span>
            )}
          </div>
        </div>

          <p className="text-ash-text text-sm line-clamp-2 leading-relaxed mb-4">
            {v.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-fog-text font-medium uppercase tracking-widest whitespace-nowrap">
              Affected Infrastructure:
            </span>
            <span className="text-xs text-electric-current font-semibold truncate">{v.tech}</span>
          </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center md:pl-6 md:border-l border-border-smoke/30">
        <div className="p-3 rounded-full bg-muted-shell/40 text-fog-text group-hover:text-cloud-white group-hover:bg-muted-shell/60 transition-all">
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
