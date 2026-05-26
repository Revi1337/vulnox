import { Globe, Shield, Lock, Server, Activity, Database, Key } from "lucide-react";

export function TrustSection() {
  const items = [
    { icon: Globe, text: "Powered by NVD API 2.0" },
    { icon: Shield, text: "CISA KEV Verified" },
    { icon: Database, text: "MITRE ATT&CK Mapping" },
    { icon: Activity, text: "Live Threat Telemetry" },
    { icon: Server, text: "Global Edge Network" },
    { icon: Lock, text: "Zero-Day Surveillance" },
    { icon: Key, text: "CVSS v4.0 Analysis" },
  ];

  // We duplicate items multiple times to ensure a seamless infinite scroll loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="w-full py-20 overflow-hidden border-t border-border-smoke/20 bg-void-base/50">
      <div className="flex flex-col items-center gap-10">
        <p className="text-xs text-fog-text tracking-[0.3em] uppercase font-bold text-center px-6">
          Trusted Intelligence Sources & Capabilities
        </p>
        
        <div className="w-full relative flex overflow-hidden mask-fade-x py-4">
          <div className="flex animate-marquee whitespace-nowrap items-center w-max">
            {duplicatedItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 px-10 opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <Icon className="w-6 h-6 text-cloud-white" />
                  <span className="text-sm text-cloud-white font-medium tracking-wide uppercase">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
