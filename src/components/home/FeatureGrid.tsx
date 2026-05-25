import { Zap, Trophy, BarChart3 } from "lucide-react";

export function FeatureGrid() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-24 border-t border-border-smoke/30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Today's Pulse */}
        <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-electric-current/30 transition-all group">
          <div className="w-12 h-12 bg-electric-current/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-electric-current" />
          </div>
          <h3 className="text-xl font-medium text-cloud-white mb-4">Today&apos;s Pulse</h3>
          <p className="text-ash-text leading-relaxed font-light">
            Real-time monitoring of newly discovered vulnerabilities across the globe. Updated every 2
            hours with full NVD technical insights.
          </p>
        </div>

        {/* All-Star Gallery */}
        <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-ember-scorch/30 transition-all group">
          <div className="w-12 h-12 bg-ember-scorch/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6 text-ember-scorch" />
          </div>
          <h3 className="text-xl font-medium text-cloud-white mb-4">All-Star Gallery</h3>
          <p className="text-ash-text leading-relaxed font-light">
            A curated collection of history&apos;s most critical vulnerabilities. Sourced from the
            CISA KEV catalog for verified impact analysis.
          </p>
        </div>

        {/* Threat Analytics */}
        <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-amber-500/30 transition-all group">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-xl font-medium text-cloud-white mb-4">Threat Analytics</h3>
          <p className="text-ash-text leading-relaxed font-light">
            Visual insights into global trends. Identify which technologies are under attack and
            monitor severity distributions in real-time.
          </p>
        </div>
      </div>
    </section>
  );
}
