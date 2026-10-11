import type { Metadata } from "next";
import { Bodoni_Moda, Courier_Prime, EB_Garamond } from "next/font/google";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bodoni",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
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
    <html lang="en" className={`scroll-smooth ${garamond.variable} ${bodoni.variable} ${courier.variable}`}>
      <body className="font-serif min-h-screen antialiased">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 pt-6 pb-12">
          <TopNavigation />
          <main className="mt-10 sm:mt-14">{children}</main>
          <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-ink/60 pt-3 plate-label text-ink/70">
            <span>Set in EB Garamond, Bodoni Moda &amp; Courier Prime</span>
            <span className="flex items-center gap-2">
              Inks
              <span className="h-2.5 w-2.5 rounded-full bg-ink-yellow" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-rose" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-purple" />
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
