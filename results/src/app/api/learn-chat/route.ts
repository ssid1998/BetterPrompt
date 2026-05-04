import { NextResponse } from 'next/server';
import {
  getLearnPageContext,
  isPromptCritiqueRequest,
  isPromptEngineeringQuestion,
  LEARN_COPILOT_SYSTEM_PROMPT,
  LEARN_LINK_INDEX,
  LEARN_PAGE_MAP,
  sanitizeCitations,
  type LearnPageKey,
} from '@/lib/learn-copilot';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type RequestBody = {
  page: LearnPageKey;
  messages: ChatMessage[];
};

function detectProviderTemplateIntent(input: string) {
  const text = input.toLowerCase();

  if (text.includes('chatgpt') || text.includes('gpt') || text.includes('openai')) {
    return {
      answer:
        'Here is a strong **OpenAI BetterPrompt Template** you can adapt:\n\nYou are <role>.\nMy goal is: <desired outcome>.\nContext: <relevant background, data, or source material>.\nConstraints: <tone, length, must-have points, and boundaries>.\nReturn the answer in this format:\n### Summary\n### Recommendations\n### Final Output\nSuccess criteria: <what a strong answer must include>.\nIf key information is missing, ask clarifying questions before answering.\nBefore finishing, verify the answer is grounded, complete, and follows the requested format.',
      citations: [{ title: 'OpenAI Prompting Guide', href: '/learn/openai' }],
      redirectToAssessor: false,
    };
  }

  if (text.includes('claude') || text.includes('anthropic')) {
    return {
      answer:
        'Here is a strong **Anthropic BetterPrompt Template** you can adapt:\n\n<role>You are <role>.</role>\n<context>\n<background>Relevant project or document context</background>\n<audience>Who this is for</audience>\n<constraints>Tone, length, and boundaries</constraints>\n</context>\n<instructions>\nComplete this task: <specific task>.\nUse the context above.\nIf the answer is not supported by the context, say you do not know.\n</instructions>\n<examples>\n<example>Optional example of the desired output style</example>\n</examples>\n<output_format>Return the answer as <format>.</output_format>\n<thinking>Think carefully through the task before giving the final answer.</thinking>',
      citations: [{ title: 'Anthropic Prompting Guide', href: '/learn/anthropic' }],
      redirectToAssessor: false,
    };
  }

  if (text.includes('gemini') || text.includes('google')) {
    return {
      answer:
        'Here is a strong **Google BetterPrompt Template** you can adapt:\n\nPersona: Act as <role>.\nTask: Help me <specific task or deliverable>.\nContext: Use this background, audience, and source material: <context>.\nFormat: Return the answer as <table, bullets, email, summary, JSON, etc.>.\nConstraints: <tone, length, required sections, and what to avoid>.\nOnly use the information provided when accuracy matters. If something is missing, say so clearly.\nIf this task is large, start with a short outline before expanding the final answer.',
      citations: [{ title: 'Google Gemini Prompting Guide', href: '/learn/google' }],
      redirectToAssessor: false,
    };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const page = body.page;
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!page || !(page in LEARN_PAGE_MAP)) {
      return NextResponse.json({ error: 'Invalid learning page.' }, { status: 400 });
    }

    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content?.trim();
    if (!latestUserMessage) {
      return NextResponse.json({ error: 'Missing user question.' }, { status: 400 });
    }

    if (isPromptCritiqueRequest(latestUserMessage)) {
      return NextResponse.json({
        answer:
          'I can teach you how to write a stronger prompt, but I should not directly critique or score your prompt here. Please use the BetterPrompt Assessor Tool for hands-on feedback.',
        citations: [{ title: 'BetterPrompt Assessor Tool', href: '/' }],
        redirectToAssessor: true,
      });
    }

    if (!isPromptEngineeringQuestion(latestUserMessage)) {
      return NextResponse.json({
        answer:
          'I am the BetterPrompt Tutor, so I only help with prompting and prompt engineering. Ask me how to structure prompts, choose context, use roles, format outputs, or adapt prompts for OpenAI, Anthropic, or Gemini.',
        citations: [{ title: 'Learn Hub', href: '/learn' }],
        redirectToAssessor: false,
      });
    }

    const directTemplateAnswer = detectProviderTemplateIntent(latestUserMessage);
    if (directTemplateAnswer) {
      return NextResponse.json(directTemplateAnswer);
    }

    const conversation = messages
      .slice(-10)
      .map((message) => ({ role: message.role, content: message.content }));

    const pageContext = getLearnPageContext(page);
    const approvedLinks = LEARN_LINK_INDEX.map((item) => `- ${item.title}: ${item.href}`).join('\n');

    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma4:latest',
        messages: [
          { role: 'system', content: LEARN_COPILOT_SYSTEM_PROMPT },
          {
            role: 'system',
            content: `Current BetterPrompt page: ${LEARN_PAGE_MAP[page].title} (${LEARN_PAGE_MAP[page].href})\n\nApproved BetterPrompt links:\n${approvedLinks}\n\nLearning context:\n${pageContext}`,
          },
          ...conversation,
        ],
        format: 'json',
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to connect to Ollama. Please make sure Ollama is running and the gemma4:latest model is available.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const rawContent = data?.message?.content || '{}';
    const parsed = JSON.parse(rawContent) as {
      answer?: string;
      citations?: Array<{ title?: string; href?: string }>;
      redirectToAssessor?: boolean;
    };

    const answer = parsed.answer?.trim() || 'I can help you learn prompt engineering. Try asking about roles, context, formatting, or provider-specific prompting styles.';
    const citations = sanitizeCitations(parsed.citations);
    const redirectToAssessor = Boolean(parsed.redirectToAssessor);

    return NextResponse.json({
      answer,
      citations: redirectToAssessor && !citations.some((item) => item.href === '/')
        ? [{ title: 'BetterPrompt Assessor Tool', href: '/' }, ...citations].slice(0, 3)
        : citations,
      redirectToAssessor,
    });
  } catch (error: unknown) {
    console.error('BetterPrompt Tutor Error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'BetterPrompt Tutor did not return valid structured data. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ error: 'Could not connect to BetterPrompt Tutor. Please verify Ollama is running.' }, { status: 500 });
  }
}
