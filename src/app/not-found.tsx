"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700 relative overflow-hidden">
      {/* Background glowing ambient vector */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-ember-scorch blur-[150px] opacity-10 rounded-full mix-blend-screen pointer-events-none animate-pulse" />
      
      <div className="relative z-10 max-w-md flex flex-col items-center">
        {/* Glassmorphic Glowing Warning Badge */}
        <div className="inline-flex items-center justify-center p-5 bg-ember-scorch/10 border border-ember-scorch/20 rounded-full mb-8 shadow-[0_0_30px_rgba(255,73,44,0.15)] animate-pulse">
          <ShieldAlert className="w-12 h-12 text-ember-scorch" />
        </div>
        
        {/* Typographical Heading */}
        <h1 className="text-4xl md:text-5xl font-medium text-cloud-white mb-4 tracking-tight">
          404 - Threat Vector Lost
        </h1>
        
        {/* Description */}
        <p className="text-sm md:text-base text-ash-text mb-8 leading-relaxed font-medium">
          The intelligence vector you are trying to intercept does not exist, has been relocated, or is classified under a higher clearance level.
        </p>
        
        {/* Sleek CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-electric-gradient text-cloud-white rounded-xl border border-electric-current/30 hover:border-electric-current/60 hover:shadow-[0_0_20px_rgba(7,122,199,0.3)] transition-all group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Return to Safe Zone
        </Link>
      </div>
    </div>
  );
}
