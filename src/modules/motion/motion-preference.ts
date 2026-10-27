import { useSyncExternalStore } from "react";

type Listener = () => void;
const listeners = new Set<Listener>();
let off = false;
let initialised = false;

/** Single source of truth for "reduce motion" (system setting + footer switch). */
export const motionPref = {
  get: () => off,
  init() {
    if (initialised || typeof window === "undefined") return;
    initialised = true;
    off = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.toggle("nomo", off);
    listeners.forEach((l) => l());
  },
  toggle() {
    off = !off;
    document.documentElement.classList.toggle("nomo", off);
    listeners.forEach((l) => l());
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useMotionOff() {
  return useSyncExternalStore(motionPref.subscribe, motionPref.get, () => false);
}
