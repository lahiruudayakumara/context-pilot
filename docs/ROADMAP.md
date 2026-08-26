# ContextPilot Product Roadmap 🚀

This document outlines the strategic product vision, architectural milestones, and planned feature deliverables for **ContextPilot** — the local-first context optimizer and prompt compiler for AI coding agents.

---

## 🎯 Vision & Guiding Principles

ContextPilot bridges developer intent and AI agent context limitations by selecting, compressing, and structuring repository knowledge into high-impact prompt bundles.

1. **Local-First & Private**: Repository code and metadata remain strictly local on the developer's host machine.
2. **Deterministic & Explainable**: Retrieval and scoring decisions are transparent, reproducible, and accompanied by human-readable ranking reasons.
3. **Token-Budget Aware**: Fits context bundles within configurable token limits, eliminating context window bloat and truncation errors.
4. **Skill-Enriched Prompting**: Transforms raw developer tasks into structured prompts enriched with domain best practices, execution steps, and verification criteria.

---

## 🗺️ Product Roadmap Overview

```text
Phase 1 (Q3 2026)     Phase 2 (Q4 2026)     Phase 3 (Q1 2027)     Phase 4 (Q2 2027)
├── VS Code Sidebar   ├── Tree-Sitter AST   ├── Knowledge Base    ├── Multi-Repo Monorepos
├── Interactive TUI   ├── ONNX Embeddings   ├── Feedback Tuning   ├── CI/CD PR Audit Bot
└── Custom Skills     └── Call-Graphing     └── LSP Integration   └── Agent Benchmarks
```

---

## Phase 1: IDE Extensions & Developer Experience (Q3 2026)

Focus: Integrate ContextPilot directly into developers' everyday coding environments with visual tools and customizable rules.

### 1.1 VS Code Sidebar Extension (`vscode-context-pilot`)
- **Visual Prompt Refiner**: Interactive task prompt entry box with domain skill checkboxes (`bugfix`, `refactor`, `ddd`, `react`, `docker`, etc.).
- **Live Token Allocation Gauge**: Real-time visualization of selected files, symbol excerpts, and total estimated token usage against budget.
- **Context Inspector & Pin Controls**: Easily include, exclude, or pin specific files and symbols before compiling context bundles.
- **One-Click Agent Dispatch**: Directly send compiled context bundles to Codex, Cursor, or Claude Code interfaces.

### 1.2 Interactive CLI TUI (`context-pilot ui`)
- Terminal user interface built with Ink / Blessed for terminal-native developers.
- Interactive fuzzy-search skill picker, file tree inspection, and budget tuning controls.

### 1.3 Project-Level Custom Skills (`.context-pilot/skills/`)
- Support local team skill definitions stored in `.context-pilot/skills/*.yml`.
- Allow project teams to define project-specific coding standards, architecture constraints, and verification checklists.

---

## Phase 2: Deep AST Parsing & Local Intelligence (Q4 2026)

Focus: Advance from lexical pattern extraction to full syntactic and semantic comprehension of multi-file codebases.

### 2.1 Native Tree-Sitter AST Parsers
- Replace regex-based symbol extractors with native **Tree-Sitter** parsers.
- Extract 100% precise AST symbol boundaries, type definitions, and class inheritance structures across TypeScript, Go, Python, Rust, Java, C#, and C++.

### 2.2 Privacy-Preserving Local Embeddings (ONNX / Wasm)
- Add optional, 100% local vector embedding generation (e.g. `nomic-embed-text` or `bge-small` running via ONNX Runtime / WebAssembly).
- Enable hybrid search (Lexical BM25 + Vector Similarity + Git Recency signals) without sending code to third-party cloud embedding APIs.

### 2.3 Multi-File Call-Graph & Type Tracing
- Trace upstream callers and downstream callees across import dependency chains.
- Automatically include prerequisite interface and type definitions when a function signature is selected for context compilation.

---

## Phase 3: Shared Team Knowledge & Feedback Loops (Q1 2027)

Focus: Shared architectural context across development teams and self-improving retrieval models.

### 3.1 Shared Team Knowledge Base (`.context-pilot/knowledge/`)
- Option to commit deterministic, version-controlled architecture summaries (`.context-pilot/knowledge/architecture.md`) into Git repositories.
- Provides instant, zero-cost architecture onboarding for new team members and AI agents.

### 3.2 Agent Feedback & Relevance Auto-Tuning
- Track task outcome success (e.g., whether generated code passed test suites cleanly).
- Automatically adjust file ranking weights based on historical task success data.

### 3.3 Language Server Protocol (LSP) Integration
- Connect to background LSPs (`tsserver`, `gopls`, `pyright`, `rust-analyzer`) for exact jump-to-definition and symbol reference resolution.

---

## Phase 4: Enterprise Scale & Multi-Repo Workspaces (Q2 2027)

Focus: Large-scale microservice monorepos and automated CI/CD PR context auditing.

### 4.1 Multi-Repository Workspace Orchestration
- Cross-repository context preparation for microservice architectures.
- Index dependent packages and shared client libraries across workspace roots.

### 4.2 CI/CD Context & Documentation Auditor
- GitHub Action bot that audits PR context overhead and flags outdated documentation.
- Automatically generates PR review bundles (`context-pilot diff-context`).

### 4.3 Agent Retrieval Benchmarking Suite
- Open-source benchmark suite measuring token reduction percentage vs. coding task completion accuracy across open-source repositories.

---

## 📊 Summary Feature Matrix

| Feature | Target Release | Primary Benefit | Status |
| :--- | :--- | :--- | :--- |
| **Local SQLite Cache** | v0.1.0 | Fast, content-addressed file indexing | ✅ Completed |
| **30+ Skill Presets & Prompt Engine** | v0.1.0 | Converts raw tasks into structured prompts | ✅ Completed |
| **MCP Server (`prepare_context`)** | v0.1.0 | Direct integration with Codex and MCP clients | ✅ Completed |
| **Automatic `.gitignore` Entry** | v0.1.0 | Prevents `.context-pilot/` from being committed | ✅ Completed |
| **VS Code Extension** | Q3 2026 | Visual sidebar & context inspector UI | ⏳ Planned |
| **Tree-Sitter AST Integration** | Q4 2026 | 100% precise symbol boundaries | ⏳ Planned |
| **ONNX Local Embeddings** | Q4 2026 | Local-first hybrid vector search | ⏳ Planned |
| **Shared Team Knowledge Base** | Q1 2027 | Committed architecture summaries | ⏳ Planned |
| **Multi-Repo Workspace Support** | Q2 2027 | Cross-microservice context bundles | ⏳ Planned |
