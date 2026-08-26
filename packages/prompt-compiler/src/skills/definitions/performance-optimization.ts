import type { SkillDefinition } from "../types.js";

export const performanceOptimizationSkills: SkillDefinition[] = [
  {
    name: "perf",
    label: "Performance & Optimization Overview",
    category: "Performance & Async",
    description: "Optimize execution speed, memory consumption, caching, and algorithmic efficiency.",
    keywords: ["perf", "performance", "optimize", "fast", "speed", "latency", "throughput", "bottleneck"],
    guidelines: [
      "Target empirical bottlenecks backed by benchmark measurements.",
      "Prefer O(1) or O(N) lookup structures over nested iterations.",
    ],
    executionSteps: [
      "Identify hot code paths and execution bottlenecks.",
      "Apply algorithmic improvements, caching, or memory reuse.",
      "Verify performance gains with benchmark tests.",
    ],
    verificationRules: [
      "Verify functional correctness and measure time/memory savings.",
    ],
  },
  {
    name: "memory-optimization",
    label: "Memory Leak & Garbage Collection Optimization",
    category: "Performance & Async",
    description: "Diagnose Node.js / browser memory leaks, heap retention, buffer reuse, and object pooling.",
    keywords: ["memory", "heap", "leak", "gc", "garbage-collection", "buffer", "allocation", "profile"],
    guidelines: [
      "Avoid global object reference retainers.",
      "Stream or chunk large payload processing instead of loading entire files into RAM.",
    ],
    executionSteps: [
      "Take heap snapshots to identify retained objects.",
      "Implement stream/chunk processing or object pooling.",
      "Verify memory release post-execution.",
    ],
    verificationRules: [
      "Confirm memory consumption stabilizes and leaks are eliminated.",
    ],
  },
  {
    name: "async-concurrency",
    label: "Async Concurrency & Parallel Execution",
    category: "Performance & Async",
    description: "Manage async operations, Worker threads, task queues, promise concurrency limits, and locks.",
    keywords: ["async", "concurrency", "parallel", "worker", "promise", "race-condition", "mutex", "lock", "queue"],
    guidelines: [
      "Control concurrency limits (e.g. `p-limit`) to prevent resource starvation.",
      "Use mutexes or atomic operations when mutating shared resources under concurrency.",
    ],
    executionSteps: [
      "Identify blocking or sequential async calls that can run concurrently.",
      "Implement bounded concurrency queues or worker thread pools.",
      "Add synchronization locks for critical sections.",
    ],
    verificationRules: [
      "Test concurrent execution under high workload without data race conditions.",
    ],
  },
  {
    name: "load-testing",
    label: "Load & Stress Testing",
    category: "Performance & Async",
    description: "Simulate concurrent user traffic and measure throughput/latency breaking points using k6 or Autocannon.",
    keywords: ["load-testing", "stress", "benchmark", "k6", "autocannon", "rps", "throughput", "p99"],
    guidelines: [
      "Measure p95 and p99 latency metrics under load.",
      "Identify infrastructure breaking points.",
    ],
    executionSteps: [
      "Write load test scripts simulating real-world traffic profiles.",
      "Execute load tests against target endpoints.",
      "Analyze response latency histograms and error rates.",
    ],
    verificationRules: [
      "Verify system meets Target RPS and latency SLA constraints.",
    ],
  },
  {
    name: "latency-reduction",
    label: "Low-Latency & Network Optimization",
    category: "Performance & Async",
    description: "Reduce network roundtrips, optimize connection pooling, compression, and payload sizes.",
    keywords: ["latency", "roundtrip", "compression", "gzip", "brotli", "connection-pool", "payload"],
    guidelines: [
      "Enable HTTP response compression (Gzip / Brotli).",
      "Reuse TCP connection pools for outbound HTTP/database calls.",
    ],
    executionSteps: [
      "Audit payload sizes and strip unnecessary JSON fields.",
      "Configure persistent HTTP keep-alive agents and connection pools.",
      "Measure roundtrip latency reduction.",
    ],
    verificationRules: [
      "Verify payload size reduction and network response speedups.",
    ],
  },
];
