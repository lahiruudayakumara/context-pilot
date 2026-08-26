import type { SkillDefinition } from "../types.js";

export const securityAuthSkills: SkillDefinition[] = [
  {
    name: "security-audit",
    label: "Security Audit & Remediation",
    category: "Security & Auth",
    description: "Identify threat vectors, sanitize inputs, enforce strict access controls, and patch vulnerabilities.",
    keywords: ["security", "audit", "vulnerability", "threat", "protect", "cve", "owasp", "leak", "exploit"],
    guidelines: [
      "Enforce principle of least privilege and strict input validation.",
      "Prevent data leakage in logs, error messages, and task summaries.",
      "Use safe local handling for sensitive metadata.",
    ],
    executionSteps: [
      "Audit input boundaries, state mutations, and data persistence paths.",
      "Implement sanitization, validation, and defensive checks.",
      "Ensure failure modes fail securely.",
    ],
    verificationRules: [
      "Verify sanitized handling and secure failure handling paths.",
    ],
  },
  {
    name: "authentication-oauth",
    label: "Authentication & Authorization (JWT, OAuth2, RBAC)",
    category: "Security & Auth",
    description: "Implement secure user authentication, JWT tokens, OAuth2 providers, and RBAC permissions.",
    keywords: ["auth", "authentication", "authorization", "jwt", "oauth", "oauth2", "token", "rbac", "session", "passport"],
    guidelines: [
      "Never store plain text passwords; use bcrypt or Argon2 hashing.",
      "Validate JWT signatures, expiration, and issuer claims.",
      "Enforce RBAC role checks on protected endpoints.",
    ],
    executionSteps: [
      "Implement password hashing and token generation service.",
      "Set up auth verification middleware for routes/endpoints.",
      "Add permission and role evaluation logic.",
    ],
    verificationRules: [
      "Verify authenticated access, invalid token rejection, and forbidden role access.",
    ],
  },
  {
    name: "input-sanitization",
    label: "Input Validation & XSS/SQLi Prevention",
    category: "Security & Auth",
    description: "Prevent XSS, SQL injection, Command Injection, and CSRF attacks via strict input validation.",
    keywords: ["sanitization", "xss", "sqli", "injection", "csrf", "validator", "zod", "joi", "escape"],
    guidelines: [
      "Never interpolate raw user input directly into SQL queries or shell commands.",
      "Sanitize HTML strings before rendering in DOM.",
    ],
    executionSteps: [
      "Add strict schema validation (e.g. Zod/Joi) for all API body/query inputs.",
      "Use parameterized queries for database operations.",
      "Apply HTML escaping and anti-CSRF headers.",
    ],
    verificationRules: [
      "Verify malformed and malicious input payloads are rejected cleanly.",
    ],
  },
  {
    name: "encryption-crypto",
    label: "Cryptography & Data Protection",
    category: "Security & Auth",
    description: "Implement AES-256 encryption at rest, TLS in transit, secure hashing, and secrets management.",
    keywords: ["crypto", "encryption", "cipher", "hash", "secret", "vault", "tls", "ssl", "aes", "rsa"],
    guidelines: [
      "Use standard crypto libraries (e.g. `node:crypto`); do not write custom crypto routines.",
      "Never hardcode secrets or private keys in repository source files.",
    ],
    executionSteps: [
      "Configure environment variable secrets management.",
      "Implement AES-GCM encryption/decryption routines for sensitive payload storage.",
      "Add HMAC message signing verification.",
    ],
    verificationRules: [
      "Verify ciphertext output, decryption recovery, and HMAC signature checks.",
    ],
  },
];
