import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VULNOX | Precision Threat Intelligence",
  description: "Monitor emerging security pulses and explore a curated gallery of history's most critical vulnerabilities.",
  openGraph: {
    title: "VULNOX",
    description: "Precision Threat Intelligence Dashboard",
    type: "website",
    siteName: "VULNOX",
  },
  twitter: {
    card: "summary_large_image",
    title: "VULNOX",
    description: "Precision Threat Intelligence Dashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${outfit.variable}`}>
      <body className="min-h-full flex flex-col bg-bg-color text-text-primary font-inter relative">
        {/* Global Animated Mesh Gradient Background removed as requested */}
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
