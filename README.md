# BetterPrompt 🎯

Welcome to **BetterPrompt**! This is an educational, web-based tool designed to help users evaluate, score, and improve their Large Language Model (LLM) prompts. 

Whether you are a casual beginner or a mid-level technical practitioner, writing the perfect prompt can often feel like trial-and-error. BetterPrompt removes the guesswork by leveraging official prompting guidelines from top AI companies (like OpenAI, Anthropic, and Google) to provide actionable, model-specific recommendations.

## ✨ Features

* **Prompt Scoring & Assessment:** Submit your prompt (via text or PDF upload) and receive an objective score based on clarity, context, and intent alignment.
* **Hybrid Knowledge Base:** Our engine evaluates prompts against both *universal* best practices and *model-specific* guidelines (e.g., Claude's preference for XML tags vs. ChatGPT's use of Markdown).
* **Actionable Feedback & Rewrites:** Get a clear "Pros & Cons" breakdown highlighting exactly what you did right, and instantly receive an optimized, ready-to-copy version of your prompt.
* **🎓 Educational Learning Hub:** A dedicated section containing "Prompting 101" basics and model-specific cheat sheets so users can understand *why* their prompt received a certain score and how to improve.
* **Educational Showcase:** A built-in presentation mode loaded with classic "bad prompt" examples to instantly demonstrate the value of prompt engineering.

## 🛠️ Under the Hood (Tech Stack)

BetterPrompt isn't just a basic keyword scanner; it uses an **LLM-as-a-Judge** architecture to truly understand natural language intent.
* **Frontend & Backend:** Built with **Next.js** and **Tailwind CSS** for a seamless, fast UI and secure server-side API routes.
* **The Assessment Engine:** Powered by the **OpenAI API**. We use a technique called *Context Injection* to secretly pass our structured "Prompting Rules" to the AI, forcing it to grade the user's prompt strictly against official industry guidelines.
* **Document Parsing:** Utilizes `pdf-parse` to handle direct document uploads safely on the backend.

## 🎯 Target Audience

This tool was originally built with university students and academic projects (such as data maturity tools) in mind, but it is highly valuable for:
* Students using AI for coursework and study assistance.
* Developers building coding projects and testing system prompts.
* Anyone looking to master effective communication with modern AI models.

## 🚀 How It Works

1. **Input:** Paste your prompt or upload a PDF document containing your drafts.
2. **Context:** Briefly state your end goal and select your target AI model (e.g., GPT-4o, Claude 3.5, Gemini).
3. **Analyze:** Our Next.js backend securely asks our AI Judge to compare your prompt against the official guidelines.
4. **Learn & Improve:** Review your score, read the tailored improvement tips, explore the Learning Hub for deeper context, and copy your newly optimized prompt!

---
*Note: This tool is strictly for assessment and educational purposes. It does not execute the prompts directly against live AI APIs to perform tasks.*