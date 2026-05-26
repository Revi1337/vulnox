"use client";

import Link from "next/link";
import { ArrowRight, Trophy, ShieldAlert } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

export function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12 relative">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-start z-10 relative"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-current/10 border border-electric-current/20 mb-14 glass-panel">
          <span className="w-2 h-2 rounded-full bg-electric-current animate-pulse shadow-[0_0_10px_rgba(7,122,199,0.8)]" />
          <span className="text-[10px] text-electric-current tracking-[0.1em] uppercase font-bold">
            Live Threat Feed Active
          </span>
        </motion.div>

        <h1 className="text-[48px] md:text-[64px] font-light leading-[0.88] tracking-[-0.02em] text-cloud-white mb-10 max-w-xl">
          <TextReveal text="Precision Threat Intelligence." />
          <br />
          <span className="text-ash-text text-[40px] md:text-[52px]">
            <TextReveal text="Selected for Impact." />
          </span>
        </h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-ash-text mb-12 max-w-[540px] leading-relaxed font-light">
          Monitor emerging security pulses as they break and explore a curated gallery of
          history&apos;s most critical, actively exploited vulnerabilities.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link
            href="/catalog"
            className="btn-shine w-full sm:w-auto bg-ember-gradient text-cloud-white px-10 py-4 rounded-[8px] font-medium transition-all shadow-sm flex items-center justify-center gap-3 group"
          >
            Explore Live Pulse{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/all-star"
            className="glass-panel w-full sm:w-auto px-10 py-4 rounded-[8px] text-cloud-white font-medium hover:bg-cloud-white/5 transition-all flex items-center justify-center gap-3 !border-border-smoke/50 dark:!border-cloud-white/20"
          >
            <Trophy className="w-5 h-5 text-ember-scorch" /> All-Star Gallery
          </Link>
        </motion.div>
      </motion.div>

      {/* Hero Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", damping: 20 }}
        className="flex-1 relative w-full aspect-square md:h-[600px] flex items-center justify-center"
      >
        {/* Animated Mesh Gradient Background */}
        <motion.div 
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-electric-gradient blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 0.85, 1.1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-ember-gradient blur-[120px] rounded-full" 
        />

        <div className="relative z-10 w-full max-w-[450px] aspect-square glass-panel rounded-[32px] !border-border-smoke/50 dark:!border-cloud-white/20 !bg-elevated-surface/70 dark:!bg-elevated-surface/30 flex items-center justify-center group overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(107,33,239,0.15)]">
          {/* Glowing lines background effect */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-current to-transparent" />
            <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-ember-scorch to-transparent" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-current to-transparent" />
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-ember-scorch blur-3xl opacity-40 animate-pulse" />
              <ShieldAlert className="w-40 h-40 text-ember-scorch relative z-20 drop-shadow-[0_0_15px_rgba(255,73,44,0.5)]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-cloud-white/60 tracking-[0.2em] uppercase font-bold">
                Threat Intelligence
              </span>
              <span className="text-xl font-light text-cloud-white">Global Pulse Dashboard</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-electric-gradient" />
        </div>
      </motion.div>
    </section>
  );
}
