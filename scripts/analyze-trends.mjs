import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

async function analyzeTrends() {
  console.log("🚀 Analyzing Threat Trends (Last 30 Days)...");
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  
  const startDate = thirtyDaysAgo.toISOString().split('.')[0] + ".000%2B00:00";
  const endDate = now.toISOString().split('.')[0] + ".000%2B00:00";
  
  const severityCount = { Critical: 0, High: 0, Medium: 0, Low: 0, Unknown: 0 };
  const techCount = {};
  const allVulnerabilities = [];
  let startIndex = 0;
  let totalResults = 1;
  let totalProcessed = 0;

  try {
    while (startIndex < totalResults) {
      const url = `${NVD_API_URL}?pubStartDate=${startDate}&pubEndDate=${endDate}&resultsPerPage=2000&startIndex=${startIndex}`;
      console.log(`Fetching Analytics Data (startIndex: ${startIndex})...`);
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.statusText}`);
      const data = await res.json();
      
      totalResults = data.totalResults;
      
      data.vulnerabilities.forEach(item => {
        const cve = item.cve;
        
        // Severity
        let severity = "Unknown";
        if (cve.metrics?.cvssMetricV31?.[0]) severity = cve.metrics.cvssMetricV31[0].cvssData.baseSeverity;
        else if (cve.metrics?.cvssMetricV30?.[0]) severity = cve.metrics.cvssMetricV30[0].cvssData.baseSeverity;
        
        severity = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();
        if (severityCount.hasOwnProperty(severity)) severityCount[severity]++;
        else severityCount.Unknown++;

        // Tech
        let tech = "Unknown";
        if (cve.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria) {
          const parts = cve.configurations[0].nodes[0].cpeMatch[0].criteria.split(':');
          if (parts.length > 4) {
            tech = parts[4].replace(/_/g, ' ');
            tech = tech.charAt(0).toUpperCase() + tech.slice(1);
            techCount[tech] = (techCount[tech] || 0) + 1;
          }
        }

        allVulnerabilities.push({
          id: cve.id,
          description: cve.descriptions.find(d => d.lang === 'en')?.value || "",
          severity,
          tech,
          published: cve.published
        });

        totalProcessed++;
      });

      startIndex += 2000;
      if (startIndex < totalResults) {
        console.log("Waiting to avoid Rate Limit...");
        await new Promise(r => setTimeout(r, 6000));
      }
    }

    // Sort tech by count and get top 8
    const topTech = Object.entries(techCount)
      .filter(([name]) => name !== "Unknown")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    const analytics = {
      lastUpdated: now.toISOString(),
      sampleSize: totalProcessed,
      severityDistribution: severityCount,
      topTechnologies: topTech
    };

    const analyticsPath = path.join(__dirname, '..', 'data', 'analytics.json');
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));

    const trendsPath = path.join(__dirname, '..', 'data', 'trends.json');
    fs.writeFileSync(trendsPath, JSON.stringify(allVulnerabilities, null, 2));

    console.log(`✨ Analytics and Trends generation complete!`);
  } catch (error) {
    console.error("Error generating analytics:", error);
  }
}

analyzeTrends();
