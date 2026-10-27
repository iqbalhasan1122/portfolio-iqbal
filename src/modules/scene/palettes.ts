import * as THREE from "three";

export type PaletteName = "hero" | "light" | "soft" | "green" | "dark";

/** [top, middle, bottom, accent] per section type. */
const hex: Record<PaletteName, [string, string, string, string]> = {
  hero: ["#06180f", "#082417", "#031a0f", "#34d27b"],
  light: ["#f6f8f5", "#f4f7f3", "#f1f5f0", "#2fbf71"],
  soft: ["#eef4ee", "#e9f1ea", "#e4ede6", "#1fa75a"],
  green: ["#e6f3ea", "#e0efe5", "#d9eadf", "#2fbf71"],
  dark: ["#04120b", "#030f09", "#020b07", "#34d27b"],
};

export const palettes = Object.fromEntries(
  Object.entries(hex).map(([k, v]) => [k, v.map((h) => new THREE.Color(h))])
) as Record<PaletteName, THREE.Color[]>;
