// src/components/DigitalTwinView.jsx
import React from "react";
import { CheckCircle2, RefreshCw, Satellite, Database, Cpu, Layers, GitBranch, Eye } from "lucide-react";
import { SectionTitle, MiniStat } from "./shared.jsx";
import { DATA_SOURCES, PIPELINE_STAGES } from "../data/states.js";

const STAGE_ICON = { ingest: Database, preprocess: Layers, model: Cpu, twin: GitBranch, validate: CheckCircle2, visualize: Eye };

export default function DigitalTwinView({ selected, STATES, dataByState }) {
  const avgConfidence = Math.round(STATES.reduce((a, s) => a + dataByState.get(s.id).modelConfidence, 0) / STATES.length);
  const avgRMSE = (STATES.reduce((a, s) => a + parseFloat(dataByState.get(s.id).validationRMSE), 0) / STATES.length).toFixed(2);

  return (
    <div className="panel">
      <SectionTitle
        title="Digital Twin — System Status"
        subtitle="Live view of the data fusion → AI model → simulation pipeline for the pilot region"
      />

      <div className="grid-3" style={{ marginTop: 16 }}>
        <MiniStat label="Avg. Model Confidence" value={`${avgConfidence}%`} />
        <MiniStat label="Avg. Validation RMSE" value={`${avgRMSE}°C`} />
        <MiniStat label="Pilot State" value={selected.name} />
      </div>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* Pipeline */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Processing Pipeline</div>
          <div className="pipeline">
            {PIPELINE_STAGES.map((stage, i) => {
              const Icon = STAGE_ICON[stage.key];
              return (
                <React.Fragment key={stage.key}>
                  <div className="pipeline-step">
                    <span className="status-dot" style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                    <Icon size={16} color="#60a5fa" style={{ marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{stage.title}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2, lineHeight: 1.5 }}>{stage.desc}</div>
                    </div>
                  </div>
                  {i < PIPELINE_STAGES.length - 1 && <div className="pipeline-connector" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Data sources */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>National Data Sources</div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DATA_SOURCES.map((src) => (
              <div key={src.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Satellite size={15} color="#93c5fd" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{src.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{src.agency}</div>
                </div>
                {src.status === "synced" ? (
                  <span className="source-chip"><CheckCircle2 size={11} /> Synced</span>
                ) : (
                  <span className="source-chip" style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,.3)", background: "rgba(251,191,36,.08)" }}>
                    <RefreshCw size={11} className="spin" /> Syncing
                  </span>
                )}
              </div>
            ))}
          </div>

          <div style={{ fontWeight: 700, fontSize: 14, margin: "18px 0 10px" }}>Per-State Model Health</div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
            {STATES.slice(0, 8).map((s) => {
              const d = dataByState.get(s.id);
              return (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span style={{ color: "#cbd5e1" }}>{s.name}</span>
                  <span style={{ color: d.modelConfidence > 85 ? "#22c55e" : "#eab308", fontWeight: 700 }}>
                    {d.modelConfidence}% confidence · ±{d.validationRMSE}°C
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
