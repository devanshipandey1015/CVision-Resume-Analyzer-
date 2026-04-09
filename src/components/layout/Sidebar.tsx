import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/analyze", label: "Analyze Resume" },
  { to: "/history", label: "History" },
  { to: "/insights", label: "Insights" },
  { to: "/profile", label: "Profile" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>CVision</h2>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}
