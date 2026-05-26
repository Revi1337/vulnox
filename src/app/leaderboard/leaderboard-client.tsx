"use client";

import { useState, useMemo } from "react";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ShieldAlert, Zap } from "lucide-react";
import { groupAndSortByYear, getSortedLeaderboard } from "@/lib/leaderboard";
import { LeaderboardCard } from "@/components/leaderboard/LeaderboardCard";

export function LeaderboardClient({ data }: { data: Vulnerability[] }) {
  // Group and sort data by year
  const leaderboardByYear = useMemo(() => {
    return groupAndSortByYear(data);
  }, [data]);

  const availableYears = useMemo(() => {
    return Object.keys(leaderboardByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [leaderboardByYear]);

  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || new Date().getFullYear()
  );
  const [sortMode, setSortMode] = useState<"impact" | "severity">("impact");

  // Get current year data and sort based on mode
  const currentLeaderboard = useMemo(() => {
    const rawData = leaderboardByYear[selectedYear] || [];
    return getSortedLeaderboard(rawData, sortMode);
  }, [leaderboardByYear, selectedYear, sortMode]);

  return (
    <div className="space-y-12">
      {/* Year Selector Timeline */}
      <div
        className="relative pb-6 overflow-x-auto no-scrollbar"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
        }}
      >
        <div className="flex gap-4 min-w-max px-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${selectedYear === year
                  ? "bg-cloud-white text-void-base border-cloud-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-elevated-surface text-fog-text border-border-smoke hover:border-ash-text"
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Mode Switcher & Description */}
      <div className="bg-muted-shell/10 rounded-[24px] border border-border-smoke/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex bg-void-base/50 p-1 rounded-xl border border-border-smoke/30 w-fit">
            <button
              onClick={() => setSortMode("impact")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${sortMode === "impact"
                  ? "bg-muted-shell text-cloud-white shadow-lg"
                  : "text-fog-text hover:text-ash-text"
                }`}
            >
              Impact-First
            </button>
            <button
              onClick={() => setSortMode("severity")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${sortMode === "severity"
                  ? "bg-muted-shell text-cloud-white shadow-lg"
                  : "text-fog-text hover:text-ash-text"
                }`}
            >
              Severity-First
            </button>
          </div>

          <div className="flex-1 max-w-xl">
            {sortMode === "impact" ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                  <Zap className="w-3 h-3 fill-amber-500" />
                  Impact-First Ranking
                </div>
                <p className="text-xs text-fog-text leading-relaxed">
                  Prioritizes vulnerabilities formally documented as &apos;Ransomware Used&apos; in
                  the CISA KEV catalog. Rankings are calculated based on their proven impact on the
                  global threat landscape.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-electric-current font-bold text-xs uppercase tracking-widest">
                  <ShieldAlert className="w-3 h-3" />
                  Severity-First Ranking
                </div>
                <p className="text-xs text-fog-text leading-relaxed">
                  Ranks vulnerabilities primarily by their technical CVSS score. This mode reflects
                  the inherent architectural danger and theoretical severity of the security flaw.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            {currentLeaderboard.map((v, idx) => (
              <LeaderboardCard key={v.id} v={v} idx={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentLeaderboard.length === 0 && (
        <div className="text-center py-20 bg-elevated-surface rounded-3xl border border-border-smoke/50 text-fog-text">
          No records found for the selected year.
        </div>
      )}
    </div>
  );
}
