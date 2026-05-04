'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { PROVIDER_MODELS, type ProviderKey } from '@/data/assessor-config';
import LearningCopilot from '@/components/learn/learning-copilot';

const LOADING_PHRASES = [
  "Putting on the judge's wig...",
  'Brewing digital coffee...',
  'Consulting the AI oracles...',
  'Silently judging your adjectives...',
  'Checking for prompt engineering crimes...',
  'Adding up the penalty points...',
  'Drafting a polite but firm verdict...',
  'Almost done judging you...',
];

type AssessmentResult = {
  score: number;
  subscores: {
    clarity: number;
    context: number;
    intentAlignment: number;
  };
  violations: string[];
  pros: string[];
  rewrittenPrompt?: string;
  extractedInput?: {
    sourceType: 'text' | 'file';
    sourceName: string;
    wordCount: number;
    preview: string;
    truncated: boolean;
  };
  assessedTarget?: {
    provider: string;
    model: string;
  };
  deterministicChecks?: Array<{
    key: string;
    label: string;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }>;
  securityReview?: {
    status: 'clean' | 'flagged';
    findings: string[];
    penaltyApplied: number;
  };
};

function InfoTooltip({ content }: { content: string }) {
  return (
    <div className="group relative ml-2 flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[var(--bp-stroke)] bg-[var(--bp-surface)] text-[10px] font-bold text-[var(--bp-text-muted)]">
      i
      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-[var(--bp-text)] p-2.5 text-center text-xs font-normal text-white shadow-lg group-hover:block">
        {content}
        <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--bp-text)]"></div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max = 100, description }: { label: string; value: number; max?: number; description?: string }) {
  const percentage = (value / max) * 100;
  const color = percentage >= 80 ? 'bg-emerald-500' : percentage >= 60 ? 'bg-amber-500' : 'bg-[var(--bp-accent)]';

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm font-medium text-[var(--bp-text)]">
        <span className="flex flex-col">
          <span className="flex items-center">
            {label}
            <InfoTooltip content={description || ''} />
          </span>
        </span>
        <span className="font-bold">{value}/{max}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--bp-fill)]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(percentage, 100))}%` }} />
      </div>
    </div>
  );
}

function statusPillClass(status: 'pass' | 'warning' | 'fail') {
  if (status === 'pass') return 'bg-green-100 text-green-700';
  if (status === 'warning') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

function structuralStatusIcon(status: 'pass' | 'warning' | 'fail') {
  if (status === 'pass') return '✓';
  return '⚠️';
}

export default function Home() {
  const [promptText, setPromptText] = useState('');
  const [goal, setGoal] = useState('');
  const [modelProvider, setModelProvider] = useState<ProviderKey>('anthropic');
  const [modelName, setModelName] = useState<string>(PROVIDER_MODELS.anthropic[0]);
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhraseIdx, setLoadingPhraseIdx] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const structuralChecks = assessmentResult?.deterministicChecks?.filter((check) => check.key !== 'security') ?? [];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingPhraseIdx((prev) => (prev === LOADING_PHRASES.length - 1 ? prev : prev + 1));
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleReset = () => {
    setGoal('');
    setModelProvider('anthropic');
    setModelName(PROVIDER_MODELS.anthropic[0]);
    setInputMode('text');
    setPromptText('');
    setSelectedFile(null);
    setError('');
    setSuccess('');
    setCopySuccess('');
    setAssessmentResult(null);
    setAdvancedOpen(false);
  };

  const handleProviderChange = (provider: ProviderKey) => {
    setModelProvider(provider);
    setModelName(PROVIDER_MODELS[provider][0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCopySuccess('');
    setAssessmentResult(null);

    if (!goal.trim()) {
      setError('Please describe your goal before assessing.');
      return;
    }

    if (inputMode === 'text' && wordCount(promptText) < 10) {
      setError('Please enter at least 10 words in your prompt.');
      return;
    }

    if (inputMode === 'file' && !selectedFile) {
      setError('Please upload a PDF, TXT, or Markdown file.');
      return;
    }

    setIsLoading(true);
    setLoadingPhraseIdx(0);

    try {
      const formData = new FormData();
      formData.append('goal', goal);
      formData.append('modelProvider', modelProvider);
      formData.append('modelName', modelName);
      formData.append('promptText', promptText);
      if (inputMode === 'file' && selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch('/api/assess', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to assess prompt.');
        return;
      }

      setAssessmentResult(data);
      setSuccess('Assessment complete!');
    } catch (err) {
      setError(`A network error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setLoadingPhraseIdx(0);
    }
  };

  const handleCopy = async () => {
    if (!assessmentResult?.rewrittenPrompt) return;
    try {
      await navigator.clipboard.writeText(assessmentResult.rewrittenPrompt);
      setCopySuccess('Copied rewritten prompt.');
    } catch {
      setCopySuccess('Could not copy automatically. Please copy manually.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bp-bg)] px-3 py-5 text-[var(--bp-text)] sm:px-4 md:px-6 md:py-8">
      <div className="bp-shell">
        <div className="mb-6 flex flex-col gap-4 text-center md:mb-8 md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="bp-kicker mb-3">Prompt quality, scored better</p>
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--bp-text)] p-2 text-white">
                <Image src="/logo/terminallogo.png" alt="BetterPrompt Logo" width={28} height={28} className="invert brightness-0" />
              </div>
              <h1 className="bp-display text-4xl font-semibold md:text-5xl">Better<span className="text-[var(--bp-accent)]">Prompt</span></h1>
            </div>
            <p className="max-w-2xl text-[15px] leading-7 text-[var(--bp-text-muted)] md:text-lg">
              Evaluate, refine, and optimize your AI instructions using expert guidelines.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:justify-end">
            <button onClick={handleReset} className="bp-button-secondary px-4 py-2 text-xs font-semibold">
              Reset Session
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bp-panel p-4 sm:p-5 md:p-8">
          <div className="bp-panel-muted mb-5 p-3.5 sm:p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="bp-kicker mb-1">Assessor</p>
                <h2 className="text-xl font-semibold text-[var(--bp-text)]">Simple prompt check</h2>
                <p className="mt-1 text-sm text-[var(--bp-text-muted)]">Start with just your goal and your prompt. Advanced targeting is optional.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                <span className="bp-chip">Provider: {modelProvider}</span>
                <span className="bp-chip">Model: {modelName}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center text-sm font-semibold text-[var(--bp-text)]" htmlFor="goal">
              User Intent (Goal)
              <InfoTooltip content="What you actually want to achieve. This helps the AI judge if your prompt is aligned with your true goal." />
            </label>
            <input
              id="goal"
              type="text"
              placeholder="e.g., I want to build a data maturity assessment tool."
              className="bp-input px-3 py-3 text-sm"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div className="bp-panel-muted mt-5 p-3.5 sm:p-4">
            <button
              type="button"
              onClick={() => setAdvancedOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 text-left"
              aria-expanded={advancedOpen}
            >
              <div>
                <p className="text-sm font-semibold text-[var(--bp-text)]">Advanced options</p>
                <p className="mt-1 text-sm text-[var(--bp-text-muted)]">Choose the provider and specific model only if you want a more targeted assessment.</p>
              </div>
              <span className="bp-chip">
                {advancedOpen ? 'Hide' : 'Show'}
              </span>
            </button>

            {advancedOpen && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center text-sm font-semibold text-[var(--bp-text)]" htmlFor="modelProvider">
                    Model Provider
                    <InfoTooltip content="Which AI you are writing this prompt for. Different providers prefer different prompt styles." />
                  </label>
                  <select
                    id="modelProvider"
                    className="bp-input px-3 py-3 text-sm"
                    value={modelProvider}
                    onChange={(e) => handleProviderChange(e.target.value as ProviderKey)}
                  >
                    <option value="openai">OpenAI (ChatGPT)</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                    <option value="google">Google (Gemini)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-semibold text-[var(--bp-text)]" htmlFor="modelName">
                    Specific Model
                    <InfoTooltip content="This gives BetterPrompt a more precise target when it evaluates formatting and prompt style." />
                  </label>
                  <select
                    id="modelName"
                    className="bp-input px-3 py-3 text-sm"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                  >
                    {PROVIDER_MODELS[modelProvider].map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[var(--bp-text)]">Input Method</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setInputMode('text');
                  setSelectedFile(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  inputMode === 'text' ? 'bg-[var(--bp-text)] text-white' : 'bg-[var(--bp-surface)] text-[var(--bp-text)] hover:bg-[var(--bp-fill)]'
                }`}
              >
                Paste text
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMode('file');
                  setPromptText('');
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  inputMode === 'file' ? 'bg-[var(--bp-text)] text-white' : 'bg-[var(--bp-surface)] text-[var(--bp-text)] hover:bg-[var(--bp-fill)]'
                }`}
              >
                Upload file
              </button>
            </div>
          </div>

          {inputMode === 'text' ? (
            <div className="mt-6">
              <label className="mb-2 flex items-center text-sm font-semibold text-[var(--bp-text)]" htmlFor="promptText">
                Prompt text
                <InfoTooltip content="The exact instructions you plan to send to the AI." />
              </label>
              <textarea
                id="promptText"
                rows={12}
                placeholder="Paste one prompt or multiple prompts here..."
                className="bp-input px-3 py-3 text-sm"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <p className="mt-2 text-right text-sm text-[var(--bp-text-muted)]">Word count: {wordCount(promptText)}</p>
            </div>
          ) : (
            <div className="mt-6">
              <label className="mb-2 flex items-center text-sm font-semibold text-[var(--bp-text)]" htmlFor="fileUpload">
                Upload prompts file
                <InfoTooltip content="Upload a PDF, Markdown, or TXT file containing your prompt or prompt strategy." />
              </label>
              <label
                htmlFor="fileUpload"
                className="block cursor-pointer rounded-2xl border border-dashed border-[var(--bp-stroke-strong)] bg-[var(--bp-surface)] p-6 text-center transition hover:border-[var(--bp-accent)] hover:bg-[var(--bp-accent-soft)] sm:p-8"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files?.[0] ?? null;
                  setSelectedFile(droppedFile);
                }}
              >
                <div className="text-lg font-semibold text-[var(--bp-text)]">Drop a file here or click to browse</div>
                <div className="mt-2 text-sm text-[var(--bp-text-muted)]">Accepted: PDF, TXT, MD</div>
                {selectedFile && (
                  <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left">
                    <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-lg text-emerald-600">✅</div>
                      <div>
                          <div className="text-sm font-semibold text-emerald-800">File uploaded successfully</div>
                          <div className="mt-1 break-all text-sm text-emerald-700">{selectedFile.name}</div>
                      </div>
                    </div>
                  </div>
                )}
              </label>
              <input
                id="fileUpload"
                type="file"
                accept=".pdf,.txt,.md"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              />
            </div>
          )}

          {(error || success) && (
            <div className="mt-4">
              {error && <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
              {success && <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">{success}</p>}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
               className={`flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto sm:min-w-[200px] ${
                  isLoading ? 'cursor-not-allowed bg-[var(--bp-fill-strong)] text-[var(--bp-text-muted)]' : 'bp-button-primary'
                }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isLoading ? LOADING_PHRASES[loadingPhraseIdx] : 'Assess Prompt(s)'}
            </button>
          </div>
        </form>

        {assessmentResult && (
          <section className="mt-8 space-y-6">
            <div className="bp-panel p-5 sm:p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="bp-kicker">Overall Score</p>
                  <div className="mt-2 text-4xl font-semibold text-[var(--bp-text)] sm:text-5xl">{assessmentResult.score}<span className="text-2xl text-[var(--bp-text-muted)]">/100</span></div>
                  <p className="mt-2 text-sm text-[var(--bp-text-muted)]">
                    Target assessed: {assessmentResult.assessedTarget?.provider || modelProvider} · {assessmentResult.assessedTarget?.model || modelName}
                  </p>
                </div>
                <div className="grid flex-1 gap-2 md:max-w-2xl">
                  <ScoreBar 
                    label="Clarity" 
                    value={assessmentResult.subscores.clarity} 
                    max={30}
                    description="How clear, concise, and unambiguous is the prompt?" 
                  />
                  <ScoreBar 
                    label="Context" 
                    value={assessmentResult.subscores.context} 
                    max={30}
                    description="Does the prompt provide enough background, formatting, and constraints?" 
                  />
                  <ScoreBar 
                    label="Intent Alignment" 
                    value={assessmentResult.subscores.intentAlignment} 
                    max={40}
                    description="How well does this prompt achieve the stated User Goal?" 
                  />
                </div>
              </div>
            </div>

             <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="bp-panel-tight p-5 sm:p-6">
                  <h2 className="mb-4 text-2xl font-semibold text-emerald-700">What works well</h2>
                 <ul className="space-y-3 text-sm text-[var(--bp-text)]">
                    {assessmentResult.pros?.length ? (
                      assessmentResult.pros.map((item, index) => (
                        <li key={index} className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">✓ {item}</li>
                      ))
                    ) : (
                     <li className="rounded-xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] px-4 py-3 text-[var(--bp-text-muted)]">No positives were returned yet.</li>
                   )}
                 </ul>
               </div>

                <div className="bp-panel-tight p-5 sm:p-6">
                  <h2 className="mb-4 text-2xl font-semibold text-[var(--bp-accent)]">Needs improvement</h2>
                 <ul className="space-y-3 text-sm text-[var(--bp-text)]">
                    {assessmentResult.violations?.length ? (
                      assessmentResult.violations.map((item, index) => (
                        <li key={index} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">⚠️ {item}</li>
                      ))
                   ) : (
                     <li className="rounded-xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] px-4 py-3 text-[var(--bp-text-muted)]">No violations were returned.</li>
                   )}
                 </ul>
               </div>
             </div>

            {structuralChecks.length > 0 && (
              <div className="bp-panel-tight p-5 sm:p-6 md:p-8">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Prompt Structure Signals</h2>
                  <p className="mt-1 text-sm text-[var(--bp-text-muted)]">These checks show which structural elements BetterPrompt detected in your prompt.</p>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {structuralChecks.map((check) => (
                    <div key={check.key} className="rounded-xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-[var(--bp-text)]">{check.label}</h3>
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${statusPillClass(check.status)}`}>
                          {structuralStatusIcon(check.status)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--bp-text-muted)]">{check.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assessmentResult.extractedInput && (
              <div className="bp-panel-tight p-5 sm:p-6 md:p-8">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Your Prompt</h2>
                      {assessmentResult.securityReview && (
                        <span className={`bp-chip ${assessmentResult.securityReview.status === 'clean' ? 'bp-badge-positive' : 'bp-badge-warning'}`}>
                          {assessmentResult.securityReview.status === 'clean' ? 'Injection check: Pass' : 'Injection check: Fail'}
                        </span>
                      )}
                      <InfoTooltip content={assessmentResult.securityReview?.status === 'clean'
                        ? 'Pass means BetterPrompt did not detect obvious prompt-injection or score-manipulation language in the prompt text.'
                        : 'Fail means BetterPrompt detected suspicious prompt-injection or score-manipulation language that tries to influence the evaluator.'} />
                    </div>
                    <p className="text-sm text-[var(--bp-text-muted)]">
                      Source: {assessmentResult.extractedInput.sourceName} · {assessmentResult.extractedInput.wordCount} words detected
                    </p>
                  </div>
                  <span className="bp-chip bp-badge-neutral">
                    {assessmentResult.extractedInput.sourceType === 'file' ? 'Parsed from uploaded file' : 'Read from pasted text'}
                  </span>
                </div>
                <div className="rounded-xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] p-4">
                  <p className="mb-3 text-sm font-medium text-[var(--bp-text-muted)]">This is the prompt content BetterPrompt assessed.</p>
                  <pre className="whitespace-pre-wrap text-sm leading-6 text-[var(--bp-text)]">
                    {assessmentResult.extractedInput.preview}
                  </pre>
                </div>
                {assessmentResult.extractedInput.truncated && (
                  <p className="mt-3 text-sm text-[var(--bp-text-muted)]">
                    Preview shortened for readability. The full extracted content was still used for assessment.
                  </p>
                )}
              </div>
            )}

            <div className="bp-panel-tight p-5 sm:p-6 md:p-8">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--bp-text)]">Better Prompt</h2>
                  <p className="text-sm text-[var(--bp-text-muted)]">A polished version you can reuse or adapt.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bp-button-secondary px-4 py-2 text-sm font-semibold"
                >
                  Copy to clipboard
                </button>
              </div>
              {copySuccess && <p className="mb-3 text-sm text-[var(--bp-accent)]">{copySuccess}</p>}
              <pre className="bp-code-surface overflow-x-auto p-5 text-sm leading-6 whitespace-pre-wrap">
                {assessmentResult.rewrittenPrompt || 'No rewrite was returned.'}
              </pre>
            </div>
          </section>
        )}

        <LearningCopilot page="assessor" title="BetterPrompt Tutor" />
      </div>
    </main>
  );
}
