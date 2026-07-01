// src/components/DashboardView.jsx
import React from "react";
import { Heart, Cloud, Droplets, Brain, Sparkles, Sun, CloudRain } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import MapPanel from "./MapPanel.jsx";
import { RiskTag } from "./shared.jsx";

const CONDITION_ICON = {
  "Partly Cloudy": Cloud, "Clear Sky": Sun, "Light Rain": CloudRain,
  Overcast: Cloud, Hazy: Cloud, Sunny: Sun,
};

export default function DashboardView({
  selected, favorites, toggleFavorite, STATES, dataByState,
  selectedId, setSelectedId, hoveredId, setHoveredId, zoom, setZoom,
}) {
  const CondIcon = CONDITION_ICON[selected.condition] || Cloud;

  return (
    <div className="dash-grid">
      <div className="left-col">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{selected.name}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>India</div>
            </div>
            <Heart
              size={20}
              onClick={() => toggleFavorite(selected.id)}
              fill={favorites.has(selected.id) ? "#ef4444" : "none"}
              color={favorites.has(selected.id) ? "#ef4444" : "#64748b"}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: 10 }}><RiskTag risk={selected.risk} /></div>
        </div>

        <div className="card">
          <div className="card-row">
            <CondIcon size={26} color="#93c5fd" />
            <div>
              <div className="section-sub" style={{ marginTop: 0 }}>Weather</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{selected.temp}°C</div>
              <div className="section-sub" style={{ marginTop: 0 }}>{selected.condition}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right", fontSize: 12, color: "#94a3b8" }}>
              <div>Humidity</div>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{selected.humidity}%</div>
              <div style={{ marginTop: 6 }}>Wind</div>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{selected.wind} km/h</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-row">
            <Droplets size={24} color="#a78bfa" />
            <div>
              <div className="section-sub" style={{ marginTop: 0 }}>Air Quality Index</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: selected.aqi > 100 ? "#ef4444" : "#eab308" }}>
                {selected.aqi}
              </div>
              <div style={{ fontSize: 12, color: selected.aqi > 100 ? "#ef4444" : "#eab308", fontWeight: 700 }}>
                {selected.aqiLabel}
              </div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right", fontSize: 12, color: "#94a3b8" }}>
              <div>PM2.5</div>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{selected.pm25} µg/m³</div>
              <div style={{ marginTop: 6 }}>PM10</div>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{selected.pm10} µg/m³</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-row">
            <Brain size={24} color="#c084fc" />
            <div style={{ flex: 1 }}>
              <div className="section-sub" style={{ marginTop: 0 }}>AI Risk Score</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: selected.risk.color }}>{selected.score}</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>/100</span>
              </div>
              <div style={{ fontSize: 12, color: selected.risk.color, fontWeight: 700 }}>{selected.risk.label} Risk</div>
            </div>
            <div style={{ width: 90, height: 36 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selected.trend}>
                  <Line type="monotone" dataKey="risk" stroke={selected.risk.color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#60a5fa", fontWeight: 700, fontSize: 13 }}>
            <Sparkles size={16} /> AI Insights
          </div>
          <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 8, lineHeight: 1.6 }}>{selected.insight}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 11, color: "#64748b" }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#22c55e" }} />
            Last Updated: Just now
          </div>
        </div>
      </div>

      <div className="map-col">
        <MapPanel
          STATES={STATES} dataByState={dataByState}
          selectedId={selectedId} setSelectedId={setSelectedId}
          hoveredId={hoveredId} setHoveredId={setHoveredId}
          zoom={zoom} setZoom={setZoom}
        />
      </div>
    </div>
  );
}
