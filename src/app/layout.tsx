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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased transition-colors duration-500">
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