// src/components/CompareView.jsx
import React, { useState } from "react";
import { SectionTitle, RiskTag } from "./shared.jsx";

export default function CompareView({ STATES, dataByState }) {
  const [aId, setAId] = useState(STATES[22]?.id || STATES[0].id); // Maharashtra-ish default
  const [bId, setBId] = useState(STATES[6]?.id || STATES[1].id);
  const a = dataByState.get(aId);
  const b = dataByState.get(bId);

  const rows = [
    ["AI Risk Score", (d) => `${d.score}/100`, (d) => d.risk.color],
    ["Risk Level", (d) => d.risk.label, (d) => d.risk.color],
    ["Temperature", (d) => `${d.temp}°C`],
    ["Humidity", (d) => `${d.humidity}%`],
    ["Wind", (d) => `${d.wind} km/h`],
    ["AQI", (d) => d.aqi],
    ["PM2.5", (d) => `${d.pm25} µg/m³`],
    ["PM10", (d) => `${d.pm10} µg/m³`],
    ["Model Confidence", (d) => `${d.modelConfidence}%`],
    ["Validation RMSE", (d) => `±${d.validationRMSE}°C`],
    ["Sensors Online", (d) => d.sensors],
    ["People Impacted", (d) => `${d.peopleImpacted}M`],
  ];

  return (
    <div className="panel">
      <SectionTitle title="Compare States" subtitle="Side-by-side comparison of two regions' live climate intelligence" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
        <StatePicker label="Region A" value={aId} onChange={setAId} STATES={STATES} data={a} />
        <StatePicker label="Region B" value={bId} onChange={setBId} STATES={STATES} data={b} />
      </div>

      <div className="card compare-col" style={{ marginTop: 18 }}>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Metric</th>
              <th className="th">{a.name}</th>
              <th className="th">{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, get, color]) => (
              <tr key={label}>
                <td className="td" style={{ color: "#94a3b8" }}>{label}</td>
                <td className="td" style={{ fontWeight: 700, color: color ? color(a) : "#e2e8f0" }}>{get(a)}</td>
                <td className="td" style={{ fontWeight: 700, color: color ? color(b) : "#e2e8f0" }}>{get(b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatePicker({ label, value, onChange, STATES, data }) {
  return (
    <div className="card">
      <div className="section-sub" style={{ marginTop: 0 }}>{label}</div>
      <select className="select" style={{ width: "100%", marginTop: 8 }} value={value} onChange={(e) => onChange(e.target.value)}>
        {STATES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>{data.score}</span>
        <RiskTag risk={data.risk} />
      </div>
    </div>
  );
}
