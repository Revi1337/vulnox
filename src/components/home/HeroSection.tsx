import Link from "next/link";
import { ArrowRight, Trophy, ShieldAlert } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12 relative">
      <div className="flex-1 flex flex-col items-start z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-current/10 border border-electric-current/20 mb-14">
          <span className="w-2 h-2 rounded-full bg-electric-current animate-pulse" />
          <span className="text-[10px] text-electric-current tracking-[0.1em] uppercase font-bold">
            Live Threat Feed Active
          </span>
        </div>

        <h1 className="text-[48px] md:text-[64px] font-light leading-[0.88] tracking-[-0.02em] text-cloud-white mb-10 max-w-xl">
          Precision Threat Intelligence.
          <br />
          <span className="text-ash-text text-[40px] md:text-[52px]">Selected for Impact.</span>
        </h1>

        <p className="text-lg md:text-xl text-ash-text mb-12 max-w-[540px] leading-relaxed font-light">
          Monitor emerging security pulses as they break and explore a curated gallery of
          history&apos;s most critical, actively exploited vulnerabilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link
            href="/catalog"
            className="w-full sm:w-auto bg-ember-gradient text-cloud-white px-10 py-4 rounded-[8px] font-medium hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-3 group"
          >
            Explore Live Pulse{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              <span className="text-[10px] text-fog-text tracking-[0.2em] uppercase font-bold">
                Threat Intelligence
              </span>
              <span className="text-xl font-light text-cloud-white">Global Pulse Dashboard</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-electric-gradient" />
        </div>
      </div>
    </section>
  );
}
