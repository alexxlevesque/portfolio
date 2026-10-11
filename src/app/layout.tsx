import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";
import { ColorBar, RegistrationMark } from "@/components/PrintMarks";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

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
    <html lang="en" className={`scroll-smooth ${bricolage.variable} ${spaceMono.variable}`}>
      <body className="font-sans min-h-screen antialiased">
        {/* Roughens ink edges on .riso-title, like toner on uncoated stock */}
        <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
          <filter id="riso-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <TopNavigation />

        <div className="min-h-screen flex flex-col items-center justify-center gap-10 py-24 px-6 sm:px-8">
          <div className="riso-sheet relative w-full max-w-4xl p-2 sm:p-12">
            <RegistrationMark className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-6" />
            <RegistrationMark className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-6 h-6" />
            {children}
          </div>
          <ColorBar className="w-full max-w-4xl justify-end" />
        </div>
      </body>
    </html>
  );
}
