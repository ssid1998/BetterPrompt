import { NextResponse } from 'next/server';
import rulesMatrix from '@/data/rules.json';

export async function POST(req: Request) {
  try {
    const { promptText, goal, modelProvider } = await req.json();

    if (!promptText || !goal || !modelProvider) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prepare Context Injection (Knowledge Base)
    const providerKey = modelProvider.toLowerCase() as keyof typeof rulesMatrix;
    const universalRules = rulesMatrix.universal;
    const specificRules = rulesMatrix[providerKey] || [];

    const systemPrompt = `You are a strict "Prompt Engineer" grading an AI prompt.
Your goal is to evaluate the user's prompt based on how well it aligns with their stated intent and how strictly it adheres to industry best practices.

### RULES TO ENFORCE ###
**Universal Rules:**
${universalRules.map((r: string) => "- " + r).join('\n')}

**Model-Specific Rules (${modelProvider}):**
${specificRules.length > 0 ? specificRules.map((r: string) => "- " + r).join('\n') : "None specifically."}

### INSTRUCTIONS ###
Analyze the prompt provided by the user. Calculate a score out of 100 based on adherence to the rules and alignment with their stated goal.
Return ONLY a valid JSON object matching the following structure:
{
  "score": number,
  "subscores": {
    "clarity": number,
    "context": number,
    "intentAlignment": number
  },
  "violations": [array of strings explaining which rules were broken],
  "pros": [array of strings explaining what they did well]
}

DO NOT wrap the JSON in markdown code blocks. Output RAW JSON only.`;

    const userMessage = `My Goal/Intent: ${goal}\n\nMy Prompt:\n${promptText}`;

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
        error: 'Failed to connect to local Ollama. Ensure Ollama is running and you have pulled the model (e.g., `ollama run llama3`).' 
      }, { status: 500 });
    }

    const data = await response.json();
    const resultString = data.message.content || '{}';
    const resultJson = JSON.parse(resultString);

    return NextResponse.json(resultJson);

  } catch (error: any) {
    console.error('Assessment Error:', error);
    return NextResponse.json({ 
      error: 'Could not connect to Ollama. Is the server running? Run `ollama serve` or open the Ollama app.' 
    }, { status: 500 });
  }
}
