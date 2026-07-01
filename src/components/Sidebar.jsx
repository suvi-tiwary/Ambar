// src/components/Sidebar.jsx
import React from "react";
import {
  LayoutGrid, Globe2, Cpu, SlidersHorizontal, GitCompare, BarChart3,
  TrendingUp, FileText, Bell, Bookmark, Settings, Crown, Bot,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, section: "Monitor" },
  { id: "map", label: "Map View", icon: Globe2, section: "Monitor" },
  { id: "twin", label: "Digital Twin", icon: Cpu, section: "Monitor" },
  { id: "whatif", label: "What-If Simulator", icon: SlidersHorizontal, section: "Predict" },
  { id: "advisor", label: "AI Advisor", icon: Bot, section: "Predict" },
  { id: "compare", label: "Compare States", icon: GitCompare, section: "Predict" },
  { id: "forecast", label: "Forecast", icon: TrendingUp, section: "Predict" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "Insights" },
  { id: "reports", label: "Reports", icon: FileText, section: "Insights" },
  { id: "alerts", label: "Alerts", icon: Bell, section: "Insights", badgeKey: "alerts" },
  { id: "saved", label: "Saved", icon: Bookmark, section: "Insights", badgeKey: "saved" },
  { id: "settings", label: "Settings", icon: Settings, section: "" },
];

export default function Sidebar({ view, setView, alertCount, savedCount, onUpgradeClick }) {
  let lastSection = null;
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-ai">AI</span>
        <div>
          <div className="brand-title">INDIA</div>
          <div className="brand-sub">CLIMATE TWIN</div>
        </div>
      </div>

      <nav className="nav">
        {NAV_ITEMS.map((it) => {
          const showHeader = it.section && it.section !== lastSection;
          lastSection = it.section;
          const badge = it.badgeKey === "alerts" ? alertCount : it.badgeKey === "saved" ? savedCount : null;
          return (
            <React.Fragment key={it.id}>
              {showHeader && <div className="nav-section-label">{it.section}</div>}
              <button
                onClick={() => setView(it.id)}
                className={`nav-btn ${view === it.id ? "active" : ""}`}
              >
                <it.icon size={17} />
                <span className="nav-label">{it.label}</span>
                {!!badge && <span className="nav-badge">{badge}</span>}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      <div className="upgrade-card">
        <div className="upgrade-head"><Crown size={15} /> Upgrade to Pro</div>
        <div className="upgrade-body">Unlock advanced analytics, 7-day forecast &amp; more.</div>
        <button className="upgrade-btn" onClick={onUpgradeClick}>Upgrade Now</button>
      </div>
    </aside>
  );
}
