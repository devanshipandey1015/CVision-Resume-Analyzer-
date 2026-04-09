import { Badge } from "../components/common/Badge";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { ProgressBar } from "../components/common/ProgressBar";
import type { AnalysisResult } from "../types";

export function DashboardPage({ latest }: { latest?: AnalysisResult }) {
  if (!latest) return <EmptyState title="No analysis yet" subtitle="Go to Analyze Resume to generate your first ATS dashboard." />;

  return (
    <div className="grid">
      <Card title="Overall ATS Score" right={<Badge>{latest.recommendation}</Badge>}>
        <h2>{latest.atsScore}/100</h2>
        <ProgressBar value={latest.atsScore} />
      </Card>
      <Card title="Role Match Score">
        <h2>{latest.keywordMatchScore}%</h2>
        <ProgressBar value={latest.keywordMatchScore} />
      </Card>
      <Card title="Resume Stats">
        <p>Word count: {latest.stats.wordCount}</p>
        <p>Projects: {latest.stats.projectCount}</p>
        <p>Experience mentions: {latest.stats.experienceMentions}</p>
        <p>Certifications: {latest.stats.certificationCount}</p>
      </Card>
      <Card title="Missing Keywords">
        <div className="chip-wrap">{latest.missingKeywords.length ? latest.missingKeywords.map((k) => <Badge key={k}>{k}</Badge>) : <p>No major keyword gaps.</p>}</div>
      </Card>
      <Card title="Section Completeness">
        {latest.sections.map((s) => (
          <p key={s.name}>
            {s.present ? "Yes" : "No"} - {s.name}
          </p>
        ))}
      </Card>
      <Card title="Suggestions">
        <ul>{latest.suggestions.map((s) => <li key={s}>{s}</li>)}</ul>
      </Card>
      <Card title="Action Verbs Found">
        <div className="chip-wrap">{latest.actionVerbsFound.length ? latest.actionVerbsFound.map((v) => <Badge key={v}>{v}</Badge>) : <p>No strong action verbs found.</p>}</div>
      </Card>
      <Card title="Skills Breakdown">
        <p>Technical: {latest.skillBreakdown.technical.join(", ") || "None"}</p>
        <p>Tools: {latest.skillBreakdown.tools.join(", ") || "None"}</p>
        <p>Soft Skills: {latest.skillBreakdown.soft.join(", ") || "None"}</p>
      </Card>
    </div>
  );
}
