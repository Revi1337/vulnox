import { getKevVulnerabilities } from "@/lib/vulnerabilities";
import { LeaderboardClient } from "./leaderboard-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall of Fame: Annual Threat Leaderboard | VULNOX",
  description: "Explore the most dangerous and historically significant vulnerabilities for each year, verified by CISA.",
};

export default function LeaderboardPage() {
  const vulnerabilities = getKevVulnerabilities();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="text-[10px] text-amber-500 tracking-widest uppercase font-bold">Historical Authority Record</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-cloud-white mb-6 tracking-tight">
          Hall of Fame: Annual Leaderboard
        </h1>
        <p className="text-lg text-ash-text max-w-2xl leading-relaxed">
          A definitive ranking of history's most critical and routinely exploited vulnerabilities. 
          Sourced from the CISA KEV catalog and ranked by technical severity.
        </p>
      </div>

      <LeaderboardClient data={vulnerabilities} />
    </div>
  );
}
