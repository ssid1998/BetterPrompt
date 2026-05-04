import Image from "next/image";
import rules from "@/data/rules.json";
import { Inter, Fraunces, Outfit } from "next/font/google";
import BetterPromptTemplateCard from "@/components/learn/better-prompt-template-card";
import LearningCopilot from "@/components/learn/learning-copilot";

const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export default function LearnPage() {
  return (
    <main className="bg-[var(--bp-bg)] px-4 py-6 text-[var(--bp-text)] md:px-6 md:py-8">
      <div className="bp-shell max-w-4xl">
        <div className="mb-12 text-center">
          <p className="bp-kicker mb-3">Learn hub</p>
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--bp-text)] p-4">
            <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={40} height={40} className="invert brightness-0" />
          </div>
          <h1 className="bp-display mb-4 text-4xl font-semibold">Learn Hub</h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--bp-text-muted)]">
            Master the art of communicating with Large Language Models. 
            Review universal best practices and provider-specific guidelines below.
          </p>
        </div>

        <div className="space-y-12">
          {/* Universal Guidelines */}
          <section className="bp-panel rounded-3xl p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--bp-text)] p-2 shadow-sm">
                <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={28} height={28} className="invert brightness-0" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Universal Guidelines</h2>
                <p className="mt-1 text-sm text-[var(--bp-text-muted)]">BetterPrompt&apos;s merged cross-model playbook for writing stronger prompts.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {rules.universal.map((rule, idx) => (
                <div key={idx} className="bp-panel-muted rounded-2xl p-5">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-[var(--bp-accent)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <span className="leading-relaxed text-[var(--bp-text)]">{rule}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <BetterPromptTemplateCard templateLines={rules.betterPromptTemplate} title="BetterPrompt Template" />
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] p-6">
              <h3 className="text-lg font-semibold text-[var(--bp-text)]">Prompt safety reminders</h3>
              <ul className="mt-4 space-y-3">
                {rules.promptSafety.map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[var(--bp-text)]">
                    <span className="mt-1 text-[var(--bp-accent)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" /></svg>
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
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

          <LearningCopilot page="hub" title="BetterPrompt Tutor" />
        </div>
      </div>
    </main>
  );
}
