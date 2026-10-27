import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/** Design tokens carried over 1:1 from the original design. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e0e0d",
        brand: "#063b26",
        teal: "#033c38",
        accent: "#34d27b",
        muted: "#4f5a54",
        deep: "#0c1a14",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans Variable'", "system-ui", "sans-serif"],
        display: ["Anton", "Impact", "'Arial Narrow'", "sans-serif"],
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-dot": { "70%": { boxShadow: "0 0 0 10px #1f9d5500" } },
        "scroll-line": { to: { top: "110%" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        "pulse-dot": "pulse-dot 2s infinite",
        "scroll-line": "scroll-line 2s ease-in-out infinite",
        "accordion-down": "accordion-down .25s ease-out",
        "accordion-up": "accordion-up .25s ease-out",
      },
    },
  },
  plugins: [animate],
};
export default config;
