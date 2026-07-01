// src/components/SettingsView.jsx
import React, { useState } from "react";
import { SectionTitle, Toggle } from "./shared.jsx";

export default function SettingsView({ live, setLive, showToast }) {
  const [unit, setUnit] = useState("celsius");
  const [notif, setNotif] = useState(true);

  return (
    <div className="panel">
      <SectionTitle title="Settings" subtitle="Tune how the dashboard behaves" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16, maxWidth: 420 }}>
        <SettingRow label="Live data updates" desc="Refresh risk & sensor data every few seconds">
          <Toggle checked={live} onChange={() => setLive((v) => !v)} />
        </SettingRow>
        <SettingRow label="Risk alert notifications" desc="Notify when a state crosses High risk">
          <Toggle checked={notif} onChange={() => { setNotif((v) => !v); showToast(!notif ? "Alerts enabled" : "Alerts disabled"); }} />
        </SettingRow>
        <SettingRow label="Temperature unit" desc="Display weather in Celsius or Fahrenheit">
          <div style={{ display: "flex", gap: 6 }}>
            {["celsius", "fahrenheit"].map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`unit-btn ${unit === u ? "active" : ""}`}>
                {u === "celsius" ? "°C" : "°F"}
              </button>
            ))}
          </div>
        </SettingRow>
      </div>
    </div>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{label}</div>
        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{desc}</div>
      </div>
      {children}
    </div>
  );
}
