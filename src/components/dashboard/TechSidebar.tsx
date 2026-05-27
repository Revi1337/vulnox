import { TrendingUp } from "lucide-react";
import { type Analytics } from "@/lib/vulnerabilities";

interface TechSidebarProps {
  analyticsData: Analytics;
  selectedTech: string | null;
  onTechClick: (techName: string) => void;
  hoveredTech: string | null;
  onHoverTech: (techName: string | null) => void;
}

export function TechSidebar({
  analyticsData,
  selectedTech,
  onTechClick,
  hoveredTech,
  onHoverTech,
}: TechSidebarProps) {
  return (
    <div className="sticky top-24">
      <h3 className="text-xl font-medium text-cloud-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-electric-current" />
        Hot Tech Targets
      </h3>
      <div className="flex flex-col gap-3">
        {analyticsData.topTechnologies.map((tech, idx) => (
          <button
            key={tech.name}
            onMouseEnter={() => onHoverTech(tech.name)}
            onMouseLeave={() => onHoverTech(null)}
            onClick={() => onTechClick(tech.name)}
            className={`p-4 rounded-xl border transition-all duration-300 text-left flex items-center justify-between ${
              selectedTech === tech.name
                ? "bg-electric-current/20 border-electric-current shadow-[0_0_20px_rgba(7,122,199,0.4)] ring-1 ring-electric-current scale-[1.02]"
                : hoveredTech === tech.name
                ? "bg-muted-shell/40 border-border-smoke translate-x-1"
                : "bg-elevated-surface border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono ${
                  selectedTech === tech.name ? "text-electric-current" : "text-fog-text"
                }`}
              >
                #{idx + 1}
              </span>
              <span
                className={`text-sm ${
                  selectedTech === tech.name ? "text-cloud-white font-medium" : "text-cloud-white"
                }`}
              >
                {tech.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-void-base rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    selectedTech === tech.name ? "bg-cloud-white" : "bg-electric-current"
                  }`}
                  style={{
                    width: `${(tech.count / analyticsData.topTechnologies[0].count) * 100}%`,
                  }}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  selectedTech === tech.name ? "text-electric-current" : "text-ash-text"
                }`}
              >
                {tech.count}
              </span>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-6 text-[11px] text-ash-text leading-relaxed px-2 italic">
        * Click a technology to view its 30-day threat activity.
      </p>
    </div>
  );
}
