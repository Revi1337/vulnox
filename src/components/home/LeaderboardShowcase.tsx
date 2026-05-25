import Link from "next/link";
import { ArrowRight, Star, Medal, Trophy } from "lucide-react";

export function LeaderboardShowcase() {
  return (
    <section className="w-full bg-void-base/30 py-32 border-t border-b border-border-smoke/20">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[10px] text-amber-500 tracking-[0.15em] uppercase font-bold">
              Annual Hall of Fame
            </span>
          </div>

          <h2 className="text-[40px] md:text-[52px] font-light text-cloud-white leading-tight mb-8">
            The Annual <br />
            <span className="text-amber-500 italic">Threat Leaderboard.</span>
          </h2>

          <p className="text-ash-text text-lg leading-relaxed font-light mb-10 max-w-lg">
            Explore the definitive ranking of history&apos;s most impactful security flaws. Our Hall
            of Fame uses a weighted analysis of active exploitation, CVSS severity, and documented
            ransomware impact to crown the &apos;Threat of the Year&apos;.
          </p>

          <ul className="space-y-6 mb-12">
            {[
              {
                title: "Impact-First Analysis",
                desc: "Prioritizing threats with proven ransomware association.",
              },
              {
                title: "Historical Archive",
                desc: "A timeline of security vulnerabilities dating back to 2016.",
              },
              {
                title: "Ranked Severity",
                desc: "Distinguishing between theoretical risk and real-world impact.",
              },
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
                <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest">
                  2026 Champion
                </span>
              </div>
              <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#10b981] w-full" />
              </div>
              <div className="text-xs text-[#10b981] font-medium uppercase">
                Highest Impact Score
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#f97316]/10 to-transparent border border-[#f97316]/20 p-6 rounded-[20px] md:ml-8 transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-[#f97316]" />
                <span className="text-[10px] text-[#f97316] font-bold uppercase tracking-widest">
                  2025 Runner Up
                </span>
              </div>
              <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#f97316] w-3/4" />
              </div>
              <div className="text-xs text-[#f97316] font-medium uppercase">Severity Rank #2</div>
            </div>

            <div className="bg-gradient-to-r from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20 p-6 rounded-[20px] md:ml-16 transform hover:-translate-y-1 transition-all opacity-80">
              <div className="flex items-center justify-between mb-4">
                <Medal className="w-8 h-8 text-[#8b5cf6]" />
                <span className="text-[10px] text-[#8b5cf6] font-bold uppercase tracking-widest">
                  2024 Bronze
                </span>
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
  );
}
