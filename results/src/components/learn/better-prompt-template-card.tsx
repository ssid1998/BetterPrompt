'use client';

import { useState } from 'react';

type BetterPromptTemplateCardProps = {
  templateLines: string[];
  title?: string;
  description?: string;
  buttonClassName?: string;
  messageClassName?: string;
};

export default function BetterPromptTemplateCard({
  templateLines,
  title = 'BetterPrompt Template',
  description = 'Copy this starter and replace the placeholders with your own details.',
  buttonClassName = 'bp-button-primary text-white',
  messageClassName = 'text-[var(--bp-accent)]',
}: BetterPromptTemplateCardProps) {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templateLines.join('\n'));
      setCopyMessage('Copied to clipboard.');
      setTimeout(() => setCopyMessage(''), 2500);
    } catch {
      setCopyMessage('Copy failed. Please copy manually.');
      setTimeout(() => setCopyMessage(''), 2500);
    }
  };

  return (
    <div className="bp-code-surface p-6 shadow-inner">
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/60">{description}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${buttonClassName}`}
        >
          Copy to clipboard
        </button>
      </div>

      {copyMessage && <p className={`mt-3 text-sm ${messageClassName}`}>{copyMessage}</p>}

      <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-7 text-white/90">{templateLines.join('\n')}</pre>
    </div>
  );
}
