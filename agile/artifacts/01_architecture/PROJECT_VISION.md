# 🔭 Project Vision: BetterPrompt (v2 - Architecture Refined)

**Date:** April 24, 2026
**Status:** Architecture Approved

## 1. Elevator Pitch
For AI users ranging from casual beginners to technical practitioners who struggle to write effective LLM prompts, BetterPrompt is a web-based educational tool that evaluates, scores, and improves their prompts. Unlike trial-and-error prompting, our product leverages official prompting guidelines from top AI companies to identify strengths and weaknesses, providing actionable, model-specific recommendations to help users master AI communication. 

*Technical Addendum:* BetterPrompt acts as an "LLM-as-a-Judge," safely injecting official rules into a backend prompt to generate intelligent, context-aware feedback and rewrites without requiring the user to manage API keys.

## 2. Business & Educational Goals
*   Provide a functional tool for university students to improve prompts for academic projects (e.g., Data Maturity Assessment Tools).
*   Educate users on universal and model-specific AI communication best practices.
*   Demonstrate a clear, working prototype to university professors through a dedicated Demo Showcase mode.
*   Bridge the gap between simply receiving a score and understanding *why* by integrating a dedicated Educational Learning Hub.

## 3. Scope & Constraints
*   **In Scope:** A web interface for text/PDF prompt ingestion, user intent capture, an Assessment Engine powered by an LLM-as-a-Judge, dynamic feedback generation (pros/cons/rewrites), an educational Learning Hub, and a Demo mode.
*   **Out of Scope:** Direct execution of the user's prompt against live AI APIs to do their actual work. The tool only *evaluates and rewrites* the prompt. IDE integrations are out of scope.
*   **Constraints:** We are building this Greenfield (from scratch). The knowledge base of rules is manually curated into static application files (Context Injection) rather than dynamically scraping the web.

## 4. Technical Strategy (The "Why")
We are adopting a modern, full-stack JavaScript architecture using **Next.js**. 
*   **Why Next.js?** It allows us to build a seamless user interface and a secure backend API in the same project. We need a backend so we can hide our OpenAI API keys from public view.
*   **Why LLM-as-a-Judge?** Regular code (if/else statements) cannot accurately grade human language or rewrite it effectively. By having an AI secretly grade the user's prompt based on our strict rule sets, we get human-level feedback.
*   **Why Context Injection over RAG?** RAG (Retrieval-Augmented Generation) involves setting up a complex database. Since our prompting rules (the "Knowledge Base") are just a few pages of text, we can simply pass those text rules directly to the LLM when it grades the user. This saves time, money, and complexity.

## 5. Glossary for Non-Technical Stakeholders
*   **LLM (Large Language Model):** The artificial intelligence brain (like ChatGPT or Claude) that reads and generates text.
*   **Context Injection:** A technique where we secretly attach a list of rules to the user's prompt before sending it to the AI to grade. It's like slipping the teacher the grading rubric before they grade the test.
*   **API (Application Programming Interface):** A digital bridge that allows our application to talk to OpenAI's computers.
*   **Greenfield:** Starting a software project completely from scratch, with no old code to fix or maintain.
*   **Dry Principle (Don't Repeat Yourself):** A coding rule that means we will write our prompting guidelines once, and use them both for grading (the LLM reads them) and teaching (the user reads them on the Learn page).