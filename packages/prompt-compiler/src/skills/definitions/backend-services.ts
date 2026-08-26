import type { SkillDefinition } from "../types.js";

export const backendServicesSkills: SkillDefinition[] = [
  {
    name: "backend-api",
    label: "Backend API Design & Implementation",
    category: "Backend & Services",
    description: "Build robust, scalable backend server logic, controllers, and service layers.",
    keywords: ["backend", "api", "server", "express", "fastify", "nest", "controller", "service", "route"],
    guidelines: [
      "Keep controllers lightweight; delegate logic to service layers.",
      "Return standardized HTTP status codes and response bodies.",
      "Implement robust request body validation.",
    ],
    executionSteps: [
      "Define request/response contracts and DTO schemas.",
      "Implement router middleware, controllers, and service handlers.",
      "Attach request validation and centralized exception handling.",
    ],
    verificationRules: [
      "Test endpoint handlers with mock payloads and verify status responses.",
    ],
  },
  {
    name: "rest-api",
    label: "RESTful API Standards",
    category: "Backend & Services",
    description: "Design clean RESTful resource URIs, HTTP verbs, pagination, and status handling.",
    keywords: ["rest", "restful", "http", "post", "get", "put", "delete", "endpoint", "status-code"],
    guidelines: [
      "Use noun-based resource URIs (`/api/v1/invoices`).",
      "Use HTTP verbs correctly (GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal).",
    ],
    executionSteps: [
      "Design API resource endpoints and HTTP verb mappings.",
      "Implement query filtering, sorting, and cursor/page pagination.",
      "Add standardized error JSON responses.",
    ],
    verificationRules: [
      "Verify REST URI compliance and standard HTTP status code returns.",
    ],
  },
  {
    name: "graphql-api",
    label: "GraphQL Schema & Resolvers",
    category: "Backend & Services",
    description: "Implement GraphQL schemas, query/mutation resolvers, dataloaders, and N+1 query prevention.",
    keywords: ["graphql", "schema", "resolver", "mutation", "query", "dataloader", "apollo", "type-graphql"],
    guidelines: [
      "Avoid N+1 query problems using DataLoader batching.",
      "Maintain clear GraphQL schema type definitions.",
    ],
    executionSteps: [
      "Define GraphQL type definitions and mutation schemas.",
      "Implement resolvers with batch loading handlers.",
      "Add validation for GraphQL query inputs.",
    ],
    verificationRules: [
      "Verify GraphQL query responses and DataLoader batching efficiency.",
    ],
  },
  {
    name: "microservices",
    label: "Microservices Architecture",
    category: "Backend & Services",
    description: "Architect distributed microservices, event queues, message brokers (Kafka, RabbitMQ, NATS).",
    keywords: ["microservice", "distributed", "event-driven", "kafka", "rabbitmq", "nats", "pubsub", "message"],
    guidelines: [
      "Ensure service independence and loose coupling.",
      "Use idempotent message processing in event handlers.",
    ],
    executionSteps: [
      "Define message payload contracts and event topics.",
      "Implement event producer and consumer handlers.",
      "Add retry queues and dead-letter queue (DLQ) processing.",
    ],
    verificationRules: [
      "Verify message serialization, event dispatch, and error recovery.",
    ],
  },
  {
    name: "websocket-realtime",
    label: "WebSocket & Realtime Communication",
    category: "Backend & Services",
    description: "Build bidirectional realtime features using WebSockets, Socket.io, or SSE (Server-Sent Events).",
    keywords: ["websocket", "ws", "socket", "realtime", "sse", "broadcast", "channel", "push"],
    guidelines: [
      "Manage client socket connections and reconnection lifecycles gracefully.",
      "Authenticate socket connections on initial handshake.",
    ],
    executionSteps: [
      "Set up WebSocket server gateway and room/channel handlers.",
      "Implement message broadcasting and heartbeat ping/pong handlers.",
      "Add connection drop and reconnect state recovery.",
    ],
    verificationRules: [
      "Verify connection handshake, event broadcasting, and disconnect cleanup.",
    ],
  },
  {
    name: "grpc-protobuf",
    label: "gRPC & Protocol Buffers",
    category: "Backend & Services",
    description: "Implement high-performance RPC services using Protobuf schemas and gRPC servers.",
    keywords: ["grpc", "protobuf", "proto", "rpc", "service-definition", "binary-protocol"],
    guidelines: [
      "Maintain backward compatibility in `.proto` field numbers.",
      "Use streaming RPCs for large data transfers.",
    ],
    executionSteps: [
      "Define `.proto` service interfaces and message types.",
      "Generate stub code and implement service handlers.",
      "Add gRPC client connection pooling.",
    ],
    verificationRules: [
      "Verify proto compilation and gRPC service method execution.",
    ],
  },
];
