import { TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { type Vulnerability } from "@/lib/vulnerabilities";
import { PulseFeedCard } from "./PulseFeedCard";
import { formatDateTime } from "@/lib/format";

interface PulseFeedProps {
  selectedTech: string | null;
  onClearTech: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  filteredItems: Vulnerability[];
  paginatedItems: Vulnerability[];
  lastUpdated: string;
  totalPulseCount: number;
}

export function PulseFeed({
  selectedTech,
  onClearTech,
  currentPage,
  totalPages,
  onPageChange,
  filteredItems,
  paginatedItems,
  lastUpdated,
  totalPulseCount,
}: PulseFeedProps) {
  return (
    <div className="lg:col-span-2">
      <div className="flex flex-col justify-between mb-8 min-h-[80px]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-cloud-white flex items-center gap-3">
            {selectedTech ? (
              <TrendingUp className="w-5 h-5 text-electric-current" />
            ) : (
              <Clock className="w-5 h-5 text-ember-cta" />
            )}
            <span className="truncate max-w-[350px]">
              {selectedTech ? `30-Day Activity: ${selectedTech}` : "Emerging Pulse Feed"}
            </span>
          </h3>

          <div className="flex items-center gap-4">
            {totalPages > 1 && (
              <div className="flex items-center gap-1 bg-void-base/40 rounded-xl p-1 border border-border-smoke">
                <button
                  disabled={currentPage === 1}
                  onClick={() => onPageChange((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg hover:bg-muted-shell/40 disabled:opacity-20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-cloud-white" />
                </button>
                <span className="text-[11px] text-fog-text px-2 font-mono">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg hover:bg-muted-shell/40 disabled:opacity-20 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-cloud-white" />
                </button>
              </div>
            )}
            <span className="text-xs font-bold text-fog-text bg-muted-shell/20 px-3 py-1.5 rounded-full border border-border-smoke uppercase tracking-wider whitespace-nowrap">
              {selectedTech ? `${filteredItems.length} incidents` : `${totalPulseCount} Emerging Pulse`}
            </span>
          </div>
        </div>

        <div className="h-5 flex items-center mb-1">
          {selectedTech ? (
            <button
              onClick={onClearTech}
              className="flex items-center gap-1.5 text-xs font-medium text-electric-current hover:text-cloud-white transition-colors w-fit group/back px-1"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover/back:-translate-x-0.5" />
              Back to Emerging Pulse
            </button>
          ) : (
            <div className="flex items-center gap-3 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-current animate-pulse" />
                <span className="text-[10px] font-medium text-ash-text/40 uppercase tracking-widest">
                  Live monitoring active
                </span>
              </div>
              <div className="w-[1px] h-3 bg-border-smoke/50" />
              <span className="text-[10px] font-medium text-ash-text/40 uppercase tracking-widest">
                Last synced: {formatDateTime(lastUpdated)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 min-h-[600px]">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((vuln) => <PulseFeedCard key={vuln.id} vuln={vuln} />)
        ) : (
          <div className="p-12 text-center border border-dashed border-border-smoke rounded-2xl">
            <p className="text-ash-text">No incidents found for this technology in the selected period.</p>
            <button onClick={onClearTech} className="text-electric-current text-sm mt-2 hover:underline">
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
