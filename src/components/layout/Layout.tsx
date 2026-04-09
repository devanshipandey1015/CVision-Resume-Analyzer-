import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface LayoutProps {
  name: string;
  darkMode: boolean;
  onToggleDark: () => void;
  onLogout: () => void;
  children: ReactNode;
}

export function Layout({ name, darkMode, onToggleDark, onLogout, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content">
        <Topbar name={name} darkMode={darkMode} onToggleDark={onToggleDark} onLogout={onLogout} />
        {children}
      </main>
    </div>
  );
}
