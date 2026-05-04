import Image from "next/image";

export default function ScoringPage() {
  return (
    <main className="bg-[var(--bp-bg)] px-4 py-6 text-[var(--bp-text)] md:px-6 md:py-8">
      <div className="bp-shell max-w-4xl">
        <div className="mb-10 text-center md:text-left">
          <p className="bp-kicker mb-3">Scoring rubric</p>
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--bp-text)]">
              <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={22} height={22} className="invert brightness-0" />
            </div>
            <h1 className="bp-display text-4xl font-semibold">How Scoring Works</h1>
          </div>
          <p className="max-w-3xl text-lg text-[var(--bp-text-muted)]">
            BetterPrompt evaluates your instructions like a strict Senior Prompt Engineer. 
            We break down the quality of your prompt into three core dimensions.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Clarity */}
          <section className="bp-panel p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bp-accent-soft)] text-[var(--bp-accent)] font-semibold text-xl">
                30
              </div>
              <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Clarity (30 pts)</h2>
            </div>
            <p className="mb-4 text-[var(--bp-text-muted)]">
              Language models are literal and do not read minds. The Clarity score evaluates whether your prompt is concise, unambiguous, and free of contradictions.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-700 font-semibold block mb-2">Needs Work</span>
                <p className="text-sm text-red-900">&quot;Make it sound better and fix the stuff that is wrong.&quot;</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-green-700 font-semibold block mb-2">High Clarity</span>
                <p className="text-sm text-green-900">&quot;Proofread the text for grammatical errors and rewrite it in a professional, academic tone.&quot;</p>
              </div>
            </div>
          </section>

          {/* Context */}
          <section className="bp-panel p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bp-fill)] text-[var(--bp-text)] font-semibold text-xl">
                30
              </div>
              <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Context & Constraints (30 pts)</h2>
            </div>
            <p className="mb-4 text-[var(--bp-text-muted)]">
              Context grounds the model. Are you assigning it a persona? Did you provide formatting rules, constraints, and negative constraints (what *not* to do)?
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-700 font-semibold block mb-2">Needs Work</span>
                <p className="text-sm text-red-900">&quot;Write a summary of this document.&quot;</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-green-700 font-semibold block mb-2">High Context</span>
                <p className="text-sm text-green-900">&quot;You are an expert financial analyst. Summarize this document into exactly 3 bullet points. Do not include personal opinions. Output as Markdown.&quot;</p>
              </div>
            </div>
          </section>

          {/* Intent Alignment */}
          <section className="bp-panel p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bp-fill)] text-[var(--bp-text)] font-semibold text-xl">
                40
              </div>
              <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Intent Alignment (40 pts)</h2>
            </div>
            <p className="mb-4 text-[var(--bp-text-muted)]">
              When you submit a prompt to BetterPrompt, we ask for your &quot;Goal&quot;. Intent Alignment measures how likely your prompt is to actually achieve that specific goal, taking into account the quirks of your selected model provider (OpenAI, Anthropic, etc.).
            </p>
            <ul className="mt-2 list-disc list-inside space-y-2 text-[var(--bp-text-muted)]">
              <li>Are you using the right structural tags (like XML for Anthropic)?</li>
              <li>Is the prompt missing critical steps required to reach the goal?</li>
              <li>Does the prompt include chain-of-thought (thinking process) instructions if it&apos;s a complex goal?</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
