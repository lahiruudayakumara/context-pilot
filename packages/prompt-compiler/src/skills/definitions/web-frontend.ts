import type { SkillDefinition } from "../types.js";

export const webFrontendSkills: SkillDefinition[] = [
  {
    name: "frontend-ui",
    label: "Frontend UI & Component Design",
    category: "Web & Frontend",
    description: "Build interactive, responsive, and aesthetically pleasing user interfaces.",
    keywords: ["frontend", "ui", "component", "widget", "layout", "view", "interface", "design"],
    guidelines: [
      "Keep UI state local and component boundaries modular.",
      "Ensure responsive layouts adapt smoothly across viewports.",
      "Maintain consistent styling and component props APIs.",
    ],
    executionSteps: [
      "Define component props interface and component tree.",
      "Implement rendering logic and interactive state handlers.",
      "Apply component styles and responsive breakpoint rules.",
    ],
    verificationRules: [
      "Verify visual fidelity, prop types, and responsive rendering.",
    ],
  },
  {
    name: "react-nextjs",
    label: "React & Next.js Architecture",
    category: "Web & Frontend",
    description: "Develop modern React app features using hooks, server components, and Next.js router rules.",
    keywords: ["react", "next", "nextjs", "jsx", "tsx", "hook", "usecontext", "usestate", "useeffect", "server-component"],
    guidelines: [
      "Follow React hooks rules and avoid unneeded re-renders.",
      "Leverage server components for data fetching where applicable.",
      "Keep client components lightweight.",
    ],
    executionSteps: [
      "Structure page routes, layouts, and reusable components.",
      "Manage client hooks state and server fetching logic.",
      "Ensure strict TypeScript prop typing.",
    ],
    verificationRules: [
      "Verify component lifecycle, state updates, and build check compilation.",
    ],
  },
  {
    name: "state-management",
    label: "State Management & Data Flow",
    category: "Web & Frontend",
    description: "Architect predictable state management (Zustand, Redux, Context API, MobX).",
    keywords: ["state", "store", "redux", "zustand", "context", "mobx", "action", "reducer", "selector"],
    guidelines: [
      "Avoid mutating state directly; use immutable state transitions.",
      "Normalize state structures for fast selector lookups.",
      "Keep UI components decoupled from state storage implementation.",
    ],
    executionSteps: [
      "Define store schema, initial state, and state mutator actions.",
      "Wire hooks and selectors into consumer components.",
      "Add unit tests for store reducers/actions.",
    ],
    verificationRules: [
      "Verify deterministic state transitions in store unit tests.",
    ],
  },
  {
    name: "css-styling",
    label: "CSS & Styling Systems",
    category: "Web & Frontend",
    description: "Style interfaces using Vanilla CSS, TailwindCSS, CSS Modules, or Styled Components.",
    keywords: ["css", "styles", "tailwind", "styled-components", "flexbox", "grid", "responsive", "theme"],
    guidelines: [
      "Use CSS custom properties for color palettes and spacing tokens.",
      "Maintain clean class names and layout flexbox/grid containers.",
    ],
    executionSteps: [
      "Configure design tokens, themes, and color variables.",
      "Implement element layout rules, transitions, and media queries.",
    ],
    verificationRules: [
      "Check visual presentation across responsive breakpoints.",
    ],
  },
  {
    name: "accessibility-a11y",
    label: "Accessibility (a11y) & Usability",
    category: "Web & Frontend",
    description: "Ensure WCAG compliance, keyboard navigation, screen reader support, and ARIA attributes.",
    keywords: ["a11y", "accessibility", "aria", "wcag", "keyboard", "screen-reader", "contrast", "focus"],
    guidelines: [
      "Provide semantic HTML elements (`<nav>`, `<main>`, `<button>`).",
      "Ensure focus states are visible and keyboard navigation works.",
      "Add ARIA attributes and alt descriptions.",
    ],
    executionSteps: [
      "Audit DOM elements for semantic correctness.",
      "Ensure visible focus rings and keyboard tab order.",
      "Test screen reader labels and contrast ratios.",
    ],
    verificationRules: [
      "Pass automated a11y lints and keyboard navigation tests.",
    ],
  },
  {
    name: "web-performance",
    label: "Web Performance & Core Web Vitals",
    category: "Web & Frontend",
    description: "Optimize bundle size, lazy loading, image compression, and Core Web Vitals (LCP, FID, CLS).",
    keywords: ["lcp", "fid", "cls", "web-vitals", "bundle", "lazy", "code-splitting", "lighthouse"],
    guidelines: [
      "Code-split routes and heavy component libraries.",
      "Minimize render-blocking CSS/JS resources.",
    ],
    executionSteps: [
      "Profile bundle size and chunk allocations.",
      "Implement dynamic imports (`React.lazy` / `next/dynamic`).",
      "Optimize static assets and image formats.",
    ],
    verificationRules: [
      "Verify bundle reduction and Core Web Vitals score improvements.",
    ],
  },
];
