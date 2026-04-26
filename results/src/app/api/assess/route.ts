import { NextResponse } from 'next/server';
import rulesMatrix from '@/data/rules.json';
import { PDFParse } from 'pdf-parse';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const goal = formData.get('goal') as string;
    const modelProvider = formData.get('modelProvider') as string;
    let promptText = formData.get('promptText') as string;
    const file = formData.get('file') as File | null;
    let sourceType: 'text' | 'file' = 'text';
    let sourceName = 'Pasted text';

    if (!goal || !modelProvider) {
      return NextResponse.json({ error: 'Missing required fields (Goal, Model Provider)' }, { status: 400 });
    }

    // Handle File Upload Parsing
    if (file) {
      sourceType = 'file';
      sourceName = file.name;
      const buffer = await file.arrayBuffer();
      const filename = file.name.toLowerCase();

      if (filename.endsWith('.pdf')) {
        const parser = new PDFParse({ data: Buffer.from(buffer) });
        const data = await parser.getText();
        await parser.destroy();
        promptText = data.text;
      } else if (filename.endsWith('.txt') || filename.endsWith('.md')) {
        promptText = new TextDecoder('utf-8').decode(buffer);
      } else {
        return NextResponse.json({ error: 'Unsupported file type. Please upload PDF, TXT, or MD.' }, { status: 400 });
      }
    }

    if (!promptText || promptText.trim().split(/\s+/).length < 10) {
      return NextResponse.json({ error: 'The provided text or file must contain at least 10 words.' }, { status: 400 });
    }

    // Prepare Context Injection (Knowledge Base)
    const providerKey = modelProvider.toLowerCase() as keyof typeof rulesMatrix;
    const universalRules = rulesMatrix.universal;
    const specificRules = rulesMatrix[providerKey] || [];

    const systemPrompt = `You are a strict "Prompt Engineer" and Editor evaluating a user's prompt strategy.
The user might provide a single prompt or an entire document (e.g., PDF) containing multiple spaced-out prompts for a larger project (like a Data Maturity Assessment Tool).
Your goal is to evaluate their *overall* prompting strategy based on how well it aligns with their stated intent and how strictly it adheres to industry best practices.

### RULES TO ENFORCE ###
**Universal Rules:**
${universalRules.map((r: string) => "- " + r).join('\n')}

**Model-Specific Rules (${modelProvider}):**
${specificRules.length > 0 ? specificRules.map((r: string) => "- " + r).join('\n') : "None specifically."}

### INSTRUCTIONS ###
Analyze the provided text. Calculate a score out of 100 based on adherence to the rules and alignment with their stated goal.
Then, provide a "Perfect Rewrite". If they submitted multiple prompts, rewrite them into a cohesive, perfectly formatted strategy (using XML tags, examples, or whatever the rules demand).

Return ONLY a valid JSON object matching the exact following structure:
{
  "score": number,
  "subscores": {
    "clarity": number,
    "context": number,
    "intentAlignment": number
  },
  "violations": [array of strings explaining which rules were broken. Keep it concise.],
  "pros": [array of strings explaining what they did well in their strategy.],
  "rewrittenPrompt": "A large string containing the rewritten, perfect prompt(s) following all rules. Use \n for line breaks."
}

DO NOT wrap the JSON in markdown code blocks. Output RAW JSON only.`;

    const userMessage = `My Goal/Intent: ${goal}\n\nMy Prompt(s)/Document Text:\n${promptText}`;

    // Call Local Ollama API instead of OpenAI
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemma4:latest', // Updated to use your specified model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        format: "json", // Forces Ollama to output valid JSON
        stream: false
      })
    });

    if (!response.ok) {
      return NextResponse.json({ 
        error: 'Failed to connect to Ollama. Please make sure Ollama is running and the gemma4:latest model is available.' 
      }, { status: 500 });
    }

    const data = await response.json();
    const resultString = data.message.content || '{}';
    const resultJson = JSON.parse(resultString);

    const extractedPreview = promptText.trim().slice(0, 1800);

    return NextResponse.json({
      ...resultJson,
      extractedInput: {
        sourceType,
        sourceName,
        wordCount: promptText.trim().split(/\s+/).filter(Boolean).length,
        preview: extractedPreview,
        truncated: promptText.trim().length > extractedPreview.length,
      },
    });

  } catch (error: any) {
    console.error('Assessment Error:', error);
    return NextResponse.json({ 
      error: 'Could not connect to Ollama. Is the server running? Run `ollama serve` or open the Ollama app.' 
    }, { status: 500 });
  }
}
