// src/components/AlertsView.jsx
import React from "react";
import { Bell, ChevronRight } from "lucide-react";
import { SectionTitle, RiskTag } from "./shared.jsx";

export default function AlertsView({ highRiskStates, setSelectedId, setView }) {
  return (
    <div className="panel">
      <SectionTitle title="Active Alerts" subtitle={`${highRiskStates.length} states currently at High risk or above`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
        {highRiskStates.length === 0 && <div style={{ color: "#64748b", fontSize: 13 }}>No active high-risk alerts right now.</div>}
        {highRiskStates.map((s) => (
          <div key={s.id} className="alert-row" onClick={() => { setSelectedId(s.id); setView("dashboard"); }}>
            <Bell size={16} color={s.risk.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.insight.slice(0, 90)}…</div>
            </div>
            <RiskTag risk={s.risk} />
            <ChevronRight size={16} color="#475569" />
          </div>
        ))}
      </div>
    </div>
  );
}
