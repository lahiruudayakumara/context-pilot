import type { SkillDefinition } from "../types.js";

export const distributedResilienceSkills: SkillDefinition[] = [
  {
    name: "circuit-breaker",
    label: "Circuit Breaker & Resilience Patterns",
    category: "Distributed Systems",
    description: "Prevent cascading failures in distributed systems using Circuit Breakers, Bulkheads, and Fallback handlers.",
    keywords: ["circuit-breaker", "resilience", "fallback", "bulkhead", "hystrix", "resilience4j", "failure-threshold"],
    guidelines: [
      "Track failure rates and trip circuit breakers to open state before downstream services collapse.",
      "Provide immediate, graceful fallback responses when a circuit is open.",
    ],
    executionSteps: [
      "Configure error rate thresholds, sliding window sizes, and half-open timeout durations.",
      "Wrap outbound RPC/HTTP calls in circuit breaker execution handlers.",
      "Implement fallback state logic for open circuit conditions.",
    ],
    verificationRules: [
      "Test circuit state transitions (Closed -> Open -> Half-Open -> Closed) under simulated downstream failures.",
    ],
  },
  {
    name: "zero-downtime-deployment",
    label: "Zero-Downtime Deployment & Canary Releases",
    category: "Distributed Systems",
    description: "Execute safe deployments using Blue-Green strategies, Canary rollouts, and multi-version API support.",
    keywords: ["zero-downtime", "canary", "blue-green", "rolling-update", "backward-compatible", "feature-flag"],
    guidelines: [
      "Ensure database migrations are strictly backward compatible across N and N+1 code versions.",
      "Use feature flags to decouple code deployment from feature exposure.",
    ],
    executionSteps: [
      "Design dual-write or backward-compatible schema changes.",
      "Configure progressive Canary traffic routing rules.",
      "Implement automated rollback triggers based on error rate metrics.",
    ],
    verificationRules: [
      "Verify system health during dual-version execution and rollout state transition.",
    ],
  },
  {
    name: "fault-tolerance",
    label: "Fault Tolerance & Rate Limiting",
    category: "Distributed Systems",
    description: "Implement exponential backoff retries, jitter, rate limiting, and distributed concurrency locks.",
    keywords: ["fault-tolerance", "exponential-backoff", "jitter", "rate-limit", "leaky-bucket", "token-bucket", "distributed-lock"],
    guidelines: [
      "Add randomized jitter to exponential backoff retries to prevent thundering herd problems.",
      "Enforce distributed rate limiting at the network edge.",
    ],
    executionSteps: [
      "Implement retry handlers with exponential backoff and jitter.",
      "Set up edge rate limiting (Token Bucket / Sliding Window).",
      "Add distributed lock acquisition with automatic TTL expiration.",
    ],
    verificationRules: [
      "Verify retry frequency under failure and edge rate limiting enforcement.",
    ],
  },
];
