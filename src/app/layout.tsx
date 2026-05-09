import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-void-base text-ash-text font-geomanist">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
