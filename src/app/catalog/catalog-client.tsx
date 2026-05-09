"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { ShieldAlert } from "lucide-react";

type ViewMode = "all" | "tech" | "severity" | "threat";

export function CatalogClient({ initialData }: { initialData: Vulnerability[] }) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [tagSearch, setTagSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;
  const techScrollRef = useRef<HTMLDivElement>(null);
  const threatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const techEl = techScrollRef.current;
    const threatEl = threatScrollRef.current;

    const handleWheelManual = (e: WheelEvent, el: HTMLDivElement | null) => {
      if (!el) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // ALWAYS prevent page vertical scroll while mouse is over this container
        e.preventDefault();
        // Move horizontally
        el.scrollLeft += e.deltaY;
      }
    };

    const onTechWheel = (e: WheelEvent) => handleWheelManual(e, techEl);
    const onThreatWheel = (e: WheelEvent) => handleWheelManual(e, threatEl);

    if (techEl) techEl.addEventListener("wheel", onTechWheel, { passive: false });
    if (threatEl) threatEl.addEventListener("wheel", onThreatWheel, { passive: false });

    return () => {
      if (techEl) techEl.removeEventListener("wheel", onTechWheel);
      if (threatEl) threatEl.removeEventListener("wheel", onThreatWheel);
    };
  }, [viewMode]); // Re-attach if container changes on viewMode switch

  // Filtering logic based on search and view mode
  let filtered = initialData.filter(v =>
    v.id.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  );

  if (viewMode === "tech" && activeFilter !== "All") {
    filtered = filtered.filter(v => v.tech === activeFilter);
  } else if (viewMode === "severity" && activeFilter !== "All") {
    filtered = filtered.filter(v => v.severity === activeFilter);
  } else if (viewMode === "threat" && activeFilter !== "All") {
    filtered = filtered.filter(v => v.threatType === activeFilter);
  }

  // Get distinct tags for the current view mode
  const getFilterOptions = () => {
    if (viewMode === "all") return [];
    let options = new Set<string>();
    initialData.forEach(v => {
      if (viewMode === "tech") options.add(v.tech);
      if (viewMode === "severity") options.add(v.severity);
      if (viewMode === "threat") options.add(v.threatType);
    });
    const allOptions = ["All", ...Array.from(options)];

    // Custom sorting for Severity mode
    if (viewMode === "severity") {
      const severityOrder: Record<string, number> = {
        "Critical": 1,
        "High": 2,
        "Medium": 3,
        "Low": 4,
        "Unknown": 5
      };
      allOptions.sort((a, b) => {
        if (a === "All") return -1;
        if (b === "All") return 1;
        return (severityOrder[a] || 99) - (severityOrder[b] || 99);
      });
    } else {
      allOptions.sort();
    }

    if (!tagSearch) return allOptions;
    return allOptions.filter(opt =>
      opt.toLowerCase().includes(tagSearch.toLowerCase()) || opt === "All"
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/80';
      case 'high': return 'bg-orange-500/80';
      case 'medium': return 'bg-yellow-500/80';
      case 'low': return 'bg-green-500/80';
      default: return 'bg-gray-500/80';
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search vulnerabilities..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="flex-1 h-12 rounded-lg border border-border-smoke bg-elevated-surface px-4 text-ash-text focus:outline-none focus:border-border-smoke focus:ring-1 focus:ring-electric-current/50 transition-shadow"
        />
        <div
          ref={techScrollRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 md:pb-0 no-scrollbar touch-pan-x mask-fade-x px-4"
        >
          {(["all", "tech", "severity", "threat"] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => { setViewMode(mode); setActiveFilter("All"); setCurrentPage(1); }}
              className={`whitespace-nowrap px-4 py-2 rounded-lg border text-sm transition-colors ${viewMode === mode ? 'bg-muted-shell/40 text-cloud-white border-border-smoke' : 'bg-transparent text-fog-text border-transparent hover:border-border-smoke'}`}
            >
              {mode === 'all' ? 'All' : `By ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
            </button>
          ))}
        </div>
      </div>

      {viewMode !== "all" && (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8 bg-muted-shell/10 p-3 rounded-xl border border-border-smoke/50">
          <div className="relative w-full lg:w-[200px] shrink-0">
            <input
              type="text"
              placeholder={`Search ${viewMode}...`}
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="w-full h-11 rounded-lg border border-border-smoke bg-elevated-surface pl-10 pr-4 text-sm text-ash-text focus:outline-none focus:border-electric-current/50 transition-colors"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-fog-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
          >
            <div
              ref={threatScrollRef}
              className="flex gap-2 overflow-x-auto overflow-y-hidden py-1 no-scrollbar items-center touch-pan-x px-2"
            >
              {getFilterOptions().map(opt => (
                <button
                  key={opt}
                  onClick={() => { setActiveFilter(opt); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs transition-colors border whitespace-nowrap ${activeFilter === opt ? 'bg-cloud-white text-void-base border-cloud-white' : 'bg-transparent text-ash-text border-border-smoke hover:border-ash-text'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((v) => (
          <Link href={`/vulnerability/${v.id}`} key={v.id} className="rounded-[16px] bg-elevated-surface p-6 border border-transparent hover:border-border-smoke transition-colors flex flex-col h-full group">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${getSeverityColor(v.severity)}`} />
              <span className="text-xs text-cloud-white bg-muted-shell border border-border-smoke px-2 py-0.5 rounded-full">
                {v.severity}
              </span>

              {/* CVSS Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-electric-current/10 border border-electric-current/20">
                <ShieldAlert className="w-3 h-3 text-electric-current" />
                <span className="text-[10px] text-cloud-white font-medium uppercase tracking-wider">
                  CVSS <span className="text-electric-current font-bold">{v.cvssScore || "N/A"}</span>
                </span>
              </div>
              {v.isRansomware && (
                <span className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter flex items-center gap-1 shadow-[0_0_8px_rgba(248,113,113,0.2)] animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  Ransomware
                </span>
              )}
              <span className="text-xs text-fog-text ml-auto">
                {(() => {
                  const d = new Date(v.published);
                  return `${d.getMonth() + 1}.${d.getDate()}`;

                })()}
              </span>
            </div>
            <h3 className="text-xl text-cloud-white font-medium mb-3 group-hover:text-electric-current transition-colors">{v.id}</h3>
            <p className="text-sm text-ash-text line-clamp-3 mb-6 flex-1">
              {v.description}
            </p>
            <div className="flex items-center gap-2 mt-auto flex-nowrap relative">
              {v.tech !== "Unknown" && (
                <div className="group/tooltip relative shrink-0">
                  <span
                    className="text-[10px] uppercase tracking-wider text-[#077ac7] bg-[#077ac7]/10 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] block cursor-help"
                  >
                    {v.tech}
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block z-50 pointer-events-none">
                    <div className="bg-void-base/95 backdrop-blur-md border border-cloud-white/10 px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap text-[11px] text-cloud-white font-medium">
                      {v.tech}
                      <div className="absolute top-full left-4 border-4 border-transparent border-t-void-base/95" />
                    </div>
                  </div>
                </div>
              )}
              {v.threatType !== "Other" && (
                <div className="group/tooltip relative min-w-0 w-fit">
                  <span
                    className="text-[10px] uppercase tracking-wider text-ember-cta bg-ember-cta/10 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis block cursor-help"
                  >
                    {v.threatType}
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block z-50 pointer-events-none">
                    <div className="bg-void-base/95 backdrop-blur-md border border-cloud-white/10 px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap text-[11px] text-cloud-white font-medium">
                      {v.threatType}
                      <div className="absolute top-full left-4 border-4 border-transparent border-t-void-base/95" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border-smoke bg-elevated-surface text-sm text-ash-text hover:text-cloud-white hover:bg-muted-shell/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Previous
          </button>
          <span className="flex items-center px-4 text-sm text-fog-text">
            Page {currentPage} of {Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          </span>
          <button
            onClick={() => {
              setCurrentPage(p => Math.min(Math.ceil(filtered.length / ITEMS_PER_PAGE), p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === Math.ceil(filtered.length / ITEMS_PER_PAGE)}
            className="px-4 py-2 rounded-lg border border-border-smoke bg-elevated-surface text-sm text-ash-text hover:text-cloud-white hover:bg-muted-shell/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-fog-text bg-elevated-surface rounded-2xl border border-border-smoke">
          No vulnerabilities found matching your criteria.
        </div>
      )}
    </>
  );
}
