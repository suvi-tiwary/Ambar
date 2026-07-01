// src/components/MapPanel.jsx
import React from "react";
import { Plus, Minus, Crosshair, Home } from "lucide-react";

export default function MapPanel({ STATES, dataByState, selectedId, setSelectedId, hoveredId, setHoveredId, zoom, setZoom, tall }) {
  const hovered = hoveredId ? dataByState.get(hoveredId) : null;
  return (
    <div className="map-wrap" style={tall ? { height: "calc(100vh - 230px)" } : undefined}>
      <svg
        viewBox="0 0 100 90"
        style={{ width: "100%", height: "100%", transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform .2s" }}
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="90" fill="url(#bgGlow)" />
        {STATES.map((s) => {
          const d = dataByState.get(s.id);
          const isSel = s.id === selectedId;
          const isHov = s.id === hoveredId;
          return (
            <g
              key={s.id}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(s.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={s.x} y={s.y} width={s.w} height={s.h} rx={s.w * 0.22}
                style={{
                  fill: d.risk.color,
                  opacity: isSel ? 0.95 : isHov ? 0.85 : 0.55,
                  stroke: isSel ? "#ffffff" : isHov ? d.risk.color : "#0f172a",
                  strokeWidth: isSel ? 0.45 : 0.25,
                  filter: isSel || isHov ? `drop-shadow(0 0 4px ${d.risk.color})` : "none",
                  transition: "all .15s",
                }}
              />
              {(s.w > 5 || isSel || isHov) && (
                <text
                  x={s.x + s.w / 2} y={s.y + s.h / 2}
                  fontSize={isSel || isHov ? 2.1 : 1.7}
                  fill="#f1f5f9" textAnchor="middle" dominantBaseline="middle"
                  style={{ fontWeight: 600, pointerEvents: "none", textShadow: "0 1px 2px rgba(0,0,0,.8)" }}
                >
                  {s.name.length > 14 && s.w < 9 ? s.name.split(" ")[0] : s.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="map-tooltip">
          <div style={{ fontWeight: 700 }}>{hovered.name}</div>
          <div style={{ color: hovered.risk.color, fontSize: 12, fontWeight: 700 }}>{hovered.risk.label} Risk</div>
        </div>
      )}

      <div className="map-controls">
        <button className="map-btn" onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}><Plus size={15} /></button>
        <button className="map-btn" onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}><Minus size={15} /></button>
        <button className="map-btn" onClick={() => setZoom(1)}><Crosshair size={15} /></button>
      </div>
      <button className="map-btn ghost"><Home size={15} /></button>

      <div className="legend">
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>AI Risk Level</div>
        {[
          ["Low (0-30)", "#22c55e"], ["Medium (30-60)", "#eab308"],
          ["High (60-80)", "#f97316"], ["Very High (80-100)", "#ef4444"],
          ["Critical (100+)", "#a855f7"],
        ].map(([label, color]) => (
          <div key={label} className="legend-row">
            <span className="legend-dot" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
