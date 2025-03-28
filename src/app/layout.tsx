import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 ease-in-out">
        {children}
      </body>
    </html>
  );
}
