import { useState, useEffect } from "react";
import { type Vulnerability } from "@/lib/vulnerabilities";

export function useLivePulse(initialPulseData: Vulnerability[]) {
  const [pulseList, setPulseList] = useState<Vulnerability[]>(initialPulseData);

  useEffect(() => {
    async function fetchLivePulse() {
      try {
        const res = await fetch("/data/pulse.json");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPulseList(data);
          }
        }
      } catch (err) {
        console.error("Failed to dynamically fetch live pulse data:", err);
      }
    }
    fetchLivePulse();
  }, []);

  return pulseList;
}
