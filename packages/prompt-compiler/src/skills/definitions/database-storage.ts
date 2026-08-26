import type { SkillDefinition } from "../types.js";

export const databaseStorageSkills: SkillDefinition[] = [
  {
    name: "database-sql",
    label: "Relational SQL Databases",
    category: "Databases & Storage",
    description: "Design relational database schemas, indexes, complex SQL queries (PostgreSQL, MySQL, SQLite).",
    keywords: ["sql", "postgres", "postgresql", "mysql", "sqlite", "relational", "join", "index", "query", "transaction"],
    guidelines: [
      "Normalize database tables to reduce redundancy.",
      "Add indexes for high-frequency lookup fields.",
      "Use explicit transactions for multi-statement atomic mutations.",
    ],
    executionSteps: [
      "Define table schemas, primary keys, and foreign key constraints.",
      "Write optimized SQL queries and joins.",
      "Add index declarations for foreign keys and filter columns.",
    ],
    verificationRules: [
      "Verify query execution plans and index usage.",
    ],
  },
  {
    name: "database-nosql",
    label: "NoSQL & Document Databases",
    category: "Databases & Storage",
    description: "Architect MongoDB, DynamoDB, Cassandra, or Firestore schemas and document models.",
    keywords: ["nosql", "mongodb", "dynamodb", "document", "collection", "firestore", "cassandra"],
    guidelines: [
      "Design document schemas around application query access patterns.",
      "Avoid unbounded array growth within single documents.",
    ],
    executionSteps: [
      "Define document model interfaces and index keys.",
      "Implement CRUD operations and query aggregations.",
      "Handle eventual consistency and atomic updates.",
    ],
    verificationRules: [
      "Verify document queries and projection operations.",
    ],
  },
  {
    name: "orm-prisma",
    label: "ORM & Database Mapping (Prisma/TypeORM/Drizzle)",
    category: "Databases & Storage",
    description: "Manage database access via Prisma, TypeORM, Drizzle, or Sequelize ORMs.",
    keywords: ["orm", "prisma", "typeorm", "drizzle", "sequelize", "schema.prisma", "entity", "migration"],
    guidelines: [
      "Keep schema definitions synchronized with database state.",
      "Avoid N+1 lazy loading by using explicit relation inclusions.",
    ],
    executionSteps: [
      "Define ORM model entities and relation fields.",
      "Generate ORM client and write type-safe query calls.",
      "Run schema migrations.",
    ],
    verificationRules: [
      "Verify ORM client queries and schema type safety.",
    ],
  },
  {
    name: "database-migration",
    label: "Database Migration Management",
    category: "Databases & Storage",
    description: "Write zero-downtime database schema migrations, rollback scripts, and seed files.",
    keywords: ["migration", "migrate", "schema-change", "rollback", "seed", "ddl", "column-add"],
    guidelines: [
      "Ensure migrations are backward-compatible and non-breaking for running code.",
      "Provide explicit down/rollback migration scripts.",
    ],
    executionSteps: [
      "Draft up and down migration scripts.",
      "Apply migration locally and verify schema delta.",
      "Write data seeding or transformation scripts.",
    ],
    verificationRules: [
      "Test up and down migration cycles without data corruption.",
    ],
  },
  {
    name: "caching-redis",
    label: "Caching & Redis In-Memory Storage",
    category: "Databases & Storage",
    description: "Implement caching strategies, Redis key-value storage, pub/sub, rate limiting, and TTLs.",
    keywords: ["cache", "redis", "ttl", "memcached", "in-memory", "rate-limit", "eviction", "key-value"],
    guidelines: [
      "Set reasonable TTLs (Time-To-Live) on cached data.",
      "Implement cache invalidation strategies (Cache-Aside, Write-Through).",
    ],
    executionSteps: [
      "Define cache key naming schemas and TTL values.",
      "Implement cache lookup and fallback database fetching logic.",
      "Add cache eviction or invalidation on data mutations.",
    ],
    verificationRules: [
      "Verify cache hits, miss fallbacks, and TTL expiration.",
    ],
  },
];
