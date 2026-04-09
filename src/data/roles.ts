import type { RoleConfig } from "../types";

export const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Software Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Marketing Executive",
  "Custom Role",
];

export const ROLE_CONFIGS: Record<string, RoleConfig> = {
  "Frontend Developer": {
    label: "Frontend Developer",
    keywords: ["react", "typescript", "javascript", "html", "css", "redux", "api", "responsive", "web performance", "testing"],
    tools: ["vite", "webpack", "figma", "git", "jest"],
    softSkills: ["communication", "collaboration", "problem solving", "ownership"],
    sampleJD: "Build responsive UI in React, write reusable TypeScript components, integrate APIs, and improve performance.",
  },
  "Backend Developer": {
    label: "Backend Developer",
    keywords: ["node.js", "express", "rest", "database", "sql", "nosql", "authentication", "microservices", "api", "redis"],
    tools: ["docker", "postman", "aws", "git", "kubernetes"],
    softSkills: ["debugging", "ownership", "collaboration", "time management"],
    sampleJD: "Design scalable backend services, optimize databases, secure APIs, and maintain cloud deployments.",
  },
  "Data Analyst": {
    label: "Data Analyst",
    keywords: ["sql", "python", "excel", "data visualization", "dashboard", "statistics", "insights", "reporting", "etl", "kpi"],
    tools: ["power bi", "tableau", "pandas", "numpy", "google sheets"],
    softSkills: ["communication", "storytelling", "critical thinking", "stakeholder management"],
    sampleJD: "Analyze datasets, build dashboards, communicate insights, and support business decision making.",
  },
  "Software Engineer": {
    label: "Software Engineer",
    keywords: ["algorithms", "system design", "typescript", "python", "java", "api", "testing", "architecture", "scalability", "ci/cd"],
    tools: ["git", "docker", "aws", "jira", "linux"],
    softSkills: ["problem solving", "mentorship", "teamwork", "adaptability"],
    sampleJD: "Build reliable software systems, write testable code, and collaborate across product and engineering teams.",
  },
  "UI/UX Designer": {
    label: "UI/UX Designer",
    keywords: ["user research", "wireframes", "prototypes", "design system", "interaction design", "usability", "user journey", "accessibility"],
    tools: ["figma", "adobe xd", "sketch", "miro", "notion"],
    softSkills: ["empathy", "communication", "presentation", "collaboration"],
    sampleJD: "Create user-centered product experiences, design prototypes, and collaborate with engineering teams.",
  },
  "Product Manager": {
    label: "Product Manager",
    keywords: ["roadmap", "prioritization", "requirements", "stakeholder", "metrics", "go-to-market", "agile", "product strategy"],
    tools: ["jira", "confluence", "amplitude", "mixpanel", "figma"],
    softSkills: ["leadership", "communication", "decision making", "negotiation"],
    sampleJD: "Define product strategy, prioritize roadmap, and align teams with measurable goals.",
  },
  "Marketing Executive": {
    label: "Marketing Executive",
    keywords: ["seo", "sem", "campaign", "content marketing", "social media", "analytics", "lead generation", "branding"],
    tools: ["google analytics", "hubspot", "meta ads", "canva", "mailchimp"],
    softSkills: ["creativity", "communication", "planning", "stakeholder management"],
    sampleJD: "Run digital campaigns, optimize funnels, monitor metrics, and increase brand awareness.",
  },
};
