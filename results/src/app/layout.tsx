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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight group">
              <div className="flex items-center justify-center bg-blue-600 rounded-lg p-1.5 shadow-sm group-hover:bg-blue-700 transition-colors h-8 w-8">
                <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={20} height={20} className="invert brightness-0" />
              </div>
              <span>Better<span className="text-blue-600">Prompt</span></span>
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Assessor Tool
              </Link>
              <Link href="/scoring" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                How Scoring Works
              </Link>
              <Link href="/learn" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Learn Prompting
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
