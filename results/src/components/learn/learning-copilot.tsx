'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LearnPageKey } from '@/lib/learn-copilot';

type Citation = {
  title: string;
  href: string;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  redirectToAssessor?: boolean;
};

type LearningCopilotProps = {
  page: LearnPageKey;
  accentClassName?: string;
  panelClassName?: string;
  title?: string;
};

function renderInlineFormatting(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.95em] text-slate-800">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n').map((line) => line.trimEnd());
  const blocks: Array<{ type: 'paragraph' | 'ul' | 'ol'; lines: string[] }> = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const isBullet = /^[-*]\s+/.test(line);
    const isNumbered = /^\d+[.)]\s+/.test(line);

    if (isBullet) {
      const contentLine = line.replace(/^[-*]\s+/, '');
      const previous = blocks[blocks.length - 1];
      if (previous?.type === 'ul') {
        previous.lines.push(contentLine);
      } else {
        blocks.push({ type: 'ul', lines: [contentLine] });
      }
      continue;
    }

    if (isNumbered) {
      const contentLine = line.replace(/^\d+[.)]\s+/, '');
      const previous = blocks[blocks.length - 1];
      if (previous?.type === 'ol') {
        previous.lines.push(contentLine);
      } else {
        blocks.push({ type: 'ol', lines: [contentLine] });
      }
      continue;
    }

    blocks.push({ type: 'paragraph', lines: [line] });
  }

  return (
    <div className="space-y-3 text-sm leading-7">
      {blocks.map((block, index) => {
        if (block.type === 'ul') {
          return (
            <ul key={index} className="space-y-2 pl-5">
              {block.lines.map((line, lineIndex) => (
                <li key={lineIndex} className="list-disc text-slate-700">
                  {renderInlineFormatting(line)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={index} className="space-y-2 pl-5">
              {block.lines.map((line, lineIndex) => (
                <li key={lineIndex} className="list-decimal text-slate-700">
                  {renderInlineFormatting(line)}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={index} className="text-slate-700">
            {renderInlineFormatting(block.lines.join(' '))}
          </p>
        );
      })}
    </div>
  );
}

const STARTER_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Hi — I am your BetterPrompt Tutor. Ask me how to write better prompts, how to choose roles or context, or how to adapt prompts for OpenAI, Claude, or Gemini.',
  citations: [{ title: 'Learn Hub', href: '/learn' }],
};

export default function LearningCopilot({
  page,
  accentClassName = 'bp-button-primary text-white',
  panelClassName = 'border-[var(--bp-stroke)] bg-[var(--bp-surface-strong)]',
  title = 'BetterPrompt Tutor',
}: LearningCopilotProps) {
  const storageKey = useMemo(() => `betterprompt-learning-copilot-${page}`, [page]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [STARTER_MESSAGE];

    try {
      const stored = sessionStorage.getItem(`betterprompt-learning-copilot-${page}`);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length) {
          return parsed;
        }
      }
    } catch {
      // ignore hydration/session parse issues
    }

    return [STARTER_MESSAGE];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // ignore storage issues
    }
  }, [messages, storageKey]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen]);

  const handleReset = () => {
    setMessages([STARTER_MESSAGE]);
    setError('');
    setInput('');
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore storage issues
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/learn-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          messages: nextMessages.map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'BetterPrompt Tutor could not answer right now.');
        return;
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.answer,
          citations: data.citations,
          redirectToAssessor: data.redirectToAssessor,
        },
      ]);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'BetterPrompt Tutor is unavailable right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <section className={`fixed bottom-3 right-3 z-50 flex h-[min(82vh,760px)] w-[min(calc(100vw-0.75rem),430px)] flex-col overflow-hidden rounded-[28px] border p-0 shadow-2xl sm:bottom-6 sm:right-6 sm:w-[430px] ${panelClassName}`}>
          <div className="flex items-start justify-between gap-3 border-b border-[var(--bp-stroke)] bg-[color:rgba(250,250,250,0.94)] px-4 py-4 backdrop-blur sm:px-5">
            <div>
              <p className="bp-kicker mb-1">Tutor</p>
              <h2 className="text-xl font-semibold text-[var(--bp-text)]">{title}</h2>
              <p className="mt-1 text-xs text-[var(--bp-text-muted)]">
                Prompt-engineering tutor. For direct prompt critique, use the{' '}
                <Link href="/" className="font-semibold text-[var(--bp-accent)] hover:underline">
                  BetterPrompt Assessor Tool
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="bp-button-secondary px-3 py-1.5 text-xs font-semibold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bp-button-secondary px-3 py-1.5 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          <div ref={messagesContainerRef} className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 sm:px-5">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-4 py-4 ${
                  message.role === 'assistant'
                    ? 'border border-[var(--bp-stroke)] bg-[var(--bp-surface)] text-[var(--bp-text)]'
                    : 'ml-auto max-w-[94%] bg-[var(--bp-text)] text-white shadow-lg'
                }`}
              >
                <div className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${message.role === 'assistant' ? 'text-[var(--bp-text-muted)]' : 'text-white/60'}`}>
                  {message.role === 'assistant' ? 'BetterPrompt Tutor' : 'You'}
                </div>
                {message.role === 'assistant' ? (
                  <FormattedMessage content={message.content} />
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-white">{message.content}</p>
                )}

                {message.citations?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.citations.map((citation) => (
                      <Link
                        key={`${citation.href}-${citation.title}`}
                        href={citation.href}
                        className="bp-chip border-[var(--bp-stroke)] bg-white text-[var(--bp-text)] transition hover:border-[var(--bp-accent)] hover:text-[var(--bp-accent)]"
                      >
                        {citation.title}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {message.redirectToAssessor ? (
                  <div className="mt-4 rounded-xl border border-[rgba(32,128,141,0.18)] bg-[var(--bp-accent-soft)] p-3 text-sm text-[var(--bp-text)]">
                    Want line-by-line feedback on your actual prompt? Open the{' '}
                    <Link href="/" className="font-semibold hover:underline">
                      BetterPrompt Assessor Tool
                    </Link>
                    .
                  </div>
                ) : null}
              </div>
            ))}

            {isLoading ? (
                <div className="rounded-2xl border border-[var(--bp-stroke)] bg-[var(--bp-surface)] px-4 py-4 text-sm text-[var(--bp-text-muted)] shadow-sm">
                  BetterPrompt Tutor is thinking...
                </div>
              ) : null}
              <div ref={messagesEndRef} />
          </div>

          {error ? <p className="mx-4 mt-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700 sm:mx-5">{error}</p> : null}

          <form onSubmit={handleSubmit} className="space-y-3 border-t border-[var(--bp-stroke)] bg-[color:rgba(255,255,255,0.95)] px-4 py-4 sm:px-5">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask how to write a stronger prompt, choose the right role, add context, or adapt a template for a model..."
              rows={4}
              className="bp-input rounded-2xl px-4 py-3 text-sm"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-[var(--bp-text-muted)]">This tutor remembers the conversation for this page in your current browser session.</p>
              <button type="submit" disabled={isLoading} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${accentClassName}`}>
                Ask Tutor
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-3 right-3 z-50 inline-flex h-14 w-14 items-center justify-center rounded-[16px] shadow-2xl transition hover:scale-[1.01] sm:bottom-6 sm:right-6 ${accentClassName}`}
        aria-label="Open BetterPrompt Tutor"
        title="Open BetterPrompt Tutor"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/15">
          <Image src="/logo/terminallogo.png" alt="BetterPrompt Tutor" width={22} height={22} className="invert brightness-0" />
        </span>
      </button>
    </>
  );
}
