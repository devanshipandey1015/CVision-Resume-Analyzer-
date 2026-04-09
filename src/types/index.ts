export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  joinedAt: string;
}

export interface AuthSession {
  userId: string;
}

export interface AnalyzeInput {
  role: string;
  customRole?: string;
  resumeText: string;
  jobDescription?: string;
}

export interface SectionResult {
  name: string;
  present: boolean;
}

export interface SkillBreakdown {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface ResumeStats {
  wordCount: number;
  projectCount: number;
  experienceMentions: number;
  certificationCount: number;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  role: string;
  customRole?: string;
  atsScore: number;
  keywordMatchScore: number;
  recommendation: "Needs Improvement" | "Good" | "Strong";
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
  actionVerbsFound: string[];
  weakWordsFound: string[];
  sections: SectionResult[];
  skillBreakdown: SkillBreakdown;
  stats: ResumeStats;
  resumeText: string;
  jobDescription?: string;
}

export interface RoleConfig {
  label: string;
  keywords: string[];
  tools: string[];
  softSkills: string[];
  sampleJD: string;
}
