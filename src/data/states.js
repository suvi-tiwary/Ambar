// src/data/states.js
// Approximate relative positions (0-100 viewBox units) laid out to echo
// the real shape/clustering of India's states for the bubble-map.

export const STATES = [
  { id: "jk", name: "Jammu & Kashmir", x: 39, y: 8, w: 11, h: 13 },
  { id: "hp", name: "Himachal Pradesh", x: 44, y: 17, w: 6, h: 6 },
  { id: "pb", name: "Punjab", x: 38, y: 19, w: 5, h: 5 },
  { id: "uk", name: "Uttarakhand", x: 48, y: 18, w: 5, h: 5 },
  { id: "hr", name: "Haryana", x: 40.5, y: 22.5, w: 4, h: 4 },
  { id: "rj", name: "Rajasthan", x: 31, y: 30, w: 14, h: 14 },
  { id: "up", name: "Uttar Pradesh", x: 49, y: 28, w: 13, h: 9 },
  { id: "br", name: "Bihar", x: 61, y: 29, w: 7, h: 6 },
  { id: "sk", name: "Sikkim", x: 66, y: 22, w: 2.5, h: 2.5 },
  { id: "wb", name: "West Bengal", x: 67, y: 33, w: 6, h: 8 },
  { id: "as", name: "Assam", x: 75, y: 23, w: 7, h: 5 },
  { id: "ar", name: "Arunachal Pradesh", x: 79, y: 16, w: 9, h: 5 },
  { id: "nl", name: "Nagaland", x: 81, y: 26, w: 3, h: 3 },
  { id: "mn", name: "Manipur", x: 80.5, y: 30, w: 3, h: 3 },
  { id: "mz", name: "Mizoram", x: 78.5, y: 33.5, w: 3, h: 3 },
  { id: "tr", name: "Tripura", x: 75, y: 32, w: 2.5, h: 2.5 },
  { id: "ml", name: "Meghalaya", x: 74, y: 27.5, w: 4, h: 2.5 },
  { id: "gj", name: "Gujarat", x: 22, y: 40, w: 13, h: 12 },
  { id: "mp", name: "Madhya Pradesh", x: 44, y: 39, w: 14, h: 9 },
  { id: "cg", name: "Chhattisgarh", x: 57, y: 41, w: 6, h: 8 },
  { id: "jh", name: "Jharkhand", x: 62, y: 36, w: 5, h: 5 },
  { id: "or", name: "Odisha", x: 62, y: 45, w: 7, h: 7 },
  { id: "mh", name: "Maharashtra", x: 38, y: 50, w: 16, h: 11 },
  { id: "tg", name: "Telangana", x: 53, y: 53, w: 7, h: 6 },
  { id: "ap", name: "Andhra Pradesh", x: 55, y: 60, w: 8, h: 9 },
  { id: "ka", name: "Karnataka", x: 41, y: 61, w: 10, h: 11 },
  { id: "ga", name: "Goa", x: 37, y: 58, w: 2.5, h: 2.5 },
  { id: "kl", name: "Kerala", x: 41, y: 74, w: 4, h: 10 },
  { id: "tn", name: "Tamil Nadu", x: 47, y: 73, w: 8, h: 11 },
  { id: "lk", name: "Lakshadweep", x: 25, y: 70, w: 3, h: 6 },
  { id: "an", name: "Andaman & Nicobar", x: 80, y: 60, w: 4, h: 14 },
];

export const CONDITIONS = ["Partly Cloudy", "Clear Sky", "Light Rain", "Overcast", "Hazy", "Sunny"];

// The national data sources this digital twin is framed around (from the
// problem statement) — used by the Digital Twin pipeline view.
export const DATA_SOURCES = [
  { name: "INSAT Land Surface Temp (3RIMG_L2B_LST)", agency: "MOSDAC", status: "synced" },
  { name: "INSAT Sea Surface Temp (3RIMG_L2B_SST)", agency: "MOSDAC", status: "synced" },
  { name: "INSAT Rainfall (3RIMG_L2B_IMC)", agency: "MOSDAC", status: "synced" },
  { name: "Gridded Rainfall (0.25° × 0.25°)", agency: "IMD Pune", status: "synced" },
  { name: "Max / Min Temperature (1.0° × 1.0°)", agency: "IMD Pune", status: "synced" },
  { name: "Geospatial layers & basemaps", agency: "Bhuvan / NICES", status: "syncing" },
];

