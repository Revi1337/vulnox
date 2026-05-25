import { Globe } from "lucide-react";

export function TrustSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-6 opacity-40 hover:opacity-60 transition-opacity">
        <Globe className="w-8 h-8 text-fog-text" />
        <p className="text-xs text-fog-text tracking-[0.25em] uppercase font-bold">
          Powered by NVD API 2.0 & CISA KEV Data
        </p>
      </div>
    </section>
  );
}
