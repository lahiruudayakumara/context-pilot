import type { SkillDefinition } from "../types.js";

export const devopsCloudSkills: SkillDefinition[] = [
  {
    name: "devops-docker",
    label: "Docker Containerization & Compose",
    category: "DevOps & Cloud",
    description: "Write Dockerfiles, multi-stage builds, `.dockerignore` files, and `docker-compose.yml` setups.",
    keywords: ["docker", "container", "dockerfile", "docker-compose", "multi-stage", "image", "entrypoint"],
    guidelines: [
      "Use multi-stage Docker builds to minimize final image size.",
      "Run containers as non-root users for security.",
    ],
    executionSteps: [
      "Draft multi-stage Dockerfile with dependency caching layer.",
      "Configure `docker-compose.yml` services, volumes, and networks.",
      "Verify container build and startup efficiency.",
    ],
    verificationRules: [
      "Verify container build succeeds and service passes health checks.",
    ],
  },
  {
    name: "kubernetes",
    label: "Kubernetes Orchestration",
    category: "DevOps & Cloud",
    description: "Create Kubernetes manifests (Deployments, Services, Ingress, ConfigMaps, Secrets, Helm charts).",
    keywords: ["kubernetes", "k8s", "helm", "kubectl", "deployment", "service", "ingress", "pod", "configmap"],
    guidelines: [
      "Specify resource requests and limits for all containers.",
      "Configure readiness and liveness probes.",
    ],
    executionSteps: [
      "Define Kubernetes Deployment, Service, and ConfigMap YAML manifests.",
      "Configure ingress routing rules and TLS cert manager.",
      "Verify manifest validation with `kubectl apply --dry-run=client`.",
    ],
    verificationRules: [
      "Verify Kubernetes manifest syntax and resource limit definitions.",
    ],
  },
  {
    name: "ci-cd-pipeline",
    label: "CI/CD Pipeline Automation",
    category: "DevOps & Cloud",
    description: "Configure GitHub Actions, GitLab CI, or CircleCI workflows for automated testing and deployment.",
    keywords: ["ci", "cd", "pipeline", "github-actions", "workflow", "gitlab-ci", "deploy", "release"],
    guidelines: [
      "Cache package dependencies across workflow runs.",
      "Fail fast on failing tests or static analysis checks.",
    ],
    executionSteps: [
      "Create workflow YAML specification.",
      "Configure job steps for setup, lint, build, test, and release.",
      "Wire repository secrets for automated deployment.",
    ],
    verificationRules: [
      "Verify workflow YAML syntax and step execution order.",
    ],
  },
  {
    name: "aws-cloud",
    label: "AWS & Cloud Infrastructure (Serverless, S3, ECS)",
    category: "DevOps & Cloud",
    description: "Architect AWS services (Lambda, S3, DynamoDB, ECS, CloudFront, Terraform/CDK).",
    keywords: ["aws", "cloud", "lambda", "s3", "ecs", "cloudfront", "terraform", "cdk", "serverless", "iam"],
    guidelines: [
      "Apply least-privilege IAM policy roles.",
      "Use infrastructure as code (Terraform or AWS CDK).",
    ],
    executionSteps: [
      "Define infrastructure components using Terraform or CDK.",
      "Set up IAM policies, bucket access, and serverless handlers.",
      "Plan and deploy infrastructure resources.",
    ],
    verificationRules: [
      "Verify IaC syntax and resource security policies.",
    ],
  },
  {
    name: "monitoring-logging",
    label: "Monitoring, Logging & Observability",
    category: "DevOps & Cloud",
    description: "Implement structured JSON logging, Prometheus metrics, OpenTelemetry tracing, and Sentry tracking.",
    keywords: ["monitoring", "logging", "tracing", "opentelemetry", "prometheus", "grafana", "sentry", "winston", "pino"],
    guidelines: [
      "Use structured JSON format for machine-parseable log outputs.",
      "Sanitize PII and sensitive tokens from log outputs.",
    ],
    executionSteps: [
      "Configure structured logger with log-level filtering.",
      "Add request correlation IDs for distributed tracing.",
      "Wire exception tracking and metric counters.",
    ],
    verificationRules: [
      "Verify log formatting, correlation IDs, and error capture.",
    ],
  },
];
