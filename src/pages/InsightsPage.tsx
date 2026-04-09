import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import type { AnalysisResult } from "../types";

export function InsightsPage({ analyses }: { analyses: AnalysisResult[] }) {
  const scoreTrend = useMemo(
    () =>
      analyses.slice().reverse().map((a) => ({
        date: new Date(a.createdAt).toLocaleDateString(),
        ats: a.atsScore,
        match: a.keywordMatchScore,
      })),
    [analyses],
  );

  const roleWise = useMemo(() => Object.entries(analyses.reduce<Record<string, number>>((acc, a) => ({ ...acc, [a.role]: (acc[a.role] || 0) + 1 }), {})).map(([name, value]) => ({ name, value })), [analyses]);
  const missingKeywords = useMemo(() => Object.entries(analyses.flatMap((a) => a.missingKeywords).reduce<Record<string, number>>((acc, k) => ({ ...acc, [k]: (acc[k] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([keyword, count]) => ({ keyword, count })), [analyses]);

  if (!analyses.length) return <EmptyState title="No insights yet" subtitle="Run a few analyses to unlock trends and charts." />;

  return (
    <div className="grid">
      <Card title="Resume Score Trend">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={scoreTrend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="ats" stroke="#6366f1" /></LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Most Common Missing Keywords">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={missingKeywords}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="keyword" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#14b8a6" /></BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Role-wise Analysis History">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart><Tooltip /><Pie data={roleWise} dataKey="value" nameKey="name" outerRadius={80} fill="#8b5cf6" /></PieChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Section Completion Trend">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={analyses.map((a) => ({ date: new Date(a.createdAt).toLocaleDateString(), completion: Math.round((a.sections.filter((s) => s.present).length / a.sections.length) * 100) }))}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="completion" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
