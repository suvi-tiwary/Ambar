// src/components/ReportsView.jsx
import React from "react";
import { Download } from "lucide-react";
import { SectionTitle } from "./shared.jsx";

function exportCSV(rows) {
  const header = ["State", "Risk Score", "Risk Level", "Temp (C)", "AQI", "PM2.5", "PM10", "Sensors", "People Impacted (M)"];
  const lines = rows.map((r) => [
    r.name, r.score, r.risk.label, r.temp, r.aqi, r.pm25, r.pm10, r.sensors, r.peopleImpacted,
  ].join(","));
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `india-climate-report-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsView({ STATES, dataByState, setSelectedId, setView }) {
  const rows = STATES.map((s) => dataByState.get(s.id)).sort((a, b) => b.score - a.score);

  return (
    <div className="panel">
      <SectionTitle
        title="State Reports"
        subtitle="Full data export across all 28 states"
        action={<button className="btn primary" onClick={() => exportCSV(rows)}><Download size={14} /> Export CSV</button>}
      />
      <div style={{ overflow: "auto", marginTop: 10, maxHeight: "calc(100vh - 320px)" }}>
        <table className="table">
          <thead>
            <tr>
              {["State", "Risk Score", "Level", "Temp", "AQI", "Sensors"].map((h) => <th key={h} className="th">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="tr" onClick={() => { setSelectedId(r.id); setView("dashboard"); }}>
                <td className="td">{r.name}</td>
                <td className="td">{r.score}</td>
                <td className="td" style={{ color: r.risk.color, fontWeight: 700 }}>{r.risk.label}</td>
                <td className="td">{r.temp}°C</td>
                <td className="td">{r.aqi}</td>
                <td className="td">{r.sensors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
