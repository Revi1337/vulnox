import { RefObject } from "react";

export type ViewMode = "all" | "tech" | "severity" | "threat";

interface SearchBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  techScrollRef: RefObject<HTMLDivElement | null>;
}

export function SearchBar({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  techScrollRef,
}: SearchBarProps) {
  const modes: ViewMode[] = ["all", "tech", "severity", "threat"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search vulnerabilities..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 h-12 rounded-lg border border-border-smoke bg-elevated-surface px-4 text-ash-text focus:outline-none focus:border-border-smoke focus:ring-1 focus:ring-electric-current/50 transition-shadow"
      />
      <div
        ref={techScrollRef}
        className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 md:pb-0 no-scrollbar touch-pan-x mask-fade-x px-4"
      >
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg border text-sm transition-colors ${
              viewMode === mode
                ? "bg-muted-shell/40 text-cloud-white border-border-smoke"
                : "bg-transparent text-fog-text border-transparent hover:border-border-smoke"
            }`}
          >
            {mode === "all" ? "All" : `By ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
          </button>
        ))}
      </div>
    </div>
  );
}
