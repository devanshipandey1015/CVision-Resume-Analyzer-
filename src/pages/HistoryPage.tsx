import { useMemo, useState } from "react";
import type { AnalysisResult } from "../types";
import { EmptyState } from "../components/common/EmptyState";

interface HistoryPageProps {
  analyses: AnalysisResult[];
  onDelete: (id: string) => void;
}

export function HistoryPage({ analyses, onDelete }: HistoryPageProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AnalysisResult | null>(null);

  const filtered = useMemo(() => analyses.filter((a) => `${a.role} ${a.recommendation}`.toLowerCase().includes(query.toLowerCase())), [analyses, query]);
  if (!analyses.length) return <EmptyState title="No history yet" subtitle="Run an analysis and it will appear here." />;

  return (
    <div className="stack">
      <section className="card">
        <h3>Analysis History</h3>
        <input placeholder="Search by role or recommendation..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Role</th>
                <th>ATS</th>
                <th>Match</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td>{a.role}</td>
                  <td>{a.atsScore}</td>
                  <td>{a.keywordMatchScore}%</td>
                  <td>
                    <button className="ghost" onClick={() => setSelected(a)}>View</button>
                    <button className="danger" onClick={() => onDelete(a.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selected && (
        <section className="card">
          <h3>Saved Analysis Detail</h3>
          <p><strong>Recommendation:</strong> {selected.recommendation}</p>
          <p><strong>Top suggestions:</strong></p>
          <ul>{selected.suggestions.slice(0, 5).map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
      )}
    </div>
  );
}
