import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterPrompt",
  description: "Refine your AI prompts using expert guidelines.",
  icons: {
    icon: "/logo/terminallogo.png",
    shortcut: "/logo/terminallogo.png",
    apple: "/logo/terminallogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <nav className="sticky top-0 z-50 border-b border-[var(--bp-stroke)] bg-[color:rgba(250,250,250,0.92)] backdrop-blur">
          <div className="bp-shell flex h-[56px] items-center justify-between px-1 sm:px-2">
            <Link href="/" className="group flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.04em] text-[var(--bp-text)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--bp-text)] transition-colors group-hover:bg-[var(--bp-accent)]">
                <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={18} height={18} className="invert brightness-0" />
              </div>
              <span>Better<span className="text-[var(--bp-accent)]">Prompt</span></span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/scoring" className="bp-button-secondary px-3 py-1.5 text-xs font-semibold sm:px-4">
                Scoring
              </Link>
              <Link href="/learn" className="bp-button-secondary px-3 py-1.5 text-xs font-semibold sm:px-4">
                Learn
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