export const PIPELINE_STAGES = [
  { key: "ingest", title: "Data Collection", desc: "Pulling INSAT LST/SST/rainfall + IMD gridded rainfall & temperature." },
  { key: "preprocess", title: "Pre-processing & Fusion", desc: "Re-gridding, gap-filling and harmonising multi-source datasets into one consistent format." },
  { key: "model", title: "AI Model Training", desc: "TensorFlow/PyTorch model learns short-term rainfall & temperature dynamics." },
  { key: "twin", title: "Digital Twin Simulation", desc: "Generates a continuously-updated virtual state of the pilot region's climate." },
  { key: "validate", title: "Validation", desc: "Cross-checked against IMD ground observations for accuracy." },
  { key: "visualize", title: "Visualization & Scenarios", desc: "Dashboard rendering + what-if scenario analysis for decision-making." },
];

/* ---------------------------------------------------------
   Seeded pseudo-random helpers so data is stable per session
   but still drifts gently when "Live" mode ticks.
--------------------------------------------------------- */
export function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function riskLevel(score) {
  if (score >= 100) return { label: "Critical", color: "#a855f7" };
  if (score >= 80) return { label: "Very High", color: "#ef4444" };
  if (score >= 60) return { label: "High", color: "#f97316" };
  if (score >= 30) return { label: "Medium", color: "#eab308" };
  return { label: "Low", color: "#22c55e" };
}

export function buildStateData(stateId, name, tick) {
  const rnd = seededRandom(hashStr(stateId) + tick * 7919);
  const baseRisk = Math.floor(rnd() * 100);
  const score = Math.max(5, Math.min(100, Math.round(baseRisk + (rnd() - 0.5) * 6)));
  const temp = Math.round(20 + rnd() * 18);
  const humidity = Math.round(35 + rnd() * 55);
  const wind = Math.round(4 + rnd() * 22);
  const condition = CONDITIONS[Math.floor(rnd() * CONDITIONS.length)];
  const pm25 = Math.round(15 + rnd() * 140);
  const pm10 = Math.round(pm25 * (1.2 + rnd() * 0.7));
  const aqi = Math.round(pm25 * 1.5 + rnd() * 30);
  const sensors = Math.round(20 + rnd() * 140);
  const peopleImpacted = (0.4 + rnd() * 22).toFixed(1);
  const rainfall = Math.round(rnd() * 40);
  const modelConfidence = Math.round(78 + rnd() * 19); // %
  const validationRMSE = (0.6 + rnd() * 1.8).toFixed(2); // °C
  const trend = Array.from({ length: 8 }, (_, i) => ({
    day: i,
    risk: Math.max(5, Math.min(100, Math.round(score - 12 + rnd() * 24 + i * (rnd() - 0.4)))),
  }));
  const forecast = Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    temp: Math.round(temp - 4 + rnd() * 8),
    rainfall: Math.round(rnd() * 60),
  }));
  const aqiLabel = aqi > 150 ? "Unhealthy" : aqi > 100 ? "Poor" : aqi > 50 ? "Moderate" : "Good";
  const insightPool = [
    `High AQI levels combined with ${condition.toLowerCase()} conditions are increasing health risks. Reduce outdoor activities and use protective measures.`,
    `Rising temperatures and shifting humidity point to elevated drought stress over the coming weeks. Water conservation advised.`,
    `Monsoon variability detected — rainfall patterns deviate from the 10-year seasonal average for this region.`,
    `Sensor network reports stable conditions with a slight upward trend in regional risk score.`,
    `Coastal and surface temperature anomalies suggest monitoring for extreme weather development.`,
  ];
  const insight = insightPool[Math.floor(rnd() * insightPool.length)];

  return {
    id: stateId, name, score, risk: riskLevel(score),
    temp, humidity, wind, condition, rainfall,
    aqi, pm25, pm10, aqiLabel,
    sensors, peopleImpacted, trend, forecast, insight,
    modelConfidence, validationRMSE,
  };
}
