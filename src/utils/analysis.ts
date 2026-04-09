import { ROLE_CONFIGS } from "../data/roles";
import type { AnalysisResult, AnalyzeInput, SectionResult, SkillBreakdown } from "../types";

const REQUIRED_SECTIONS = ["summary", "education", "skills", "projects", "experience", "certifications", "achievements", "contact"];
const ACTION_VERBS = ["built", "developed", "led", "improved", "designed", "implemented", "optimized", "delivered", "launched", "managed"];
const WEAK_WORDS = ["hardworking", "passionate", "responsible for", "worked on", "helped", "good at", "team player"];

function toLower(text: string): string {
  return text.toLowerCase();
}

function includesPhrase(text: string, phrase: string): boolean {
  return toLower(text).includes(phrase.toLowerCase());
}

function countMatches(text: string, words: string[]): string[] {
  return words.filter((w) => includesPhrase(text, w));
}

function detectSections(text: string): SectionResult[] {
  return REQUIRED_SECTIONS.map((s) => ({ name: s, present: includesPhrase(text, s) }));
}

function detectSkills(text: string, role: string): SkillBreakdown {
  const cfg = ROLE_CONFIGS[role];
  if (!cfg) return { technical: [], tools: [], soft: [] };
  return {
    technical: countMatches(text, cfg.keywords),
    tools: countMatches(text, cfg.tools),
    soft: countMatches(text, cfg.softSkills),
  };
}

function getStats(text: string) {
  return {
    wordCount: text.trim().split(/\s+/).filter(Boolean).length,
    projectCount: (text.match(/project/gi) || []).length,
    experienceMentions: (text.match(/experience/gi) || []).length,
    certificationCount: (text.match(/certification|certified/gi) || []).length,
  };
}

export function analyzeResume(input: AnalyzeInput): AnalysisResult {
  const resume = input.resumeText.trim();
  const combined = `${resume} ${input.jobDescription ?? ""}`;
  const roleName = input.role === "Custom Role" ? input.customRole || "Custom Role" : input.role;
  const roleCfg = ROLE_CONFIGS[input.role];
  const targetKeywords = roleCfg ? [...roleCfg.keywords, ...roleCfg.tools, ...roleCfg.softSkills] : [];

  const sections = detectSections(resume);
  const sectionPresent = sections.filter((s) => s.present).length;

  const matchedKeywords = countMatches(combined, targetKeywords);
  const missingKeywords = targetKeywords.filter((k) => !matchedKeywords.includes(k)).slice(0, 12);
  const keywordMatchScore = targetKeywords.length ? Math.round((matchedKeywords.length / targetKeywords.length) * 100) : 50;

  const actionVerbsFound = countMatches(resume, ACTION_VERBS);
  const weakWordsFound = countMatches(resume, WEAK_WORDS);
  const skillBreakdown = detectSkills(resume, input.role);
  const stats = getStats(resume);

  const hasEmail = /\S+@\S+\.\S+/.test(resume);
  const hasPhone = /(\+\d{1,3}[-\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(resume);
  const hasLinkedIn = includesPhrase(resume, "linkedin");
  const hasGithub = includesPhrase(resume, "github");
  const contactScore = [hasEmail, hasPhone, hasLinkedIn, hasGithub].filter(Boolean).length / 4;

  const projectQuality = Math.min(1, stats.projectCount / 2) + (includesPhrase(resume, "react") || includesPhrase(resume, "python") ? 0.2 : 0) + ((resume.match(/%/g) || []).length > 0 ? 0.2 : 0);
  const experienceQuality = Math.min(1, stats.experienceMentions / 2) + (actionVerbsFound.length >= 3 ? 0.2 : 0);
  const lengthScore = stats.wordCount >= 250 && stats.wordCount <= 900 ? 1 : 0.5;
  const weakPenalty = Math.min(0.2, weakWordsFound.length * 0.03);

  const weighted =
    sectionPresent / sections.length * 20 +
    keywordMatchScore * 0.35 +
    Math.min(100, actionVerbsFound.length * 10) * 0.1 +
    Math.min(100, projectQuality * 100) * 0.12 +
    Math.min(100, experienceQuality * 100) * 0.12 +
    contactScore * 100 * 0.08 +
    lengthScore * 100 * 0.03;

  const atsScore = Math.max(0, Math.min(100, Math.round(weighted - weakPenalty * 100)));
  const recommendation = atsScore >= 80 ? "Strong" : atsScore >= 60 ? "Good" : "Needs Improvement";

  const strengths: string[] = [];
  if (sectionPresent >= 6) strengths.push("Most core resume sections are present.");
  if (keywordMatchScore >= 65) strengths.push("Good keyword alignment with target role.");
  if (actionVerbsFound.length >= 4) strengths.push("Strong use of action-oriented language.");
  if (contactScore >= 0.75) strengths.push("Contact details look complete for recruiters.");

  const suggestions: string[] = [];
  if (sectionPresent < 6) suggestions.push("Add missing sections like Certifications, Achievements, or a crisp Summary.");
  if (keywordMatchScore < 60) suggestions.push("Include more role-specific keywords from the job description.");
  if (missingKeywords.length) suggestions.push(`Consider adding these keywords naturally: ${missingKeywords.slice(0, 5).join(", ")}.`);
  if (actionVerbsFound.length < 3) suggestions.push("Use stronger action verbs to describe impact (built, optimized, led).");
  if (weakWordsFound.length > 0) suggestions.push("Replace weak phrases with measurable outcomes and clear ownership.");
  if (!hasLinkedIn || !hasGithub) suggestions.push("Add professional links like LinkedIn and GitHub in your contact section.");
  if (stats.wordCount < 250) suggestions.push("Resume looks short. Expand projects and achievements with measurable impact.");

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    role: roleName,
    customRole: input.customRole,
    atsScore,
    keywordMatchScore,
    recommendation,
    missingKeywords,
    strengths,
    suggestions,
    actionVerbsFound,
    weakWordsFound,
    sections,
    skillBreakdown,
    stats,
    resumeText: input.resumeText,
    jobDescription: input.jobDescription,
  };
}
