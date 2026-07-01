// src/components/SavedView.jsx
import React from "react";
import { Heart } from "lucide-react";
import { SectionTitle } from "./shared.jsx";

export default function SavedView({ favorites, STATES, dataByState, toggleFavorite, setSelectedId, setView }) {
  const list = STATES.filter((s) => favorites.has(s.id)).map((s) => dataByState.get(s.id));
  return (
    <div className="panel">
      <SectionTitle title="Saved States" subtitle="Your bookmarked regions for quick access" />
      <div className="grid-cards" style={{ marginTop: 12 }}>
        {list.length === 0 && <div style={{ color: "#64748b", fontSize: 13 }}>Tap the heart icon on any state to save it here.</div>}
        {list.map((s) => (
          <div key={s.id} className="card" style={{ cursor: "pointer" }} onClick={() => { setSelectedId(s.id); setView("dashboard"); }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 700 }}>{s.name}</div>
              <Heart size={16} fill="#ef4444" color="#ef4444"
                onClick={(e) => { e.stopPropagation(); toggleFavorite(s.id); }} style={{ cursor: "pointer" }} />
            </div>
            <div style={{ fontSize: 13, color: s.risk.color, fontWeight: 700, marginTop: 6 }}>{s.risk.label} Risk · {s.score}/100</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{s.temp}°C · AQI {s.aqi}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
