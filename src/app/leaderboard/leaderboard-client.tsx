"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ShieldAlert, Zap, ExternalLink } from "lucide-react";

export function LeaderboardClient({ data }: { data: Vulnerability[] }) {
  // 1. Group and sort data by year
  const leaderboardByYear = useMemo(() => {
    const years: Record<number, Vulnerability[]> = {};
    
    data.forEach(v => {
      // Extract year from CVE-YYYY-NNNN
      const yearMatch = v.id.match(/CVE-(\d{4})-/);
      if (yearMatch) {
        const year = parseInt(yearMatch[1]);
        if (!years[year]) years[year] = [];
        years[year].push(v);
      }
    });

    // Sort each year by CVSS score (influence)
    Object.keys(years).forEach(y => {
      const year = parseInt(y);
      // We assume cvssScore is present in our enriched data
      years[year].sort((a, b) => {
        const scoreA = (a as any).cvssScore || 0;
        const scoreB = (b as any).cvssScore || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });
      // Take Top 20
      years[year] = years[year].slice(0, 20);
    });

    return years;
  }, [data]);

  const availableYears = useMemo(() => {
    return Object.keys(leaderboardByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [leaderboardByYear]);

  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || new Date().getFullYear());
  const [sortMode, setSortMode] = useState<"impact" | "severity">("impact");

  // 1. Get current year data and sort based on mode
  const currentLeaderboard = useMemo(() => {
    const rawData = leaderboardByYear[selectedYear] || [];
    const sorted = [...rawData];

    if (sortMode === "impact") {
      sorted.sort((a, b) => {
        // Priority 1: Ransomware usage
        if (a.isRansomware && !b.isRansomware) return -1;
        if (!a.isRansomware && b.isRansomware) return 1;
        
        // Priority 2: CVSS Score
        const scoreA = (a as any).cvssScore || 0;
        const scoreB = (b as any).cvssScore || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });
    } else {
      sorted.sort((a, b) => {
        const scoreA = (a as any).cvssScore || 0;
        const scoreB = (b as any).cvssScore || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });
    }

    return sorted.slice(0, 20);
  }, [leaderboardByYear, selectedYear, sortMode]);

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-ash-text';
    }
  };

  const getRankStyles = (index: number) => {
    switch (index) {
      case 0: return {
        bg: "bg-gradient-to-br from-[#10b981]/20 to-transparent",
        border: "border-[#10b981]/30",
        text: "text-[#10b981]",
        label: "Green Rank",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      };
      case 1: return {
        bg: "bg-gradient-to-br from-[#f97316]/10 to-transparent",
        border: "border-[#f97316]/20",
        text: "text-[#f97316]",
        label: "Orange Rank",
        glow: ""
      };
      case 2: return {
        bg: "bg-gradient-to-br from-[#8b5cf6]/10 to-transparent",
        border: "border-[#8b5cf6]/20",
        text: "text-[#8b5cf6]",
        label: "Purple Rank",
        glow: ""
      };
      default: return {
        bg: "bg-elevated-surface/50",
        border: "border-border-smoke/50",
        text: "text-fog-text",
        label: `Rank #${index + 1}`,
        glow: ""
      };
    }
  };

  return (
    <div className="space-y-12">
      {/* Year Selector Timeline */}
      <div 
        className="relative pb-6 overflow-x-auto no-scrollbar"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
        }}
      >
        <div className="flex gap-4 min-w-max px-2">
          {availableYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                selectedYear === year 
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
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                sortMode === "impact" 
                  ? "bg-muted-shell text-cloud-white shadow-lg" 
                  : "text-fog-text hover:text-ash-text"
              }`}
            >
              Impact-First
            </button>
            <button
              onClick={() => setSortMode("severity")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                sortMode === "severity" 
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
                  Prioritizes vulnerabilities formally documented as &apos;Ransomware Used&apos; in the CISA KEV catalog. 
                  Rankings are calculated based on their proven impact on the global threat landscape.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-electric-current font-bold text-xs uppercase tracking-widest">
                  <ShieldAlert className="w-3 h-3" />
                  Severity-First Ranking
                </div>
                <p className="text-xs text-fog-text leading-relaxed">
                  Ranks vulnerabilities primarily by their technical CVSS score. 
                  This mode reflects the inherent architectural danger and theoretical severity of the security flaw.
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
            {currentLeaderboard.map((v, idx) => {
              const styles = getRankStyles(idx);

              return (
                <Link 
                  href={`/vulnerability/${v.id}`} 
                  key={v.id}
                  className={`group relative flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6 rounded-[24px] border ${styles.border} ${styles.bg} ${styles.glow} hover:border-border-smoke transition-all duration-300`}
                >
                  {/* Rank Badge */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-void-base/40 border border-border-smoke/30">
                    {idx === 0 ? (
                      <Trophy className="w-6 h-6 text-[#10b981] mb-1" />
                    ) : (
                      <span className={`text-2xl font-light ${styles.text}`}>#{idx + 1}</span>
                    )}
                    <span className="text-[8px] uppercase tracking-widest text-fog-text font-bold">{styles.label}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h3 
                        className="text-2xl font-light text-cloud-white group-hover:text-electric-current transition-colors truncate max-w-full mb-2"
                        title={v.title || v.id}
                      >
                        <span className="text-ash-text mr-3 text-xl opacity-60">[{v.id}]</span>
                        {v.title || v.id}
                      </h3>
                      
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Severity Badge */}
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSeverityColor(v.severity)}`} />
                            <span className="text-[11px] text-cloud-white bg-muted-shell/50 border border-border-smoke/50 px-2 py-0.5 rounded-full font-medium">
                              {v.severity}
                            </span>
                          </div>

                          {/* CVSS Badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-electric-current/10 border border-electric-current/20">
                            <ShieldAlert className="w-3.5 h-3.5 text-electric-current" />
                            <span className="text-[11px] text-cloud-white font-medium uppercase tracking-wider">
                              CVSS <span className="text-electric-current font-bold">{v.cvssScore || "N/A"}</span>
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
                      <span className="text-[10px] text-fog-text font-medium uppercase tracking-widest whitespace-nowrap">Affected Infrastructure:</span>
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
            })}
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
