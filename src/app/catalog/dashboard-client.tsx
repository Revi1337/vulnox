"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ShieldAlert, Zap, BarChart3, TrendingUp, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function DashboardClient({
  pulseData,
  analyticsData,
  trendsData
}: {
  pulseData: any[],
  analyticsData: any,
  trendsData: any[]
}) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (!analyticsData) return <div>Loading...</div>;

  const severityColors: Record<string, string> = {
    Critical: "bg-red-500",
    High: "bg-orange-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
    Unknown: "bg-gray-500"
  };

  const severityHoverBorders: Record<string, string> = {
    Critical: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    High: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]",
    Medium: "hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]",
    Low: "hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    Unknown: "hover:border-gray-500/50 hover:shadow-[0_0_20px_rgba(107,114,128,0.1)]"
  };

  const totalSeverity = Object.values(analyticsData.severityDistribution).reduce((a: any, b: any) => a + b, 0) as number;

  const filteredItems = selectedTech
    ? trendsData.filter(v => v.tech.toLowerCase().includes(selectedTech.toLowerCase()))
    : pulseData;

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleTechClick = (techName: string) => {
    setSelectedTech(selectedTech === techName ? null : techName);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">

      {/* Header Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm hover:border-electric-current/30 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-electric-current/10 rounded-lg">
              <Activity className="w-5 h-5 text-electric-current" />
            </div>
            <span className="text-sm text-fog-text">Last 30 Days</span>
          </div>
          <div className="text-3xl font-light text-cloud-white mb-1">{analyticsData.sampleSize}</div>
          <div className="text-xs text-ash-text">New Vulnerabilities Analyzed</div>
        </div>

        <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm hover:border-ember-cta/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-ember-cta/10 rounded-lg">
              <Zap className="w-5 h-5 text-ember-cta" />
            </div>
            <span className="text-sm text-fog-text">Today's Pulse</span>
          </div>
          <div className="text-3xl font-light text-cloud-white mb-1">{pulseData.length}</div>
          <div className="text-xs text-ash-text">Identified in Last 24 Hours</div>
        </div>

        <div className="bg-elevated-surface rounded-2xl border border-border-smoke p-6 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-sm text-fog-text">Severity Distribution</span>
          </div>
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-void-base border border-border-smoke mb-4">
            {Object.entries(analyticsData.severityDistribution).map(([sev, count]: [string, any]) => (
              <div
                key={sev}
                style={{ width: `${(count / totalSeverity) * 100}%` }}
                className={`${severityColors[sev]} transition-all duration-1000`}
                title={`${sev}: ${count}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.entries(analyticsData.severityDistribution).map(([sev, count]: [string, any]) => (
              <div key={sev} className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${severityColors[sev]}`} />
                <span className="text-[10px] text-ash-text uppercase tracking-wider">{sev} ({count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left: Hot Technologies */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-medium text-cloud-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-electric-current" />
              Hot Tech Targets
            </h3>
            <div className="flex flex-col gap-3">
              {analyticsData.topTechnologies.map((tech: any, idx: number) => (
                <button
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => handleTechClick(tech.name)}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${selectedTech === tech.name
                    ? 'bg-electric-current/10 border-electric-current shadow-[0_0_15px_rgba(7,122,199,0.1)]'
                    : hoveredTech === tech.name
                      ? 'bg-muted-shell/40 border-border-smoke'
                      : 'bg-elevated-surface border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono ${selectedTech === tech.name ? 'text-electric-current' : 'text-fog-text'}`}>#{idx + 1}</span>
                    <span className={`text-sm ${selectedTech === tech.name ? 'text-cloud-white font-medium' : 'text-cloud-white'}`}>{tech.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-void-base rounded-full overflow-hidden">
                      <div
                        className={`h-full ${selectedTech === tech.name ? 'bg-cloud-white' : 'bg-electric-current'}`}
                        style={{ width: `${(tech.count / analyticsData.topTechnologies[0].count) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${selectedTech === tech.name ? 'text-electric-current' : 'text-ash-text'}`}>{tech.count}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-ash-text leading-relaxed px-2 italic">
              * Click a technology to view its 30-day threat activity.
            </p>
          </div>
        </div>

        {/* Right: Feed */}
        <div className="lg:col-span-2">
          <div className="flex flex-col justify-between mb-8 min-h-[80px]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-cloud-white flex items-center gap-3">
                {selectedTech ? <TrendingUp className="w-5 h-5 text-electric-current" /> : <Clock className="w-5 h-5 text-ember-cta" />}
                <span className="truncate max-w-[350px]">
                  {selectedTech ? `30-Day Activity: ${selectedTech}` : "Today's Pulse Feed"}
                </span>
              </h3>

              <div className="flex items-center gap-4">
                {totalPages > 1 && (
                  <div className="flex items-center gap-1 bg-void-base/40 rounded-xl p-1 border border-border-smoke">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="p-1.5 rounded-lg hover:bg-muted-shell/40 disabled:opacity-20 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-cloud-white" />
                    </button>
                    <span className="text-[11px] text-fog-text px-2 font-mono">{currentPage} / {totalPages}</span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="p-1.5 rounded-lg hover:bg-muted-shell/40 disabled:opacity-20 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-cloud-white" />
                    </button>
                  </div>
                )}
                <span className="text-xs font-bold text-fog-text bg-muted-shell/20 px-3 py-1.5 rounded-full border border-border-smoke uppercase tracking-wider whitespace-nowrap">
                  {selectedTech ? `${filteredItems.length} incidents` : "24H Pulse"}
                </span>
              </div>
            </div>

            <div className="h-5 flex items-center mb-1">
              {selectedTech ? (
                <button
                  onClick={() => { setSelectedTech(null); setCurrentPage(1); }}
                  className="flex items-center gap-1.5 text-xs font-medium text-electric-current hover:text-cloud-white transition-colors w-fit group/back px-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover/back:-translate-x-0.5" />
                  Back to Today's Pulse
                </button>
              ) : (
                <div className="flex items-center gap-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-current animate-pulse" />
                    <span className="text-[10px] font-medium text-ash-text/40 uppercase tracking-widest">Live monitoring active</span>
                  </div>
                  <div className="w-[1px] h-3 bg-border-smoke/50" />
                  <span className="text-[10px] font-medium text-ash-text/40 uppercase tracking-widest">
                    Last synced: {(() => {
                      const d = new Date(analyticsData.lastUpdated);
                      return `${d.getMonth() + 1}.${d.getDate()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
                    })()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 min-h-[600px]">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((vuln) => (
                <Link
                  href={`/vulnerability/${vuln.id}`}
                  key={vuln.id}
                  className={`block p-5 bg-elevated-surface border border-border-smoke rounded-2xl transition-all group ${severityHoverBorders[vuln.severity] || ""}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${severityColors[vuln.severity] || "bg-gray-500"}`} />
                    <span className="text-xs font-bold text-cloud-white uppercase tracking-tighter">{vuln.id}</span>
                    <span className="text-[10px] text-fog-text uppercase tracking-widest ml-auto">
                      {(() => {
                        const d = new Date(vuln.published);
                        return `${d.getMonth() + 1}.${d.getDate()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
                      })()}
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
              ))
            ) : (
              <div className="p-12 text-center border border-dashed border-border-smoke rounded-2xl">
                <p className="text-ash-text">No incidents found for this technology in the selected period.</p>
                <button onClick={() => { setSelectedTech(null); setCurrentPage(1); }} className="text-electric-current text-sm mt-2 hover:underline">Show all</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
