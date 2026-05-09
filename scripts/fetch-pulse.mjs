import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

async function fetchPulse() {
  console.log("🚀 Fetching Today's Pulse (Last 24 Hours)...");

  const now = new Date();
  const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));

  const startDate = yesterday.toISOString().split('.')[0] + ".000%2B00:00";
  const endDate = now.toISOString().split('.')[0] + ".000%2B00:00";

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

    const dataPath = path.join(__dirname, '..', 'data', 'pulse.json');
    fs.writeFileSync(dataPath, JSON.stringify(allPulse, null, 2));
    console.log(`✨ Pulse collection complete! Found ${allPulse.length} total items.`);
  } catch (error) {
    console.error("Error fetching pulse data:", error);
  }
}

fetchPulse();
