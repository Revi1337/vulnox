"use client";

import { useState } from "react";
import { type Vulnerability, type Analytics } from "@/lib/vulnerabilities";
import { useLivePulse } from "@/hooks/useLivePulse";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { TechSidebar } from "@/components/dashboard/TechSidebar";
import { PulseFeed } from "@/components/dashboard/PulseFeed";

interface DashboardClientProps {
  pulseData: Vulnerability[];
  analyticsData: Analytics | null;
  trendsData: Vulnerability[];
}

export function DashboardClient({
  pulseData,
  analyticsData,
  trendsData,
}: DashboardClientProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pulseList = useLivePulse(pulseData);
  const pageSize = 10;

  if (!analyticsData) return <div>Loading...</div>;

  const filteredItems = selectedTech
    ? trendsData.filter((v) => v.tech.toLowerCase().includes(selectedTech.toLowerCase()))
    : pulseList;

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleTechClick = (techName: string) => {
    setSelectedTech(selectedTech === techName ? null : techName);
    setCurrentPage(1);
  };

  const handleClearTech = () => {
    setSelectedTech(null);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      {/* Header Stats Grid */}
      <StatsGrid analyticsData={analyticsData} pulseCount={pulseList.length} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Hot Technologies */}
        <TechSidebar
          analyticsData={analyticsData}
          selectedTech={selectedTech}
          onTechClick={handleTechClick}
          hoveredTech={hoveredTech}
          onHoverTech={setHoveredTech}
        />

        {/* Right: Feed */}
        <PulseFeed
          selectedTech={selectedTech}
          onClearTech={handleClearTech}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          filteredItems={filteredItems}
          paginatedItems={paginatedItems}
          lastUpdated={analyticsData.lastUpdated}
          totalPulseCount={pulseList.length}
        />
      </div>
    </div>
  );
}
