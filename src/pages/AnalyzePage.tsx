import { useState } from "react";
import { Badge } from "../components/common/Badge";
import { ProgressBar } from "../components/common/ProgressBar";
import { ROLE_CONFIGS, ROLE_OPTIONS } from "../data/roles";
import { SAMPLE_RESUME } from "../data/sampleData";
import { analyzeResume } from "../utils/analysis";
import { extractTextFromPdf } from "../utils/pdf";
import type { AnalysisResult } from "../types";

interface AnalyzePageProps {
  onSave: (result: AnalysisResult) => void;
  latest?: AnalysisResult;
}

export function AnalyzePage({ onSave, latest }: AnalyzePageProps) {
  const [role, setRole] = useState("Frontend Developer");
  const [customRole, setCustomRole] = useState("");
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(ROLE_CONFIGS["Frontend Developer"].sampleJD);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | undefined>(latest);

  const onFileUpload = async (file?: File) => {
    if (!file) return;
    try {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const isTxt = file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt");

      if (!isPdf && !isTxt) {
        setError("Only .txt and .pdf files are supported.");
        return;
      }

      const text = isPdf ? await extractTextFromPdf(file) : await file.text();
      if (!text.trim()) {
        setError("We could not extract readable text from this file.");
        return;
      }

      setError("");
      setResumeText(text);
    } catch {
      setError("Failed to read the uploaded file. Please try another .txt or .pdf file.");
    }
  };

  const runAnalysis = () => {
    if (!resumeText.trim()) {
      setError("Please paste resume content or upload a .txt/.pdf file.");
      return;
    }
    setError("");
    const analysis = analyzeResume({ role, customRole, resumeText, jobDescription });
    setResult(analysis);
    onSave(analysis);
  };

  return (
    <div className="stack">
      <section className="card">
        <h3>Analyze Resume</h3>
        <label>Target role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLE_OPTIONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        {role === "Custom Role" && <input placeholder="Enter custom role" value={customRole} onChange={(e) => setCustomRole(e.target.value)} />}
        <label>Upload resume (.txt or .pdf)</label>
        <input type="file" accept=".txt,.pdf,text/plain,application/pdf" onChange={(e) => onFileUpload(e.target.files?.[0])} />
        <label>Paste resume text</label>
        <textarea rows={14} value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
        <label>Target job description (optional)</label>
        <textarea rows={7} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button onClick={runAnalysis}>Run Analysis</button>
      </section>
      <section className="card">
        <h3>Analysis Result</h3>
        {!result ? (
          <p>No result yet. Run analysis to see ATS score, keyword gaps, and suggestions here.</p>
        ) : (
          <div className="stack">
            <div>
              <p><strong>Role:</strong> {result.role}</p>
              <p><strong>Recommendation:</strong> <Badge>{result.recommendation}</Badge></p>
            </div>
            <div>
              <p><strong>ATS Score:</strong> {result.atsScore}/100</p>
              <ProgressBar value={result.atsScore} />
            </div>
            <div>
              <p><strong>Match Score:</strong> {result.keywordMatchScore}%</p>
              <ProgressBar value={result.keywordMatchScore} />
            </div>
            <div>
              <p><strong>Missing keywords:</strong></p>
              <div className="chip-wrap">
                {result.missingKeywords.length ? result.missingKeywords.slice(0, 10).map((k) => <Badge key={k}>{k}</Badge>) : <p>No major missing keywords.</p>}
              </div>
            </div>
            <div>
              <p><strong>Top suggestions:</strong></p>
              <ul>{result.suggestions.slice(0, 5).map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
