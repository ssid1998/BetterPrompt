import Link from "next/link";
import rules from "@/data/rules.json";
import { Outfit } from "next/font/google";
import BetterPromptTemplateCard from "@/components/learn/better-prompt-template-card";
import LearningCopilot from "@/components/learn/learning-copilot";

const outfit = Outfit({ subsets: ["latin"] });

export default function GoogleLearnPage() {
  return (
    <main className={`min-h-screen bg-[#FFFFFF] p-6 text-[#1F1F1F] md:p-8 ${outfit.className}`}>
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm font-semibold text-[#1A73E8] hover:underline mb-6 inline-block">
          ← Back to Hub
        </Link>
        
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-[#202124]">Google Gemini Prompting Guide</h1>
          <p className="text-lg text-[#5F6368]">
            Gemini models thrive on direct instructions, multimodal context, and clear structural bounds.
            Below are the official guidelines used by BetterPrompt for Gemini models.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl bg-[#F8F9FA] p-8 shadow-sm border border-[#E8EAED]">
            <h2 className="text-2xl font-medium text-[#202124] mb-6">Standard Gemini Guidelines</h2>
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
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-[#F8F9FA] to-[#E8F0FE] p-8 shadow-sm border border-[#D2E3FC]">
            <h2 className="text-2xl font-medium text-[#202124] mb-6">Advanced Patterns (Workspace Guide Oct 2024)</h2>
            <p className="text-[#5F6368] mb-6">
              Based on the latest official Google Workspace Prompting Guides, here are the core frameworks for getting the best out of Gemini:
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#202124]">1. The 4-Part Structural Framework (PTCF)</h3>
                <p className="text-[#3C4043] mt-2">
                  The fundamental pattern recommended by the Workspace guide is structuring your prompt using four distinct pillars: <strong>Persona</strong> (Who is Gemini acting as?), <strong>Task</strong> (What exactly do you need it to do?), <strong>Context</strong> (What is the background info?), and <strong>Format</strong> (How should the output be presented?).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#202124]">2. Strict Constraints (&quot;Only Use Provided Data&quot;)</h3>
                <p className="text-[#3C4043] mt-2">
                  When working with documents in Google Workspace, set strict boundaries. Use phrases like <em>&quot;Using ONLY the information provided in the text above...&quot;</em> or <em>&quot;If the answer is not contained within the provided context, reply with &apos;I don&apos;t know&apos;.&quot;</em> to prevent hallucinations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#202124]">3. Iterative Refinement & Chained Prompting</h3>
                <p className="text-[#3C4043] mt-2">
                  Instead of asking for a massive output in a single mega-prompt, break the interaction down. Start with a broad outline, review it, and then prompt for specific expansions (e.g., <em>&quot;Great. Now expand section 2 into a detailed email draft.&quot;</em>).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#202124]">4. Chain-of-Thought (CoT)</h3>
                <p className="text-[#3C4043] mt-2">
                  When asking Gemini to perform complex logic, math, or multi-layered analysis, force it to explicitly lay out its reasoning process first. Append the phrase <em>&quot;Think through this step-by-step&quot;</em> or <em>&quot;Explain your reasoning before providing the final answer.&quot;</em>
                </p>
              </div>
            </div>
          </section>

          <BetterPromptTemplateCard
            templateLines={rules.googleTemplate}
            title="Google BetterPrompt Template"
            description="Designed for Gemini-style prompting using Persona, Task, Context, Format, and strong boundary-setting."
            buttonClassName="bg-[#1A73E8] hover:bg-[#174EA6] text-white"
            messageClassName="text-[#8ab4f8]"
          />

          <section className="rounded-2xl bg-white p-6 border border-[#E8EAED]">
            <h3 className="text-sm font-medium text-[#5F6368] uppercase tracking-wider mb-3">References & Sources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://services.google.com/fh/files/misc/gemini_for_workspace_prompt_guide_october_2024_digital_final.pdf" target="_blank" rel="noreferrer" className="text-[#1A73E8] hover:underline">
                  Gemini for Google Workspace Prompt Guide (October 2024)
                </a>
              </li>
            </ul>
          </section>

          <LearningCopilot
            page="google"
            title="Gemini BetterPrompt Tutor"
            accentClassName="bg-[#1A73E8] text-white hover:bg-[#174EA6]"
            panelClassName="border-[#D2E3FC] bg-white"
          />
        </div>
      </div>
    </main>
  );
}
