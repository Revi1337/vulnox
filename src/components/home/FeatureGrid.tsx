"use client";

import { useRef, useState, MouseEvent } from "react";
import { Zap, Trophy, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[24px] glass-panel transition-colors duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.08), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export function FeatureGrid() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-24 border-t border-border-smoke/30">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Today's Pulse */}
        <motion.div variants={cardVariants} className="h-full">
          <SpotlightCard className="p-10 h-full group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-electric-current/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(7,122,199,0.2)]">
                <Zap className="w-6 h-6 text-electric-current drop-shadow-[0_0_8px_rgba(7,122,199,0.8)]" />
              </div>
              <h3 className="text-xl font-medium text-cloud-white mb-4">Today&apos;s Pulse</h3>
              <p className="text-ash-text leading-relaxed font-light">
                Real-time monitoring of newly discovered vulnerabilities across the globe. Updated every 2
                hours with full NVD technical insights.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* All-Star Gallery */}
        <motion.div variants={cardVariants} className="h-full">
          <SpotlightCard className="p-10 h-full group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-ember-scorch/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,73,44,0.2)]">
                <Trophy className="w-6 h-6 text-ember-scorch drop-shadow-[0_0_8px_rgba(255,73,44,0.8)]" />
              </div>
              <h3 className="text-xl font-medium text-cloud-white mb-4">All-Star Gallery</h3>
              <p className="text-ash-text leading-relaxed font-light">
                A curated collection of history&apos;s most critical vulnerabilities. Sourced from the
                CISA KEV catalog for verified impact analysis.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Threat Analytics */}
        <motion.div variants={cardVariants} className="h-full">
          <SpotlightCard className="p-10 h-full group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <BarChart3 className="w-6 h-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              </div>
              <h3 className="text-xl font-medium text-cloud-white mb-4">Threat Analytics</h3>
              <p className="text-ash-text leading-relaxed font-light">
                Visual insights into global trends. Identify which technologies are under attack and
                monitor severity distributions in real-time.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
