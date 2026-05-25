"use client";

import { useState, useRef, useEffect } from "react";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { SearchBar, type ViewMode } from "@/components/catalog/SearchBar";
import { FilterBar } from "@/components/catalog/FilterBar";
import { VulnerabilityCard } from "@/components/catalog/VulnerabilityCard";
import { Pagination } from "@/components/ui/Pagination";

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
        e.preventDefault();
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
  }, [viewMode]);

  // Filter vulnerabilities based on search text and view mode filters
  let filtered = initialData.filter(
    (v) =>
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
  );

  if (viewMode === "tech" && activeFilter !== "All") {
    filtered = filtered.filter((v) => v.tech === activeFilter);
  } else if (viewMode === "severity" && activeFilter !== "All") {
    filtered = filtered.filter((v) => v.severity === activeFilter);
  } else if (viewMode === "threat" && activeFilter !== "All") {
    filtered = filtered.filter((v) => v.threatType === activeFilter);
  }

  // Get distinct tags for current filter
  const getFilterOptions = () => {
    if (viewMode === "all") return [];
    const options = new Set<string>();
    initialData.forEach((v) => {
      if (viewMode === "tech") options.add(v.tech);
      if (viewMode === "severity") options.add(v.severity);
      if (viewMode === "threat") options.add(v.threatType);
    });
    const allOptions = ["All", ...Array.from(options)];

    if (viewMode === "severity") {
      const severityOrder: Record<string, number> = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
        Unknown: 5,
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
    return allOptions.filter(
      (opt) => opt.toLowerCase().includes(tagSearch.toLowerCase()) || opt === "All"
    );
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setActiveFilter("All");
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        techScrollRef={techScrollRef}
      />

      <FilterBar
        viewMode={viewMode}
        tagSearch={tagSearch}
        onTagSearchChange={setTagSearch}
        activeFilter={activeFilter}
        onActiveFilterChange={(val) => {
          setActiveFilter(val);
          setCurrentPage(1);
        }}
        filterOptions={getFilterOptions()}
        threatScrollRef={threatScrollRef}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map((v) => (
          <VulnerabilityCard key={v.id} v={v} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {filtered.length === 0 && (
        <div className="text-center py-20 text-fog-text bg-elevated-surface rounded-2xl border border-border-smoke">
          No vulnerabilities found matching your criteria.
        </div>
      )}
    </>
  );
}
