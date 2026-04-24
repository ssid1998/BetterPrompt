# Technology Stack & Architecture

**Project:** BetterPrompt
**Date:** April 24, 2026

This document outlines the technical strategy for BetterPrompt. The goal is to choose technologies that are modern, fast to develop, and robust enough to handle complex natural language evaluations securely.

## 1. The Stack
*   **Framework:** Next.js (React)
    *   *Purpose:* Acts as both our Frontend UI and our secure Backend API. Next.js server-side routing ensures that sensitive logic (like API keys) never reaches the user's browser.
*   **Styling:** Tailwind CSS
    *   *Purpose:* Utility-first CSS framework for rapid UI development and ensuring responsive design for the dashboard and feedback panels.
*   **AI Integration:** OpenAI Node.js SDK
    *   *Purpose:* The official library to connect our Next.js backend securely to the OpenAI API (acting as our LLM Judge).
*   **Document Parsing:** `pdf-parse` (Node.js Library)
    *   *Purpose:* Browsers lack native PDF text extraction. This library processes uploaded PDFs on the backend to extract raw text for the Assessment Engine.

## 2. Key Architectural Decisions

### Decision 1: LLM-as-a-Judge vs. Regex Heuristics
*   **Choice:** We will use a Large Language Model (LLM) behind the scenes to grade the user's prompt, rather than writing standard code (Regex/Heuristics) to search for keywords.
*   **Rationale:** Standard code is too rigid for natural language. If a user writes "Pretend you are a doctor" instead of "Act as a doctor," regex might miss it, but an LLM understands the semantic intent. Furthermore, only an LLM can generate the "Rewritten Prompt."

### Decision 2: Context Injection vs. RAG
*   **Choice:** We will pass our prompting rules directly to the LLM inside a System Prompt (Context Injection) rather than building a Vector Database (RAG - Retrieval-Augmented Generation).
*   **Rationale:** Our entire knowledge base (OpenAI rules, Anthropic rules, Gemini rules) fits easily into a few thousand tokens. RAG introduces unnecessary database complexity and cost for a dataset this small. We will store the rules locally as a JSON matrix in our codebase.

### Decision 3: The DRY Learning Hub
*   **Choice:** The Educational Learning Hub (Frontend) and the Assessment Engine (Backend) will read from the *exact same* local Rules JSON file.
*   **Rationale:** Following the "Don't Repeat Yourself" (DRY) principle ensures that if we update the rule for Claude's XML tags, the grading system and the user-facing documentation update simultaneously without risking discrepancies.