import Link from "next/link";
import { Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-smoke bg-void-base/80 backdrop-blur-md h-[66px]">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-electric-current group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-tighter text-cloud-white">
            VUL<span className="text-electric-current">NOX</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/catalog" className="text-sm text-ash-text hover:text-cloud-white transition-colors">
            Live Pulse
          </Link>
          <Link href="/all-star" className="text-sm text-ash-text hover:text-cloud-white transition-colors">
            All-Star Gallery
          </Link>
          <Link href="/leaderboard" className="text-sm text-ash-text hover:text-cloud-white transition-colors">
            Hall of Fame
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
