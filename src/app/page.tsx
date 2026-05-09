import Link from "next/link";
import { ArrowRight, ShieldAlert, Zap, Trophy, BarChart3, Globe, Medal, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12 relative">
        <div className="flex-1 flex flex-col items-start z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-current/10 border border-electric-current/20 mb-14">
            <span className="w-2 h-2 rounded-full bg-electric-current animate-pulse" />
            <span className="text-[10px] text-electric-current tracking-[0.1em] uppercase font-bold">Live Threat Feed Active</span>
          </div>

          <h1 className="text-[48px] md:text-[64px] font-light leading-[0.88] tracking-[-0.02em] text-cloud-white mb-10 max-w-xl">
            Precision Threat Intelligence.<br />
            <span className="text-ash-text text-[40px] md:text-[52px]">Selected for Impact.</span>
          </h1>

          <p className="text-lg md:text-xl text-ash-text mb-12 max-w-[540px] leading-relaxed font-light">
            Monitor emerging security pulses as they break and explore a curated gallery of history&apos;s most critical, actively exploited vulnerabilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-ember-gradient text-cloud-white px-10 py-4 rounded-[8px] font-medium hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-3 group"
            >
              Explore Live Pulse <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/all-star"
              className="w-full sm:w-auto px-10 py-4 rounded-[8px] border border-border-smoke text-cloud-white font-medium hover:bg-muted-shell/30 transition-all flex items-center justify-center gap-3"
            >
              <Trophy className="w-5 h-5 text-ember-scorch" /> All-Star Gallery
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex-1 relative w-full aspect-square md:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-electric-gradient opacity-10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />

          <div className="relative z-10 w-full max-w-[450px] aspect-square bg-elevated-surface rounded-[32px] border border-border-smoke shadow-subtle-2 flex items-center justify-center group overflow-hidden">
            {/* Glowing lines background effect */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-current to-transparent" />
              <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-ember-scorch to-transparent" />
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-current to-transparent" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-ember-scorch blur-3xl opacity-30 animate-pulse" />
                <ShieldAlert className="w-40 h-40 text-ember-scorch relative z-20" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-fog-text tracking-[0.2em] uppercase font-bold">Threat Intelligence</span>
                <span className="text-xl font-light text-cloud-white">Global Pulse Dashboard</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-electric-gradient" />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-24 border-t border-border-smoke/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-electric-current/30 transition-all group">
            <div className="w-12 h-12 bg-electric-current/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-electric-current" />
            </div>
            <h3 className="text-xl font-medium text-cloud-white mb-4">Today&apos;s Pulse</h3>
            <p className="text-ash-text leading-relaxed font-light">
              Real-time monitoring of newly discovered vulnerabilities across the globe. Updated every 2 hours with full NVD technical insights.
            </p>
          </div>

          <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-ember-scorch/30 transition-all group">
            <div className="w-12 h-12 bg-ember-scorch/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-ember-scorch" />
            </div>
            <h3 className="text-xl font-medium text-cloud-white mb-4">All-Star Gallery</h3>
            <p className="text-ash-text leading-relaxed font-light">
              A curated collection of history&apos;s most critical vulnerabilities. Sourced from the CISA KEV catalog for verified impact analysis.
            </p>
          </div>

          <div className="bg-elevated-surface p-10 rounded-[24px] border border-border-smoke hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-medium text-cloud-white mb-4">Threat Analytics</h3>
            <p className="text-ash-text leading-relaxed font-light">
              Visual insights into global trends. Identify which technologies are under attack and monitor severity distributions in real-time.
            </p>
          </div>

        </div>
      </section>

      {/* Hall of Fame / Leaderboard Showcase Section */}
      <section className="w-full bg-void-base/30 py-32 border-t border-b border-border-smoke/20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[10px] text-amber-500 tracking-[0.15em] uppercase font-bold">Annual Hall of Fame</span>
            </div>

            <h2 className="text-[40px] md:text-[52px] font-light text-cloud-white leading-tight mb-8">
              The Annual <br />
              <span className="text-amber-500 italic">Threat Leaderboard.</span>
            </h2>

            <p className="text-ash-text text-lg leading-relaxed font-light mb-10 max-w-lg">
              Explore the definitive ranking of history&apos;s most impactful security flaws.
              Our Hall of Fame uses a weighted analysis of active exploitation, CVSS severity, and documented ransomware impact to crown the &apos;Threat of the Year&apos;.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                { title: "Impact-First Analysis", desc: "Prioritizing threats with proven ransomware association." },
                { title: "Historical Archive", desc: "A timeline of security vulnerabilities dating back to 2016." },
                { title: "Ranked Severity", desc: "Distinguishing between theoretical risk and real-world impact." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <div>
                    <h4 className="text-cloud-white font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-fog-text leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-3 text-amber-500 font-medium hover:gap-5 transition-all group"
            >
              Enter the Hall of Fame <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex-1 relative w-full">
            {/* Visual Representation of Leaderboard Cards */}
            <div className="relative z-10 space-y-4">
              <div className="bg-gradient-to-r from-[#10b981]/20 to-transparent border border-[#10b981]/30 p-6 rounded-[20px] transform hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Medal className="w-8 h-8 text-[#10b981]" />
                  <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest">2026 Champion</span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#10b981] w-full" />
                </div>
                <div className="text-xs text-[#10b981] font-medium uppercase">Highest Impact Score</div>
              </div>

              <div className="bg-gradient-to-r from-[#f97316]/10 to-transparent border border-[#f97316]/20 p-6 rounded-[20px] md:ml-8 transform hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-8 h-8 text-[#f97316]" />
                  <span className="text-[10px] text-[#f97316] font-bold uppercase tracking-widest">2025 Runner Up</span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#f97316] w-3/4" />
                </div>
                <div className="text-xs text-[#f97316] font-medium uppercase">Severity Rank #2</div>
              </div>

              <div className="bg-gradient-to-r from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20 p-6 rounded-[20px] md:ml-16 transform hover:-translate-y-1 transition-all opacity-80">
                <div className="flex items-center justify-between mb-4">
                  <Medal className="w-8 h-8 text-[#8b5cf6]" />
                  <span className="text-[10px] text-[#8b5cf6] font-bold uppercase tracking-widest">2024 Bronze</span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#8b5cf6] w-1/2" />
                </div>
                <div className="text-xs text-[#8b5cf6] font-medium uppercase">Impact Rank #3</div>
              </div>
            </div>

            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Social / Trust Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-6 opacity-40 hover:opacity-60 transition-opacity">
          <Globe className="w-8 h-8 text-fog-text" />
          <p className="text-xs text-fog-text tracking-[0.25em] uppercase font-bold">
            Powered by NVD API 2.0 & CISA KEV Data
          </p>
        </div>
      </section>
    </div>
  );
}
