import { Activity, Zap, BarChart3 } from "lucide-react";
import { type Analytics } from "@/lib/vulnerabilities";
import { getSeverityDot } from "@/lib/severity";

interface StatsGridProps {
  analyticsData: Analytics;
  pulseCount: number;
}

export function StatsGrid({ analyticsData, pulseCount }: StatsGridProps) {
  const totalSeverity = Object.values(analyticsData.severityDistribution).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Last 30 Days Card */}
      <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm hover:border-electric-current/30 transition-all group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-electric-current/10 rounded-lg">
            <Activity className="w-5 h-5 text-electric-current" />
          </div>
          <span className="text-sm text-fog-text">Last 30 Days</span>
        </div>
        <div className="text-3xl font-medium text-cloud-white mb-1">
          {analyticsData.sampleSize}
        </div>
        <div className="text-xs text-ash-text">New Vulnerabilities Analyzed</div>
      </div>

      {/* Emerging Pulse Card */}
      <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm hover:border-ember-cta/30 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-ember-cta/10 rounded-lg">
            <Zap className="w-5 h-5 text-ember-cta" />
          </div>
          <span className="text-sm text-fog-text">Emerging Pulse</span>
        </div>
        <div className="text-3xl font-medium text-cloud-white mb-1">
          {pulseCount}
        </div>
        <div className="text-xs text-ash-text">Identified in Last 72 Hours</div>
      </div>

      {/* Severity Distribution Card */}
      <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-sm text-fog-text">Severity Distribution</span>
        </div>
        <div className="flex w-full h-3 rounded-full overflow-hidden bg-void-base border border-border-smoke mb-4">
          {Object.entries(analyticsData.severityDistribution).map(([sev, count]) => (
            <div
              key={sev}
              style={{ width: `${(count / totalSeverity) * 100}%` }}
              className={`${getSeverityDot(sev)} transition-all duration-1000`}
              title={`${sev}: ${count}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(analyticsData.severityDistribution).map(([sev, count]) => (
            <div key={sev} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${getSeverityDot(sev)}`} />
              <span className="text-[10px] text-ash-text uppercase tracking-wider">
                {sev} ({count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
