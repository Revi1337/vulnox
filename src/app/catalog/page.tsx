import { getPulseVulnerabilities, getAnalytics, getTrendsVulnerabilities } from "@/lib/vulnerabilities";
import { DashboardClient } from "./dashboard-client";

export const metadata = {
  title: "Live Threat Pulse & Analytics | VULNOX",
  description: "Real-time monitoring of the latest security vulnerabilities and threat trends.",
};

export default function CatalogPage() {
  const pulseData = getPulseVulnerabilities();
  const analyticsData = getAnalytics();
  const trendsData = getTrendsVulnerabilities();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-3 h-8 px-4 rounded-full bg-elevated-surface border border-border-smoke shadow-sm mb-6">
          <div className="relative flex items-center justify-center w-4 h-4">
            <div className="absolute inset-0 rounded-full bg-electric-current/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative w-2 h-2 rounded-full bg-electric-current shadow-[0_0_8px_rgba(7,122,199,0.8)]" />
          </div>
          <span className="text-[11px] text-cloud-white font-medium tracking-widest uppercase">Live Monitoring Active</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-cloud-white mb-6 tracking-tight">
          Live Threat Pulse & Analytics
        </h1>
        <p className="text-lg text-ash-text max-w-2xl leading-relaxed">
          Monitor the latest security vulnerabilities in real-time. Gain insights into current threat trends and targeted technologies across the globe.
        </p>
      </div>

      <DashboardClient pulseData={pulseData} analyticsData={analyticsData} trendsData={trendsData} />
    </div>
  );
}
