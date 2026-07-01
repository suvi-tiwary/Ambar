// src/components/ForecastView.jsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SectionTitle } from "./shared.jsx";

export default function ForecastView({ selected, STATES, selectedId, setSelectedId }) {
  return (
    <div className="panel">
      <SectionTitle
        title={`7-Day Forecast — ${selected.name}`}
        subtitle="AI-predicted temperature & rainfall"
        action={
          <select className="select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {STATES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        }
      />
      <div style={{ height: 320, marginTop: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={selected.forecast}>
            <defs>
              <linearGradient id="tempG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rainG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, color: "#fff" }} />
            <Area type="monotone" dataKey="temp" stroke="#60a5fa" fill="url(#tempG)" strokeWidth={2} name="Temp (°C)" />
            <Area type="monotone" dataKey="rainfall" stroke="#a78bfa" fill="url(#rainG)" strokeWidth={2} name="Rainfall (mm)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 10 }}>
        Model confidence for this region: <strong style={{ color: "#cbd5e1" }}>{selected.modelConfidence}%</strong> ·
        validated against IMD observations at ±{selected.validationRMSE}°C RMSE.
      </div>
    </div>
  );
}
