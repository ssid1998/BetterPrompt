'use client';

import { useEffect, useState } from 'react';

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
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [promptText, setPromptText] = useState('');
  const [goal, setGoal] = useState('');
  const [modelProvider, setModelProvider] = useState('anthropic');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhraseIdx, setLoadingPhraseIdx] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhraseIdx((prev) => (prev === LOADING_PHRASES.length - 1 ? prev : prev + 1));
      }, 4000);
    } else {
      setLoadingPhraseIdx(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

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

    try {
      const formData = new FormData();
      formData.append('goal', goal);
      formData.append('modelProvider', modelProvider);
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
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold text-blue-700">BetterPrompt</h1>
          <p className="max-w-3xl text-slate-600">
            Test your prompts and make them better.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="goal">
                User Intent (Goal)
              </label>
              <input
                id="goal"
                type="text"
                placeholder="e.g., I want to build a data maturity assessment tool."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="modelProvider">
                Model Provider
              </label>
              <select
                id="modelProvider"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={modelProvider}
                onChange={(e) => setModelProvider(e.target.value)}
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">Input Method</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setInputMode('text');
                  setSelectedFile(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  inputMode === 'text' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                  inputMode === 'file' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Upload file
              </button>
            </div>
          </div>

          {inputMode === 'text' ? (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="promptText">
                Prompt text
              </label>
              <textarea
                id="promptText"
                rows={12}
                placeholder="Paste one prompt or multiple prompts here..."
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <p className="mt-2 text-right text-sm text-slate-500">Word count: {wordCount(promptText)}</p>
            </div>
          ) : (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="fileUpload">
                Upload prompts file
              </label>
              <label
                htmlFor="fileUpload"
                className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files?.[0] ?? null;
                  setSelectedFile(droppedFile);
                }}
              >
                <div className="text-lg font-semibold text-slate-800">Drop a file here or click to browse</div>
                <div className="mt-2 text-sm text-slate-500">Accepted: PDF, TXT, MD</div>
                {selectedFile && (
                  <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg text-green-600">✅</div>
                      <div>
                        <div className="text-sm font-semibold text-green-800">File uploaded successfully</div>
                        <div className="mt-1 break-all text-sm text-green-700">{selectedFile.name}</div>
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
              <p className="mt-2 text-sm text-slate-500">
                Great for presentation day: upload a whole prompt set from a project in one go.
              </p>
            </div>
          )}

          {(error || success) && (
            <div className="mt-4">
              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              {success && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Supports one prompt or a full prompt collection.</div>
            <button
              className={`flex items-center rounded-lg px-6 py-3 font-semibold shadow-sm transition ${
                isLoading ? 'cursor-not-allowed bg-slate-400 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
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
            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Overall Score</p>
                  <div className="mt-2 text-5xl font-bold text-blue-700">{assessmentResult.score}<span className="text-2xl text-slate-400">/100</span></div>
                </div>
                <div className="grid flex-1 gap-4 md:max-w-2xl">
                  <ScoreBar label="Clarity" value={assessmentResult.subscores.clarity} />
                  <ScoreBar label="Context" value={assessmentResult.subscores.context} />
                  <ScoreBar label="Intent Alignment" value={assessmentResult.subscores.intentAlignment} />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-green-700">What works well</h2>
                <ul className="space-y-3 text-sm text-slate-700">
                  {assessmentResult.pros?.length ? (
                    assessmentResult.pros.map((item, index) => (
                      <li key={index} className="rounded-lg bg-green-50 px-4 py-3">✅ {item}</li>
                    ))
                  ) : (
                    <li className="rounded-lg bg-slate-50 px-4 py-3 text-slate-500">No positives were returned yet.</li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-red-700">Needs improvement</h2>
                <ul className="space-y-3 text-sm text-slate-700">
                  {assessmentResult.violations?.length ? (
                    assessmentResult.violations.map((item, index) => (
                      <li key={index} className="rounded-lg bg-red-50 px-4 py-3">⚠️ {item}</li>
                    ))
                  ) : (
                    <li className="rounded-lg bg-slate-50 px-4 py-3 text-slate-500">No violations were returned.</li>
                  )}
                </ul>
              </div>
            </div>

            {assessmentResult.extractedInput && (
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Prompt</h2>
                    <p className="text-sm text-slate-500">
                      Source: {assessmentResult.extractedInput.sourceName} · {assessmentResult.extractedInput.wordCount} words detected
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {assessmentResult.extractedInput.sourceType === 'file' ? 'Parsed from uploaded file' : 'Read from pasted text'}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-medium text-slate-600">This is the prompt content BetterPrompt assessed.</p>
                  <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {assessmentResult.extractedInput.preview}
                  </pre>
                </div>
                {assessmentResult.extractedInput.truncated && (
                  <p className="mt-3 text-sm text-slate-500">
                    Preview shortened for readability. The full extracted content was still used for assessment.
                  </p>
                )}
              </div>
            )}

            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-blue-700">Better Prompt</h2>
                  <p className="text-sm text-slate-500">A polished version you can reuse or adapt.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Copy to clipboard
                </button>
              </div>
              {copySuccess && <p className="mb-3 text-sm text-blue-700">{copySuccess}</p>}
              <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100 whitespace-pre-wrap">
                {assessmentResult.rewrittenPrompt || 'No rewrite was returned.'}
              </pre>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
