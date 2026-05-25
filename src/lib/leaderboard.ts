import { type Vulnerability } from "./vulnerabilities";

export function groupAndSortByYear(data: Vulnerability[]): Record<number, Vulnerability[]> {
  const years: Record<number, Vulnerability[]> = {};

  data.forEach((v) => {
    // Extract year from CVE-YYYY-NNNN
    const yearMatch = v.id.match(/CVE-(\d{4})-/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (!years[year]) years[year] = [];
      years[year].push(v);
    }
  });

  // Sort each year by CVSS score (influence) by default, take Top 20
  Object.keys(years).forEach((y) => {
    const year = parseInt(y);
    years[year].sort((a, b) => {
      const scoreA = a.cvssScore ?? 0;
      const scoreB = b.cvssScore ?? 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });
    years[year] = years[year].slice(0, 20);
  });

  return years;
}

export function getSortedLeaderboard(
  yearsData: Vulnerability[],
  sortMode: "impact" | "severity"
): Vulnerability[] {
  const sorted = [...yearsData];

  if (sortMode === "impact") {
    sorted.sort((a, b) => {
      // Priority 1: Ransomware usage
      if (a.isRansomware && !b.isRansomware) return -1;
      if (!a.isRansomware && b.isRansomware) return 1;

      // Priority 2: CVSS Score
      const scoreA = a.cvssScore ?? 0;
      const scoreB = b.cvssScore ?? 0;
      if (scoreB !== scoreA) return scoreB - scoreA;

      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });
  } else {
    sorted.sort((a, b) => {
      const scoreA = a.cvssScore ?? 0;
      const scoreB = b.cvssScore ?? 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });
  }

  return sorted.slice(0, 20);
}
