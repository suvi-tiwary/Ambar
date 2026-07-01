// src/App.jsx
import React, { useState, useMemo, useEffect } from "react";

import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import StatBar from "./components/StatBar.jsx";
import MapPanel from "./components/MapPanel.jsx";
import DashboardView from "./components/DashboardView.jsx";
import DigitalTwinView from "./components/DigitalTwinView.jsx";
import WhatIfSimulator from "./components/WhatIfSimulator.jsx";
import AdvisorView from "./components/AdvisorView.jsx";
import CompareView from "./components/CompareView.jsx";
import AnalyticsView from "./components/AnalyticsView.jsx";
import ForecastView from "./components/ForecastView.jsx";
import ReportsView from "./components/ReportsView.jsx";
import AlertsView from "./components/AlertsView.jsx";
import SavedView from "./components/SavedView.jsx";
import SettingsView from "./components/SettingsView.jsx";

import { STATES, buildStateData } from "./data/states.js";

export default function App() {
  const [tick, setTick] = useState(0);
  const [live, setLive] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("mh");
  const [hoveredId, setHoveredId] = useState(null);
  const [view, setView] = useState("dashboard");
  const [favorites, setFavorites] = useState(() => new Set(["mh"]));
  const [zoom, setZoom] = useState(1);
  const [toast, setToast] = useState(null);

  // live "data ticks" so numbers gently move when Live is on
  useEffect(() => {
    if (!live) return;
    const i = setInterval(() => setTick((t) => t + 1), 6000);
    return () => clearInterval(i);
  }, [live]);

  const dataByState = useMemo(() => {
    const m = new Map();
    STATES.forEach((s) => m.set(s.id, buildStateData(s.id, s.name, tick)));
    return m;
  }, [tick]);

  const selected = dataByState.get(selectedId);

  const filteredStates = useMemo(() => {
    if (!query.trim()) return STATES;
    return STATES.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2200);
  };

  const totals = useMemo(() => {
    let sensors = 0, people = 0;
    dataByState.forEach((d) => { sensors += d.sensors; people += parseFloat(d.peopleImpacted); });
    return { states: STATES.length, sensors, people: people.toFixed(1) };
  }, [dataByState]);

  const highRiskStates = useMemo(
    () => STATES.map((s) => dataByState.get(s.id)).filter((d) => d.score >= 60).sort((a, b) => b.score - a.score),
    [dataByState]
  );

  const onPickState = (id) => { setSelectedId(id); setQuery(""); setView("dashboard"); };

  return (
    <div className="app">
      <Sidebar
        view={view} setView={setView}
        alertCount={highRiskStates.length} savedCount={favorites.size}
        onUpgradeClick={() => showToast("Pro plans aren't wired up in this demo ✨")}
      />

      <main className="main">
        <TopBar
          query={query} setQuery={setQuery}
          filteredStates={filteredStates} onPickState={onPickState}
          live={live} setLive={setLive} showToast={showToast}
        />

        {view === "dashboard" && (
          <DashboardView
            selected={selected} favorites={favorites} toggleFavorite={toggleFavorite}
            STATES={STATES} dataByState={dataByState}
            selectedId={selectedId} setSelectedId={setSelectedId}
            hoveredId={hoveredId} setHoveredId={setHoveredId}
            zoom={zoom} setZoom={setZoom}
          />
        )}

        {view === "map" && (
          <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
            <MapPanel
              STATES={STATES} dataByState={dataByState}
              selectedId={selectedId} setSelectedId={setSelectedId}
              hoveredId={hoveredId} setHoveredId={setHoveredId}
              zoom={zoom} setZoom={setZoom} tall
            />
          </div>
        )}

        {view === "twin" && <DigitalTwinView selected={selected} STATES={STATES} dataByState={dataByState} />}

        {view === "whatif" && (
          <WhatIfSimulator selected={selected} STATES={STATES} selectedId={selectedId} setSelectedId={setSelectedId} />
        )}

        {view === "advisor" && (
          <AdvisorView selected={selected} STATES={STATES} selectedId={selectedId} setSelectedId={setSelectedId} />
        )}

        {view === "compare" && <CompareView STATES={STATES} dataByState={dataByState} />}

        {view === "analytics" && <AnalyticsView STATES={STATES} dataByState={dataByState} />}

        {view === "forecast" && (
          <ForecastView selected={selected} STATES={STATES} selectedId={selectedId} setSelectedId={setSelectedId} />
        )}

        {view === "reports" && (
          <ReportsView STATES={STATES} dataByState={dataByState} setSelectedId={setSelectedId} setView={setView} />
        )}

        {view === "alerts" && (
          <AlertsView highRiskStates={highRiskStates} setSelectedId={setSelectedId} setView={setView} />
        )}

        {view === "saved" && (
          <SavedView
            favorites={favorites} STATES={STATES} dataByState={dataByState}
            toggleFavorite={toggleFavorite} setSelectedId={setSelectedId} setView={setView}
          />
        )}

        {view === "settings" && <SettingsView live={live} setLive={setLive} showToast={showToast} />}

        <StatBar totals={totals} />
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
