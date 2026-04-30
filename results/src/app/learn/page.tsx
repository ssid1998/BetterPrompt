import Image from "next/image";
import rules from "@/data/rules.json";
import { Inter, Fraunces, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export default function LearnPage() {
  return (
    <main className="p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center bg-blue-100 rounded-2xl p-4 mb-6 h-20 w-20">
            <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={40} height={40} className="opacity-80" style={{ filter: 'invert(35%) sepia(85%) saturate(2256%) hue-rotate(211deg) brightness(97%) contrast(97%)' }} />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 tracking-tight">Prompt Engineering Hub</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Master the art of communicating with Large Language Models. 
            Review universal best practices and provider-specific guidelines below.
          </p>
        </div>

        <div className="space-y-12">
          {/* Universal Guidelines */}
          <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              Universal Guidelines
            </h2>
            <ul className="space-y-4">
              {rules.universal.map((rule, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-slate-400 mt-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <span className="text-slate-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Anthropic Card */}
          <section className={`rounded-2xl bg-[#F9F7F4] p-8 shadow-sm border border-[#EBE5DA] border-t-4 border-t-[#D0B7A1] ${inter.className}`}>
            <h2 className={`text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 ${fraunces.className}`}>
              <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-[#EBE5DA] overflow-hidden p-1">
                <Image src="/logo/anthropic-1.svg" alt="Anthropic Logo" width={32} height={32} className="object-contain" />
              </div>
              Anthropic (Claude)
            </h2>
            <ul className="space-y-4">
              {rules.anthropic.map((rule, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-[#D0B7A1] mt-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[#333333] leading-relaxed font-light">{rule}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-right">
              <a href="/learn/anthropic" className={`inline-flex items-center gap-1.5 text-sm font-bold text-[#D0B7A1] hover:text-[#b89b82] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-[#EBE5DA] ${inter.className}`}>
                View Advanced Claude Patterns
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </section>

          {/* OpenAI Card */}
          <section className={`rounded-2xl bg-[#FFFFFF] p-8 shadow-sm border border-[#E5E5E5] border-t-4 border-t-[#000000] ${inter.className}`}>
            <h2 className="text-2xl font-semibold text-[#111111] mb-6 flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-[#E5E5E5] overflow-hidden p-1.5">
                <Image src="/logo/OpenAI.png" alt="OpenAI Logo" width={28} height={28} className="object-contain" />
              </div>
              OpenAI (GPT)
            </h2>
            <ul className="space-y-4">
              {rules.openai.map((rule, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-[#000000] mt-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[#111111] leading-relaxed font-light">{rule}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-right">
              <a href="/learn/openai" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#000000] hover:text-[#333333] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-[#E5E5E5]">
                View Advanced GPT-5 Patterns
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </section>

          {/* Google Card */}
          <section className={`rounded-2xl bg-[#F8F9FA] p-8 shadow-sm border border-[#D2E3FC] border-t-4 border-t-[#4285F4] ${outfit.className}`}>
            <h2 className="text-2xl font-medium text-[#202124] mb-6 flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-[#E6EBF5] overflow-hidden p-1.5">
                <Image src="/logo/1280px-Google_Gemini_icon_2025.svg.png" alt="Google Gemini Logo" width={28} height={28} className="object-contain" />
              </div>
              Google (Gemini)
            </h2>
            <ul className="space-y-4">
              {rules.google.map((rule, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-[#1A73E8] mt-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[#3C4043] leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-right">
              <a href="/learn/google" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A73E8] hover:text-[#174EA6] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-[#D2E3FC]">
                View Advanced Gemini Patterns
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
