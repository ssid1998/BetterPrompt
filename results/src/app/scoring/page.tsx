import Image from "next/image";

export default function ScoringPage() {
  return (
    <main className="p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center bg-blue-100 rounded-lg shadow-sm">
              <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={24} height={24} style={{ filter: 'invert(35%) sepia(85%) saturate(2256%) hue-rotate(211deg) brightness(97%) contrast(97%)' }} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">How Scoring Works</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl">
            BetterPrompt evaluates your instructions like a strict Senior Prompt Engineer. 
            We break down the quality of your prompt into three core dimensions.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Clarity */}
          <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xl">
                30
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Clarity (30 pts)</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Language models are literal and do not read minds. The Clarity score evaluates whether your prompt is concise, unambiguous, and free of contradictions.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-700 font-semibold block mb-2">Needs Work</span>
                <p className="text-sm text-red-900">"Make it sound better and fix the stuff that is wrong."</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-green-700 font-semibold block mb-2">High Clarity</span>
                <p className="text-sm text-green-900">"Proofread the text for grammatical errors and rewrite it in a professional, academic tone."</p>
              </div>
            </div>
          </section>

          {/* Context */}
          <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold text-xl">
                30
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Context & Constraints (30 pts)</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Context grounds the model. Are you assigning it a persona? Did you provide formatting rules, constraints, and negative constraints (what *not* to do)?
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-700 font-semibold block mb-2">Needs Work</span>
                <p className="text-sm text-red-900">"Write a summary of this document."</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-green-700 font-semibold block mb-2">High Context</span>
                <p className="text-sm text-green-900">"You are an expert financial analyst. Summarize this document into exactly 3 bullet points. Do not include personal opinions. Output as Markdown."</p>
              </div>
            </div>
          </section>

          {/* Intent Alignment */}
          <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold text-xl">
                40
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Intent Alignment (40 pts)</h2>
            </div>
            <p className="text-slate-600 mb-4">
              When you submit a prompt to BetterPrompt, we ask for your "Goal". Intent Alignment measures how likely your prompt is to actually achieve that specific goal, taking into account the quirks of your selected model provider (OpenAI, Anthropic, etc.).
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mt-2">
              <li>Are you using the right structural tags (like XML for Anthropic)?</li>
              <li>Is the prompt missing critical steps required to reach the goal?</li>
              <li>Does the prompt include chain-of-thought (thinking process) instructions if it's a complex goal?</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
