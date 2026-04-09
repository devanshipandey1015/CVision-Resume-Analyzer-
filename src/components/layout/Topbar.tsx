interface TopbarProps {
  name: string;
  darkMode: boolean;
  onToggleDark: () => void;
  onLogout: () => void;
}

export function Topbar({ name, darkMode, onToggleDark, onLogout }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h1>CVision - Resume Analyzer Dashboard</h1>
        <p>Welcome back, {name}</p>
      </div>
      <div className="topbar-actions">
        <button onClick={onToggleDark}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        <button className="danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
