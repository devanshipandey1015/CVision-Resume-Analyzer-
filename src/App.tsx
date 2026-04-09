import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { SAMPLE_RESUME } from "./data/sampleData";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { AnalyzePage } from "./pages/AnalyzePage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ProfilePage } from "./pages/ProfilePage";
import type { AnalysisResult } from "./types";
import { updateUserName } from "./utils/auth";
import { getLS, setLS, StorageKeys } from "./utils/storage";

function App() {
  const auth = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [analyses, setAnalyses] = useState<AnalysisResult[]>(() => getLS(StorageKeys.analyses, []));

  useEffect(() => {
    const seeded = getLS(StorageKeys.seed, false);
    if (!seeded) {
      localStorage.setItem("cvision_sample_resume", SAMPLE_RESUME);
      setLS(StorageKeys.seed, true);
    }
  }, []);

  useEffect(() => {
    setLS(StorageKeys.analyses, analyses);
  }, [analyses]);

  const latest = useMemo(() => analyses[0], [analyses]);

  if (!auth.isLoggedIn || !auth.user) return <AuthPage onLogin={auth.login} onSignup={auth.signup} />;

  return (
    <Layout name={auth.user.name} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} onLogout={auth.logout}>
      <Routes>
        <Route path="/" element={<DashboardPage latest={latest} />} />
        <Route path="/analyze" element={<AnalyzePage latest={latest} onSave={(result) => setAnalyses((prev) => [result, ...prev])} />} />
        <Route path="/history" element={<HistoryPage analyses={analyses} onDelete={(id) => setAnalyses((prev) => prev.filter((a) => a.id !== id))} />} />
        <Route path="/insights" element={<InsightsPage analyses={analyses} />} />
        <Route path="/profile" element={<ProfilePage user={auth.user} analyses={analyses} onUpdateName={(name) => { if (name) { updateUserName(auth.user!.id, name); auth.refresh(); } }} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
