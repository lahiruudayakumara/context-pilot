import type { SkillDefinition } from "../types.js";

export const aiMlEngineeringSkills: SkillDefinition[] = [
  {
    name: "llm-integration",
    label: "LLM Integration & Function Calling",
    category: "AI & ML Engineering",
    description: "Integrate LLM API providers, construct structured JSON schema output specifications, and handle function calling.",
    keywords: ["llm", "ai", "openai", "claude", "gemini", "prompt-engineering", "function-calling", "structured-output", "langchain"],
    guidelines: [
      "Use explicit Zod/JSON schemas for LLM structured outputs.",
      "Implement defensive schema validation and retry parsing on malformed responses.",
    ],
    executionSteps: [
      "Define JSON schemas for LLM tool calling interfaces.",
      "Construct system prompts with clear constraints and examples.",
      "Implement client call wrappers with token budgeting and parsing validation.",
    ],
    verificationRules: [
      "Verify schema validation of LLM JSON outputs and fallback handling.",
    ],
  },
  {
    name: "rag-architecture",
    label: "RAG (Retrieval-Augmented Generation)",
    category: "AI & ML Engineering",
    description: "Architect RAG pipelines: document ingestion, chunking strategies, vector retrieval, and prompt context synthesis.",
    keywords: ["rag", "retrieval-augmented", "chunking", "embeddings", "vector-search", "hybrid-search", "reranking"],
    guidelines: [
      "Select optimal text chunk sizes with overlapping windows to preserve semantic continuity.",
      "Use hybrid lexical + vector search reranking for high precision retrieval.",
    ],
    executionSteps: [
      "Build document parser and semantic chunking pipeline.",
      "Generate vector embeddings and index into vector database.",
      "Implement context retrieval, ranker, and LLM prompt compiler.",
    ],
    verificationRules: [
      "Verify chunking boundaries, retrieval recall accuracy, and context window budget compliance.",
    ],
  },
  {
    name: "vector-database",
    label: "Vector Database & Embeddings Storage",
    category: "AI & ML Engineering",
    description: "Store and query high-dimensional vector embeddings using pgvector, Pinecone, Qdrant, or Weaviate.",
    keywords: ["vector-database", "vector", "pgvector", "pinecone", "qdrant", "weaviate", "cosine-similarity", "hnsw"],
    guidelines: [
      "Use HNSW or IVFFlat indexes for scalable vector distance lookups.",
      "Store original document metadata alongside vector embeddings for fast filtering.",
    ],
    executionSteps: [
      "Define vector table schemas and dimension metadata.",
      "Create cosine/Euclidean distance indexes.",
      "Implement vector similarity search query handlers with metadata filters.",
    ],
    verificationRules: [
      "Verify vector insertion, similarity search recall, and query latency.",
    ],
  },
];
