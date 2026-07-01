// src/components/StatBar.jsx
import React from "react";
import { Building2, Radio, Users, ArrowUpRight } from "lucide-react";
import { StatItem } from "./shared.jsx";

export default function StatBar({ totals }) {
  return (
    <div className="stat-bar">
      <StatItem icon={Building2} value={totals.states} label="States Covered" color="#60a5fa" />
      <StatItem icon={Radio} value={totals.sensors.toLocaleString()} label="Sensors Online" color="#34d399" />
      <StatItem icon={Users} value={`${totals.people}M`} label="People Impacted" color="#60a5fa" />
      <StatItem icon={ArrowUpRight} value="+18%" label="vs Yesterday" color="#34d399" />
    </div>
  );
}
