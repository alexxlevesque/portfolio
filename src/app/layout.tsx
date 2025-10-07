import type { Metadata } from "next";
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
        <TopNavigation />
        {children}
      </body>
    </html>
  );
}
