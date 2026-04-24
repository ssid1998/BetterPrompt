# 🔭 Project Vision: BetterPrompt

**Date:** April 24, 2026
**Status:** Draft / Complete

## 1. Elevator Pitch
For AI users ranging from casual beginners to technical practitioners who struggle to write effective LLM prompts, BetterPrompt is a web-based educational tool that evaluates, scores, and improves their prompts. Unlike trial-and-error prompting, our product leverages official prompting guidelines from top AI companies to identify strengths and weaknesses, providing actionable, model-specific recommendations to help users master AI communication.

## 2. Business Goals
*   Provide a functional tool for university students to improve prompts for their academic and personal coding projects.
*   Educate users on universal and model-specific AI communication best practices (e.g., Anthropic, OpenAI, Google).
*   Demonstrate a clear, working prototype to university professors through a dedicated Showcase mode.

## 3. Scope & Constraints
*   **In Scope:** Web interface for text/PDF prompt ingestion, user intent gathering, assessment engine based on a rules knowledge base, feedback generation (pros/cons/rewrites), and an educational demo mode.
*   **Out of Scope:** Direct execution of the prompts against live AI APIs (the tool assesses, it doesn't run the prompt on behalf of the user to generate the final coding output). IDE integrations or browser extensions are out of scope for the MVP.
*   **Constraints:** The knowledge base of rules must be manually curated or pre-defined; it does not automatically update itself from the internet in real-time.

## 4. Roadmap (The Epics)
*   **Epic 1: Prompt Input & Context Gathering** - Enabling users to seamlessly provide their prompts (text or PDF), their intended goals, and their target AI model.
*   **Epic 2: Prompting Knowledge Base & Rule Engine** - The foundational reference system storing official best practices from major AI companies (universal rules, XML tags, Markdown formatting, etc.).
*   **Epic 3: Assessment & Scoring System** - The logic that evaluates the user's prompt against the Knowledge Base to calculate objective scores.
*   **Epic 4: Feedback & Improvement Recommendations** - Presenting actionable feedback, pros/cons, and tailored, rewritten prompts to the user.
*   **Epic 5: Educational Demo Showcase** - A presentation-ready feature with pre-loaded examples to instantly demonstrate the tool's value to professors and peers.