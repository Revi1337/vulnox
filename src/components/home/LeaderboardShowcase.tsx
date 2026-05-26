"use client";

import Link from "next/link";
import { ArrowRight, Star, Medal, Trophy } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

export function LeaderboardShowcase() {
  return (
    <section className="w-full bg-void-base/30 py-32 border-t border-b border-border-smoke/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-void-base/80 backdrop-blur-3xl -z-10" />
      
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 glass-panel">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-[10px] text-amber-500 tracking-[0.15em] uppercase font-bold">
              Annual Hall of Fame
            </span>
          </div>

          <h2 className="text-[40px] md:text-[52px] font-light text-cloud-white leading-tight mb-8">
            <TextReveal text="The Annual" /> <br />
            <span className="text-amber-500 italic">
              <TextReveal text="Threat Leaderboard." />
            </span>
          </h2>

          <p className="text-ash-text text-lg leading-relaxed font-light mb-10 max-w-lg">
            Explore the definitive ranking of history&apos;s most impactful security flaws. Our Hall
            of Fame uses a weighted analysis of active exploitation, CVSS severity, and documented
            ransomware impact to crown the &apos;Threat of the Year&apos;.
          </p>

          <motion.ul 
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-12"
          >
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
              <motion.li variants={itemVariants} key={i} className="flex items-start gap-4">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <div>
                  <h4 className="text-cloud-white font-medium text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-fog-text leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-3 text-amber-500 font-medium hover:gap-5 transition-all group btn-shine py-2 px-4 rounded-lg hover:bg-amber-500/10"
          >
            Enter the Hall of Fame <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="flex-1 relative w-full perspective-[1000px]">
          {/* Visual Representation of Leaderboard Cards */}
          <div className="relative z-10 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            >
              <TiltCard className="bg-gradient-to-r from-[#10b981]/10 to-transparent border-[#10b981]/20 p-6 rounded-[20px]">
                <div className="flex items-center justify-between mb-4">
                  <Medal className="w-8 h-8 text-[#10b981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest">
                    2026 Champion
                  </span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)]" 
                  />
                </div>
                <div className="text-xs text-[#10b981] font-medium uppercase">
                  Highest Impact Score
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
            >
              <TiltCard className="bg-gradient-to-r from-[#f97316]/10 to-transparent border-[#f97316]/20 p-6 rounded-[20px] md:ml-8">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-8 h-8 text-[#f97316] drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                  <span className="text-[10px] text-[#f97316] font-bold uppercase tracking-widest">
                    2025 Runner Up
                  </span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]" 
                  />
                </div>
                <div className="text-xs text-[#f97316] font-medium uppercase">Severity Rank #2</div>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
            >
              <TiltCard className="bg-gradient-to-r from-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/20 p-6 rounded-[20px] md:ml-16 opacity-80">
                <div className="flex items-center justify-between mb-4">
                  <Medal className="w-8 h-8 text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                  <span className="text-[10px] text-[#8b5cf6] font-bold uppercase tracking-widest">
                    2024 Bronze
                  </span>
                </div>
                <div className="h-2 w-full bg-void-base/50 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.8)]" 
                  />
                </div>
                <div className="text-xs text-[#8b5cf6] font-medium uppercase">Impact Rank #3</div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        </div>
      </div>
    </section>
  );
}
