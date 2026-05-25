import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { LeaderboardShowcase } from "@/components/home/LeaderboardShowcase";
import { TrustSection } from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Hall of Fame / Leaderboard Showcase Section */}
      <LeaderboardShowcase />

      {/* Social / Trust Section */}
      <TrustSection />
    </div>
  );
}
