import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

async function fetchPulse() {
  console.log("🚀 Fetching Emerging Pulse (Last 72 Hours, shifted by 24h)...");

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const fourDaysAgo = new Date(now.getTime() - (96 * 60 * 60 * 1000));

  const startDate = fourDaysAgo.toISOString().split('.')[0] + ".000%2B00:00";
  const endDate = oneDayAgo.toISOString().split('.')[0] + ".000%2B00:00";

  let allPulse = [];
  let startIndex = 0;
  let totalResults = 1;

  try {
    while (startIndex < totalResults) {
      const url = `${NVD_API_URL}?pubStartDate=${startDate}&pubEndDate=${endDate}&resultsPerPage=2000&startIndex=${startIndex}`;
      console.log(`Fetching Pulse (startIndex: ${startIndex})...`);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.statusText}`);
      const data = await res.json();

      totalResults = data.totalResults;

      const pagePulse = data.vulnerabilities.map(item => {
        const cve = item.cve;

        let severity = "Unknown";
        if (cve.metrics?.cvssMetricV31?.[0]) severity = cve.metrics.cvssMetricV31[0].cvssData.baseSeverity;
        else if (cve.metrics?.cvssMetricV30?.[0]) severity = cve.metrics.cvssMetricV30[0].cvssData.baseSeverity;

        severity = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();

        let tech = "Unknown";
        if (cve.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria) {
          const parts = cve.configurations[0].nodes[0].cpeMatch[0].criteria.split(':');
          if (parts.length > 4) tech = parts[4].replace(/_/g, ' ');
        }

        return {
          id: cve.id,
          description: cve.descriptions.find(d => d.lang === 'en')?.value || "",
          severity,
          tech: tech.charAt(0).toUpperCase() + tech.slice(1),
          published: cve.published
        };
      });

      allPulse.push(...pagePulse);
      startIndex += 2000;

      if (startIndex < totalResults) {
        console.log("Waiting to avoid Rate Limit...");
        await new Promise(r => setTimeout(r, 6000));
      }
    }

    if (allPulse.length > 0) {
      // Sort by published date descending (latest first)
      allPulse.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

      // 1. Write to public/data/pulse.json (for client-side runtime fetching)
      const publicDataDir = path.join(__dirname, '..', 'public', 'data');
      if (!fs.existsSync(publicDataDir)) {
        fs.mkdirSync(publicDataDir, { recursive: true });
      }
      const publicDataPath = path.join(publicDataDir, 'pulse.json');
      fs.writeFileSync(publicDataPath, JSON.stringify(allPulse, null, 2));

      // 2. Write to data/pulse.json (for build-time pre-rendering / backup)
      const dataPath = path.join(__dirname, '..', 'data', 'pulse.json');
      fs.writeFileSync(dataPath, JSON.stringify(allPulse, null, 2));

      console.log(`✨ Pulse collection complete! Found ${allPulse.length} total items.`);
    } else {
      console.warn("⚠️ No new items fetched from NVD API. Retaining existing pulse.json data to prevent blank pages.");
    }
  } catch (error) {
    console.error("Error fetching pulse data:", error);
  }
}

fetchPulse();
