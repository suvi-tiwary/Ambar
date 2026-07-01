// src/components/shared.jsx
import React from "react";

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
      <div>
        <div className="section-title">{title}</div>
        {subtitle && <div className="section-sub">{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

export function StatItem({ icon: Icon, value, label, color }) {
  return (
    <div className="stat-item">
      <div className="stat-icon" style={{ background: color + "1f" }}>
        <Icon size={16} color={color} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export function MiniStat({ label, value }) {
  return (
    <div className="card">
      <div className="section-sub" style={{ marginTop: 0 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </div>
  );
}

export function Toggle({ checked, onChange }) {
  return (
    <button onClick={onChange} className={`toggle ${checked ? "on" : ""}`} aria-pressed={checked}>
      <span className="toggle-knob" />
    </button>
  );
}

export function RiskTag({ risk }) {
  return (
    <span className="risk-tag" style={{ background: risk.color + "26", color: risk.color, borderColor: risk.color + "55" }}>
      {risk.label} Risk
    </span>
  );
}
