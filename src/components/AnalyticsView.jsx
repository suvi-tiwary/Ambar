// src/components/AnalyticsView.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SectionTitle, MiniStat } from "./shared.jsx";
import { riskLevel } from "../data/states.js";

export default function AnalyticsView({ STATES, dataByState }) {
  const chartData = STATES.map((s) => ({ name: s.name.split(" ")[0], risk: dataByState.get(s.id).score }))
    .sort((a, b) => b.risk - a.risk).slice(0, 14);

  return (
    <div className="panel">
      <SectionTitle title="Risk Score by State" subtitle="Top 14 states by current AI risk score" />
      <div style={{ height: 360, marginTop: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} interval={0} angle={-35} textAnchor="end" height={60} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#fff" }} />
            <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
              {chartData.map((d, i) => <Cell key={i} fill={riskLevel(d.risk).color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <MiniStat label="Average Risk" value={Math.round(STATES.reduce((a, s) => a + dataByState.get(s.id).score, 0) / STATES.length)} />
        <MiniStat label="Avg AQI" value={Math.round(STATES.reduce((a, s) => a + dataByState.get(s.id).aqi, 0) / STATES.length)} />
        <MiniStat label="Avg Temp" value={`${Math.round(STATES.reduce((a, s) => a + dataByState.get(s.id).temp, 0) / STATES.length)}°C`} />
      </div>
    </div>
  );
}
