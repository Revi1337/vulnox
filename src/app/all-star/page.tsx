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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 text-xs text-amber-500 uppercase font-medium tracking-wider">
          🌟 All-Star Collection
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-cloud-white mb-4 tracking-tight">
          The All-Star Vulnerability Gallery
        </h1>
        <p className="text-lg text-ash-text max-w-2xl leading-relaxed">
          A curated showcase of history's most impactful and actively exploited security threats. 
          Sourced directly from the CISA KEV catalog, this gallery highlights the vulnerabilities 
          that defined the cybersecurity landscape.
        </p>
      </div>
      
      <CatalogClient initialData={vulnerabilities} />
    </div>
  );
}
