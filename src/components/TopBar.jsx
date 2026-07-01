// src/components/TopBar.jsx
import React from "react";
import { Search, X, Share2, User } from "lucide-react";

export default function TopBar({ query, setQuery, filteredStates, onPickState, live, setLive, showToast }) {
  return (
    <div className="topbar">
      <div className="search-box">
        <Search size={16} color="#64748b" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a state..."
          className="search-input"
        />
        {query && <X size={14} color="#64748b" style={{ cursor: "pointer" }} onClick={() => setQuery("")} />}
        {query && filteredStates.length > 0 && (
          <div className="search-dropdown">
            {filteredStates.slice(0, 6).map((s) => (
              <div key={s.id} className="search-item" onClick={() => onPickState(s.id)}>
                {s.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <button className={`pill ${live ? "live" : ""}`} onClick={() => setLive((v) => !v)}>
        <span className={`dot ${live ? "on" : ""}`} />
        {live ? "Live" : "Paused"}
      </button>
      <button className="pill" onClick={() => showToast("Share link copied (demo)")}>
        <Share2 size={14} /> Share
      </button>
      <button className="icon-circle" onClick={() => showToast("Single-user demo session")}>
        <User size={16} />
      </button>
    </div>
  );
}
