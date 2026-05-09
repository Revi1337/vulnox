import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-void-base relative overflow-hidden pt-16 pb-8 border-t border-border-smoke mt-24">
      {/* n8n style radial rose glow in the upper-right corner of the footer */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle farthest-side at 100% -80%, rgba(175,106,140,0.2), rgba(98,65,83,0.15) 39%, transparent 55%)'
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold tracking-tighter text-cloud-white mb-4">
              VUL<span className="text-electric-current">NOX</span>
            </h3>
            <p className="text-sm text-fog-text mb-6 leading-relaxed">
              Precision-curated intelligence for high-impact security vulnerabilities. Powered by NVD API 2.0 & CISA KEV Data.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-ash-text hover:text-cloud-white transition-colors text-sm font-medium">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-ash-text hover:text-cloud-white transition-colors text-sm font-medium">
                Twitter
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-cloud-white mb-4">Explore</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/catalog" className="text-sm text-fog-text hover:text-ash-text transition-colors">Live Threat Pulse</Link></li>
              <li><Link href="/all-star" className="text-sm text-fog-text hover:text-ash-text transition-colors">All-Star Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-cloud-white mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="https://owasp.org/" target="_blank" rel="noreferrer" className="text-sm text-fog-text hover:text-ash-text transition-colors">OWASP Top 10</a></li>
              <li><a href="https://nvd.nist.gov/" target="_blank" rel="noreferrer" className="text-sm text-fog-text hover:text-ash-text transition-colors">NVD Database</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border-smoke flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-fog-text">© {new Date().getFullYear()} VULNOX Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
