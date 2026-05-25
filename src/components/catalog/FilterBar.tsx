import { RefObject } from "react";
import { type ViewMode } from "./SearchBar";

interface FilterBarProps {
  viewMode: ViewMode;
  tagSearch: string;
  onTagSearchChange: (val: string) => void;
  activeFilter: string;
  onActiveFilterChange: (val: string) => void;
  filterOptions: string[];
  threatScrollRef: RefObject<HTMLDivElement | null>;
}

export function FilterBar({
  viewMode,
  tagSearch,
  onTagSearchChange,
  activeFilter,
  onActiveFilterChange,
  filterOptions,
  threatScrollRef,
}: FilterBarProps) {
  if (viewMode === "all") return null;

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8 bg-muted-shell/10 p-3 rounded-xl border border-border-smoke/50">
      <div className="relative w-full lg:w-[200px] shrink-0">
        <input
          type="text"
          placeholder={`Search ${viewMode}...`}
          value={tagSearch}
          onChange={(e) => onTagSearchChange(e.target.value)}
          className="w-full h-11 rounded-lg border border-border-smoke bg-elevated-surface pl-10 pr-4 text-sm text-ash-text focus:outline-none focus:border-electric-current/50 transition-colors"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-fog-text"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div
          ref={threatScrollRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden py-1 no-scrollbar items-center touch-pan-x px-2"
        >
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onActiveFilterChange(opt)}
              className={`px-4 py-2 rounded-lg text-xs transition-colors border whitespace-nowrap ${
                activeFilter === opt
                  ? "bg-cloud-white text-void-base border-cloud-white"
                  : "bg-transparent text-ash-text border-border-smoke hover:border-ash-text"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
