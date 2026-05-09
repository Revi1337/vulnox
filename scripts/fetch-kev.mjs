import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const CISA_KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
const CWE_DICT_URL = "https://raw.githubusercontent.com/OWASP/cwe-sdk-javascript/master/raw/cwe-dictionary.json";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchKEV() {
  console.log("🚀 Starting CISA KEV (All-Star) Data Consolidation...");

  // 1. Fetch CISA Official KEV Feed
  let cisaMap = new Map();
  try {
    console.log("Fetching CISA Official JSON Feed...");
    const res = await fetch(CISA_KEV_URL);
    const data = await res.json();
    data.vulnerabilities.forEach(v => {
      cisaMap.set(v.cveID, {
        vulnerabilityName: v.vulnerabilityName,
        isRansomware: v.knownRansomwareCampaignUse === "Known",
        requiredAction: v.requiredAction,
        dateAdded: v.dateAdded
      });
    });
    console.log(`Loaded ${cisaMap.size} vulnerabilities from CISA Official Feed.`);
  } catch (err) {
    console.error("Failed to load CISA Official Feed.", err);
  }

  // 2. Fetch CWE Dictionary
  let cweDict = {};
  try {
    console.log("Fetching CWE dictionary...");
    const res = await fetch(CWE_DICT_URL);
    cweDict = await res.json();
  } catch (err) {
    console.error("Failed to load CWE dictionary.", err);
  }

  // 3. Fetch Enriched Data from NVD
  console.log("Fetching Enriched KEV Data from NVD...");
  try {
    const url = `${NVD_API_URL}?hasKev&resultsPerPage=2000`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.statusText}`);
    const data = await response.json();

    const vulnerabilities = data.vulnerabilities.map((item) => {
      const cve = item.cve;
      const id = cve.id;
      const cisaMeta = cisaMap.get(id) || {};

      const description = cve.descriptions.find(d => d.lang === "en")?.value || "No description available.";

      let severity = "Unknown";
      let cvssScore = 0;
      const metrics = cve.metrics;
      if (metrics) {
        const v31 = metrics.cvssMetricV31?.[0];
        const v30 = metrics.cvssMetricV30?.[0];
        const v2 = metrics.cvssMetricV2?.[0];
        if (v31) {
          severity = v31.cvssData.baseSeverity;
          cvssScore = v31.cvssData.baseScore;
        } else if (v30) {
          severity = v30.cvssData.baseSeverity;
          cvssScore = v30.cvssData.baseScore;
        } else if (v2) {
          severity = v2.baseSeverity || "Unknown";
          cvssScore = v2.cvssData.baseScore;
        }
      }
      severity = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();

      let tech = "Unknown";
      if (cve.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria) {
        const parts = cve.configurations[0].nodes[0].cpeMatch[0].criteria.split(':');
        if (parts.length > 4) {
          tech = parts[4].replace(/_/g, ' ');
          tech = tech.charAt(0).toUpperCase() + tech.slice(1);
        }
      }

      let threatType = "Other";
      if (cve.weaknesses?.[0]?.description?.[0]?.value) {
        const cweId = cve.weaknesses[0].description[0].value.replace("CWE-", "");
        if (cweDict[cweId]) {
          const fullName = cweDict[cweId].attr["@_Name"];
          const match = fullName.match(/\('(.*?)'\)/);
          threatType = match ? match[1] : fullName;
        } else {
          threatType = `CWE-${cweId}`;
        }
      }

      const references = cve.references || [];
      const pocs = references.filter(r => r.tags?.includes("Exploit") || r.url.includes("exploit") || r.url.includes("poc")).map(r => r.url);
      const articles = references.filter(r => !pocs.includes(r.url)).map(r => r.url);

      return {
        id,
        title: cisaMeta.vulnerabilityName || cve.cisaVulnerabilityName || id,
        description,
        severity,
        cvssScore,
        tech,
        threatType,
        published: cve.published,
        lastModified: cve.lastModified,
        articles,
        pocs,
        isRansomware: cisaMeta.isRansomware || false,
        requiredAction: cisaMeta.requiredAction || "",
        isAllStar: true
      };
    });

    // Sort by published descending
    vulnerabilities.sort((a, b) => new Date(b.published) - new Date(a.published));

    const dataPath = path.join(__dirname, '..', 'data', 'vulnerabilities_kev.json');
    fs.writeFileSync(dataPath, JSON.stringify(vulnerabilities, null, 2));
    console.log(`\n✨ KEV Integration Complete! Total: ${vulnerabilities.length}`);
  } catch (error) {
    console.error("Error fetching KEV data:", error);
  }
}

fetchKEV();
