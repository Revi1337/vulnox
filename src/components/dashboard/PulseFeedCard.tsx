import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { formatDateTime } from "@/lib/format";
import { getSeverityDot, getSeverityHoverBorder } from "@/lib/severity";

interface PulseFeedCardProps {
  vuln: Vulnerability;
}

export function PulseFeedCard({ vuln }: PulseFeedCardProps) {
  return (
    <Link
      href={`/vulnerability/${vuln.id}`}
      className={`block p-5 bg-elevated-surface border border-border-smoke rounded-2xl transition-all group ${getSeverityHoverBorder(
        vuln.severity
      )}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-2 h-2 rounded-full ${getSeverityDot(vuln.severity)}`} />
        <span className="text-xs font-bold text-cloud-white uppercase tracking-tighter">
          {vuln.id}
        </span>
        <span className="text-[10px] text-fog-text uppercase tracking-widest ml-auto">
          {formatDateTime(vuln.published)}
        </span>
      </div>
      <p className="text-sm text-ash-text line-clamp-2 mb-3 group-hover:text-cloud-white transition-colors">
        {vuln.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-electric-current bg-electric-current/10 px-2 py-0.5 rounded uppercase tracking-wider font-bold italic">
          {vuln.tech}
        </span>
        <span className="text-xs text-ember-cta flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
