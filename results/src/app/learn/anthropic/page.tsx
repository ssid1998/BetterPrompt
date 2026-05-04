import Link from "next/link";
import rules from "@/data/rules.json";
import { Fraunces, Inter } from "next/font/google";
import BetterPromptTemplateCard from "@/components/learn/better-prompt-template-card";
import LearningCopilot from "@/components/learn/learning-copilot";

const fraunces = Fraunces({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function AnthropicLearnPage() {
  return (
    <main className={`min-h-screen bg-[#F4F1EA] p-6 text-[#333333] md:p-8 ${inter.className}`}>
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm font-medium text-[#D0B7A1] hover:underline mb-6 inline-block">
          ← Back to Hub
        </Link>
        
        <div className="mb-10">
          <h1 className={`mb-4 text-4xl text-[#1A1A1A] ${fraunces.className}`}>Anthropic Prompting Guide</h1>
          <p className="text-lg text-[#555555]">
            Claude models (by Anthropic) respond exceptionally well to structured formatting, clear XML tags, and explicit instructions. 
            Below are the official guidelines used by BetterPrompt, along with advanced patterns from their latest documentation.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl bg-[#F9F7F4] p-8 shadow-sm border border-[#EBE5DA]">
            <h2 className={`text-2xl text-[#1A1A1A] mb-6 ${fraunces.className}`}>Standard Claude Guidelines</h2>
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
          </section>

          <section className="rounded-xl bg-[#F9F7F4] p-8 shadow-sm border border-[#EBE5DA] border-t-4 border-t-[#D0B7A1]">
            <h2 className={`text-2xl text-[#1A1A1A] mb-6 ${fraunces.className}`}>Advanced Patterns (Claude 4.x)</h2>
            <p className="text-[#555555] mb-6 font-light">
              The latest generation of Claude models introduce adaptive thinking, tool orchestration, and literal instruction following.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg text-[#1A1A1A] ${fraunces.className}`}>1. Literal Instruction Following</h3>
                <p className="text-[#333333] mt-2 font-light">
                  Claude now interprets prompts much more literally. State the scope explicitly (e.g., &quot;Apply this formatting to every section, not just the first one&quot;).
                </p>
              </div>

              <div>
                <h3 className={`text-lg text-[#1A1A1A] ${fraunces.className}`}>2. Eliminating &quot;AI Slop&quot;</h3>
                <p className="text-[#333333] mt-2 font-light">
                  Tell Claude what *to do* instead of what *not* to do. Wrap instructions in an <code>&lt;avoid_excessive_markdown&gt;</code> tag and explicitly ask for &quot;clear, smoothly flowing prose paragraphs&quot;.
                </p>
              </div>
            </div>
          </section>

          <BetterPromptTemplateCard
            templateLines={rules.anthropicTemplate}
            title="Anthropic BetterPrompt Template"
            description="Designed for Claude-style prompting with XML structure, explicit context separation, and careful instruction scoping."
            buttonClassName="bg-[#D0B7A1] hover:bg-[#b89b82] text-white"
            messageClassName="text-[#8f6e4f]"
          />

          <section className="rounded-xl bg-[#F4F1EA] p-6 border border-[#EBE5DA]">
            <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">References & Sources</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noreferrer" className="text-[#D0B7A1] hover:underline">
                  Anthropic Docs: Prompting Best Practices
                </a>
              </li>
            </ul>
          </section>

          <LearningCopilot
            page="anthropic"
            title="Claude BetterPrompt Tutor"
            accentClassName="bg-[#D0B7A1] text-white hover:bg-[#b89b82]"
            panelClassName="border-[#EBE5DA] bg-[#F9F7F4]"
          />
        </div>
      </div>
    </main>
  );
}
