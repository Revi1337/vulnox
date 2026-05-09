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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-current/10 border border-electric-current/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-electric-current animate-pulse" />
          <span className="text-[10px] text-electric-current tracking-widest uppercase font-bold">Live Monitoring Active</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-cloud-white mb-6 tracking-tight">
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
