import type { SkillDefinition } from "../types.js";

export const advancedDataSkills: SkillDefinition[] = [
  {
    name: "database-sharding",
    label: "Database Sharding & Partitioning",
    category: "Advanced Data Engineering",
    description: "Design horizontal data sharding strategies, shard key selection, and cross-shard query resolution.",
    keywords: ["sharding", "shard", "partitioning", "partition-key", "horizontal-scaling", "distributed-db", "citus"],
    guidelines: [
      "Select high-cardinality shard keys to ensure uniform data distribution.",
      "Avoid cross-shard join queries wherever possible.",
    ],
    executionSteps: [
      "Evaluate domain access patterns and select shard key attributes.",
      "Implement application shard router or proxy configuration.",
      "Write multi-shard scatter-gather query aggregation handlers.",
    ],
    verificationRules: [
      "Verify query routing to target shard instances and payload aggregation correctness.",
    ],
  },
  {
    name: "cdc-change-data-capture",
    label: "Change Data Capture (CDC) & Event Streams",
    category: "Advanced Data Engineering",
    description: "Stream database commit log mutations in realtime to event buses using Debezium, Kafka, or AWS Kinesis.",
    keywords: ["cdc", "change-data-capture", "debezium", "commit-log", "kafka-connect", "wal", "event-streaming"],
    guidelines: [
      "Use database transaction logs (WAL/binlog) for zero-impact change extraction.",
      "Ensure downstream event consumers process CDC payloads idempotently.",
    ],
    executionSteps: [
      "Configure database replication parameters and logical decoding slots.",
      "Set up Debezium / Kafka Connect connector pipelines.",
      "Implement consumer event handlers for cache invalidation or search index sync.",
    ],
    verificationRules: [
      "Verify real-time event emission on DB inserts/updates and downstream consumer state sync.",
    ],
  },
];
