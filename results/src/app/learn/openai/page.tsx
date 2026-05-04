import Link from "next/link";
import rules from "@/data/rules.json";
import { Inter } from "next/font/google";
import BetterPromptTemplateCard from "@/components/learn/better-prompt-template-card";
import LearningCopilot from "@/components/learn/learning-copilot";

const inter = Inter({ subsets: ["latin"] });

export default function OpenAILearnPage() {
  return (
    <main className={`min-h-screen bg-[#FFFFFF] p-6 text-[#000000] md:p-8 ${inter.className}`}>
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm font-medium text-[#000000] hover:text-[#555555] hover:underline mb-6 inline-block">
          ← Back to Hub
        </Link>
        
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">OpenAI Prompting Guide</h1>
          <p className="text-lg text-[#333333] font-light">
            GPT models (by OpenAI) excel with clear system personas and few-shot examples. 
            Below are the official guidelines used by BetterPrompt, along with the latest advanced patterns for GPT-5.x models.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl bg-white p-8 shadow-sm border border-[#E5E5E5]">
            <h2 className="text-2xl font-semibold mb-6">Standard GPT Guidelines</h2>
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
          </section>

          <section className="rounded-xl bg-[#F7F7F8] p-8 shadow-sm border border-[#E5E5E5]">
            <h2 className="text-2xl font-semibold mb-6">Advanced Patterns (GPT-5.4 & GPT-5.5)</h2>
            <p className="text-[#333333] mb-6 font-light">
              The newest generation of GPT models balance long-running task performance with stronger control over style and structured output. Here is how to prompt them effectively:
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">1. Outcome-First Prompting</h3>
                <p className="text-[#333333] mt-2 font-light">
                  Shorter, outcome-first prompts usually work better than process-heavy prompt stacks. Define what good looks like, what constraints matter, and what the final answer should contain.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">2. Explicit Stopping Conditions & Budgets</h3>
                <p className="text-[#333333] mt-2 font-light">
                  Define &quot;Retrieval Budgets&quot;. Tell the model exactly when enough evidence is enough.
                </p>
              </div>
            </div>
          </section>

          <BetterPromptTemplateCard
            templateLines={rules.openaiTemplate}
            title="OpenAI BetterPrompt Template"
            description="Designed for GPT-style prompts that benefit from clear goals, constraints, and structured output contracts."
            buttonClassName="bg-black hover:bg-slate-800 text-white"
            messageClassName="text-emerald-300"
          />

          <section className="rounded-xl bg-[#F7F7F8] p-6 border border-[#E5E5E5]">
            <h3 className="text-xs font-semibold text-[#666666] uppercase tracking-widest mb-3">References & Sources</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a href="https://developers.openai.com/api/docs/guides/prompt-guidance" target="_blank" rel="noreferrer" className="text-[#000000] hover:underline flex items-center gap-2">
                  OpenAI API Docs: Prompt Guidance (GPT-5.5)
                </a>
              </li>
            </ul>
          </section>

          <LearningCopilot
            page="openai"
            title="OpenAI BetterPrompt Tutor"
            accentClassName="bg-black text-white hover:bg-slate-800"
            panelClassName="border-[#E5E5E5] bg-white"
          />
        </div>
      </div>
    </main>
  );
}
