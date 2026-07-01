// src/components/WhatIfSimulator.jsx
import React, { useMemo, useState } from "react";
import { SlidersHorizontal, RotateCcw, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SectionTitle } from "./shared.jsx";
import { riskLevel } from "../data/states.js";

export default function WhatIfSimulator({ selected, STATES, selectedId, setSelectedId }) {
  const [tempDelta, setTempDelta] = useState(0);     // -5 .. +5 °C
  const [rainDelta, setRainDelta] = useState(0);      // -50 .. +100 %

  const projected = useMemo(() => {
    // Simple, transparent heuristic model — every +1°C nudges risk up,
    // rainfall deficits raise drought risk, rainfall surplus raises flood risk.
    const tempImpact = tempDelta * 6.5;
    const rainImpact = rainDelta < 0 ? Math.abs(rainDelta) * 0.55 : rainDelta * 0.35;
    const score = Math.max(2, Math.min(100, Math.round(selected.score + tempImpact + rainImpact)));
    const aqi = Math.max(10, Math.round(selected.aqi + tempDelta * 4 - rainDelta * 0.6));
    const temp = Math.round((selected.temp + tempDelta) * 10) / 10;
    const rainfall = Math.max(0, Math.round(selected.rainfall * (1 + rainDelta / 100)));
    return { score, aqi, temp, rainfall, risk: riskLevel(score) };
  }, [selected, tempDelta, rainDelta]);

  const chartData = selected.forecast.map((f, i) => ({
    day: f.day,
    baseline: f.temp,
    scenario: Math.round((f.temp + tempDelta) * 10) / 10,
  }));

  const reset = () => { setTempDelta(0); setRainDelta(0); };
  const delta = projected.score - selected.score;

  return (
    <div className="panel">
      <SectionTitle
        title="What-If Scenario Simulator"
        subtitle="Drag the sliders to explore how temperature & rainfall shifts would reshape regional climate risk"
        action={
          <select className="select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {STATES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, marginTop: 18 }}>
        {/* Controls */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 13.5, color: "#93c5fd" }}>
            <SlidersHorizontal size={16} /> Scenario Controls
          </div>

          <div className="slider-row">
            <div className="slider-label">
              <span>Temperature change</span>
              <span style={{ color: tempDelta > 0 ? "#ef4444" : tempDelta < 0 ? "#60a5fa" : "#94a3b8", fontWeight: 700 }}>
                {tempDelta > 0 ? "+" : ""}{tempDelta}°C
              </span>
            </div>
            <input type="range" min={-5} max={5} step={0.5} value={tempDelta}
              onChange={(e) => setTempDelta(parseFloat(e.target.value))} />
          </div>

          <div className="slider-row">
            <div className="slider-label">
              <span>Rainfall change</span>
              <span style={{ color: rainDelta > 0 ? "#60a5fa" : rainDelta < 0 ? "#f97316" : "#94a3b8", fontWeight: 700 }}>
                {rainDelta > 0 ? "+" : ""}{rainDelta}%
              </span>
            </div>
            <input type="range" min={-50} max={100} step={5} value={rainDelta}
              onChange={(e) => setRainDelta(parseInt(e.target.value))} />
          </div>

          <button className="btn" onClick={reset}><RotateCcw size={14} /> Reset to current conditions</button>

          {Math.abs(delta) >= 15 && (
            <div style={{ display: "flex", gap: 8, fontSize: 12, color: "#fca5a5", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 10, padding: 10 }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              This scenario shifts {selected.name} into a meaningfully {delta > 0 ? "higher" : "lower"} risk band — useful as an early-warning input for planners.
            </div>
          )}
        </div>

        {/* Projection results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="grid-3">
            <ScenarioStat label="Projected Risk Score" value={`${projected.score}/100`} sub={projected.risk.label} color={projected.risk.color} />
            <ScenarioStat label="Projected Temp" value={`${projected.temp}°C`} sub={`baseline ${selected.temp}°C`} color="#60a5fa" />
            <ScenarioStat label="Projected AQI" value={projected.aqi} sub={`baseline ${selected.aqi}`} color="#a78bfa" />
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>7-Day Temperature: Baseline vs Scenario</div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#fff" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="baseline" stroke="#475569" strokeWidth={2} dot={false} name="Baseline" />
                  <Line type="monotone" dataKey="scenario" stroke="#ef4444" strokeWidth={2.5} dot={false} name="Scenario" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioStat({ label, value, sub, color }) {
  return (
    <div className="card">
      <div className="section-sub" style={{ marginTop: 0 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color, marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>{sub}</div>
    </div>
  );
}
