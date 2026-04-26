'use client';

import { useState } from 'react';

export default function Home() {
  const [promptText, setPromptText] = useState('');
  const [goal, setGoal] = useState('');
  const [modelProvider, setModelProvider] = useState('openai');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (wordCount(promptText) < 10) {
      setError('Please enter at least 10 words in your prompt.');
      return;
    }

    setSuccess('Prompt submitted successfully! (Assessment engine coming in next sprint)');
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200"
              type="submit"
            >
              Assess Prompt
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
