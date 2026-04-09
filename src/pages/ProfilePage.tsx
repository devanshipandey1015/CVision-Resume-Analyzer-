import { useMemo, useState } from "react";
import type { AnalysisResult, User } from "../types";

interface ProfileProps {
  user: User;
  analyses: AnalysisResult[];
  onUpdateName: (name: string) => void;
}

export function ProfilePage({ user, analyses, onUpdateName }: ProfileProps) {
  const [name, setName] = useState(user.name);
  const avgScore = useMemo(() => (analyses.length ? Math.round(analyses.reduce((sum, a) => sum + a.atsScore, 0) / analyses.length) : 0), [analyses]);

  return (
    <section className="card">
      <h3>Profile</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.joinedAt).toLocaleDateString()}</p>
      <p><strong>Total resumes analyzed:</strong> {analyses.length}</p>
      <p><strong>Average ATS score:</strong> {avgScore}</p>
      <label>Edit name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => onUpdateName(name.trim())}>Save Name</button>
    </section>
  );
}
