# BetterPrompt

<p align="left">
  <img src="./public/logo/terminallogo.png" alt="BetterPrompt Logo" width="72" />
</p>

BetterPrompt is an educational prompt-review tool. Its purpose is to evaluate prompts against prompt-engineering best practices, explain what is working and what is weak, and generate a stronger rewritten version.

The current implementation includes the assessor, provider-aware guidance, a learning tutor, prompt safety checks, and a presentation-ready feedback experience.

## Screenshot

![BetterPrompt home screen](./public/Home.png)

## Current product scope

At this stage, BetterPrompt supports:

- assessment of a single prompt or a collection of prompts
- user intent capture
- model-provider-aware evaluation with provider + model targeting
- upload and parsing of prompt files
- scoring and feedback generation
- rewritten prompt generation
- prompt-structure checks and injection detection
- BetterPrompt Tutor on the assessor and learn experiences

## Current capabilities

The current build includes:

- **Prompt input** through pasted text
- **Document ingestion** for `.pdf`, `.txt`, and `.md` files
- **Prompt extraction preview** so users can see the content that was actually assessed
- **Assessment dashboard** with:
  - overall score
  - sub-scores for clarity, context, and intent alignment
  - strengths
  - weaknesses
  - prompt structure signals
  - injection pass/fail check
  - rewritten output under **Better Prompt**
- **Copy-to-clipboard** support for the rewritten prompt
- **Learning Copilot / BetterPrompt Tutor** on the assessor and Learn pages for prompt-engineering Q&A

## Technical architecture

BetterPrompt is built as a full-stack JavaScript application using:

- **Next.js** for frontend UI and backend API routes
- **React** for the application interface
- **Tailwind CSS** for styling
- **Ollama** for local model inference
- **Gemma 4** (`gemma4:latest`) as the current local assessment model
- **Gemma 4** (`gemma4:latest`) as the local assessment and learning-copilot model
- **pdf-parse** for PDF text extraction

## Model-aware prompting

BetterPrompt is designed around the idea that different providers often respond best to different prompt styles.

- **Anthropic / Claude** often benefits from clear XML-style structure and explicit context separation.
- **OpenAI / GPT** usually works well with direct goals, constraints, and clearly requested output formats.
- **Google Gemini** often benefits from a clear Persona, Task, Context, and Format structure.

## Assessment flow

The current system works in the following stages:

1. The user provides a goal and either pasted prompt text or an uploaded prompt file.
2. The backend extracts raw text from the input source.
3. The system evaluates the prompt against provider-aware guidance and quality checks.
4. A local Ollama model evaluates the prompt strategy.
5. Deterministic guardrails validate structural signals and scan for prompt-injection attempts.
6. The model returns structured assessment data.
7. The frontend presents the results in a dashboard.

## Current status

The project currently has working support for:

- local prompt assessment with Ollama
- prompt-file uploads
- PDF / text / markdown parsing
- multi-prompt evaluation
- dashboard-based result presentation
- learning-page and assessor-page tutoring
- assessor-page tutor access
- deterministic XML / structure checks
- prompt-injection and score-manipulation detection
- provider-specific learning templates for OpenAI, Anthropic, and Google

## Known future work

The following items are important next steps:

- stronger score transparency and explanation
- better prompt segmentation for multi-prompt files
- richer rule sources and expanded provider guides
- further UX improvements for presentation scenarios
