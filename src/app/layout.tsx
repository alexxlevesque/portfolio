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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased transition-colors duration-500">
        {/* 2. Add the AdSense Script here. Next.js handles the placement optimization. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1118550749854810"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <TopNavigation />

        <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
          <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-black/5 p-8 sm:p-12 transition-colors duration-500">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}