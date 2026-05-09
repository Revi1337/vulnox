import fs from 'fs';
import path from 'path';

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: string;
  cvssScore?: number;
  tech: string;
  threatType: string;
  published: string;
  lastModified: string;
  articles: string[];
  pocs: string[];
  isRansomware?: boolean;
}

export function getKevVulnerabilities(): Vulnerability[] {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'vulnerabilities_kev.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const vulnerabilities = JSON.parse(fileContents) as Vulnerability[];

    // Sort by latest by default
    return vulnerabilities.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
  } catch (error) {
    console.error('Failed to read KEV vulnerabilities data', error);
    return [];
  }
}

export function getVulnerabilityById(id: string): Vulnerability | undefined {
  const allKev = getKevVulnerabilities();
  const allPulse = getPulseVulnerabilities();
  const allTrends = getTrendsVulnerabilities();
  const all = [...allKev, ...allPulse, ...allTrends];
  
  // Use a Map or deduplicate if performance becomes an issue
  return all.find(v => v.id === id);
}

export function getPulseVulnerabilities(): any[] {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'pulse.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export function getTrendsVulnerabilities(): any[] {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'trends.json');
    if (!fs.existsSync(dataPath)) return [];
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export function getAnalytics(): any {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'analytics.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return null;
  }
}
