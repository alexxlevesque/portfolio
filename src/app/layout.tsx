import type { Metadata } from "next";
import Script from "next/script"; // 1. Import Script component
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";

export const metadata: Metadata = {
  title: "Alex Levesque | Portfolio",
  description: "Personal portfolio of Alex Levesque - Engineer, Coder, and Creator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="min-h-screen bg-space-cadet text-isabelline antialiased">
        {/* 2. Add the AdSense Script here. Next.js handles the placement optimization. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1118550749854810"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        <TopNavigation />
        {children}
      </body>
    </html>
  );
}