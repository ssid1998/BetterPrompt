'use client';

import { useState, useEffect } from 'react';

const LOADING_PHRASES = [
  "Initializing AI Judge...",
  "Loading Knowledge Base...",
  "Analyzing context constraints...",
  "Evaluating prompt structure...",
  "Checking for rule violations...",
  "Calculating final score...",
  "Generating feedback..."
];

export default function Home() {
  const [promptText, setPromptText] = useState('');
  const [goal, setGoal] = useState('');
  const [modelProvider, setModelProvider] = useState('openai');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhraseIdx, setLoadingPhraseIdx] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhraseIdx((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 2500); // Change phrase every 2.5 seconds
    } else {
      setLoadingPhraseIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAssessmentResult(null);

    if (wordCount(promptText) < 10) {
      setError('Please enter at least 10 words in your prompt.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText, goal, modelProvider })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to assess prompt.');
      } else {
        setAssessmentResult(data);
        if (data.mocked) {
           setError('Warning: OPENAI_API_KEY is not set. Displaying mock data.');
        } else {
           setSuccess('Assessment complete!');
        }
      }
    } catch (err: any) {
      setError('A network error occurred: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">BetterPrompt</h1>
        <p className="mb-8 text-gray-600">Refine your AI prompts using expert guidelines.</p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
              User Intent (Goal)
            </label>
            <input
              id="goal"
              type="text"
              placeholder="e.g., I want the AI to write a marketing email."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelProvider">
              Model Provider
            </label>
            <div className="relative">
              <select
                id="modelProvider"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                value={modelProvider}
                onChange={(e) => setModelProvider(e.target.value)}
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="promptText">
              Your Prompt
            </label>
            <textarea
              id="promptText"
              rows={12}
              placeholder="Paste your prompt here (minimum 10 words)..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline resize-y"
              value={promptText}
              onChange={(e) => {
                setPromptText(e.target.value);
                if (error && wordCount(e.target.value) >= 10) {
                  setError('');
                }
              }}
            ></textarea>
            <div className="text-sm text-gray-500 text-right">
              Word count: {wordCount(promptText)}
            </div>
            
            {error && (
              <p className="text-red-500 text-xs italic mt-2">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-xs italic mt-2">{success}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`flex items-center font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? LOADING_PHRASES[loadingPhraseIdx] : 'Assess Prompt'}
            </button>
          </div>
        </form>

        {/* Temporary Raw Assessment Display (Sprint 1.2) */}
        {assessmentResult && (
          <div className="bg-white shadow-md rounded p-8 mt-8 border-l-4 border-blue-500">
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Raw Assessment Results</h2>
             <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-x-auto">
               {JSON.stringify(assessmentResult, null, 2)}
             </pre>
          </div>
        )}
      </div>
    </main>
  );
}
