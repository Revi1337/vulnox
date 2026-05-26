import { getKevVulnerabilities } from "@/lib/vulnerabilities";
import { CatalogClient } from "../catalog/catalog-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All-Star Vulnerability Gallery | VULNOX",
  description: "A curated showcase of history's most impactful and actively exploited security threats sourced from CISA KEV.",
};

export default function AllStarPage() {
  const vulnerabilities = getKevVulnerabilities();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-elevated-surface border border-border-smoke shadow-sm mb-6">
          <span className="text-[13px]">🌟</span>
          <span className="text-[11px] text-cloud-white font-medium tracking-widest uppercase">All-Star Collection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-cloud-white mb-4 tracking-tight">
          The All-Star Vulnerability Gallery
        </h1>
        <p className="text-lg text-ash-text max-w-2xl leading-relaxed">
          A curated showcase of history&apos;s most impactful and actively exploited security threats. 
          Sourced directly from the CISA KEV catalog, this gallery highlights the vulnerabilities 
          that defined the cybersecurity landscape.
        </p>
      </div>
      
      <CatalogClient initialData={vulnerabilities} />
    </div>
  );
}
