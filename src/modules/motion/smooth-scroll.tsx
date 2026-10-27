"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motionPref } from "./motion-preference";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const scroller = {
  get velocity() {
    return lenis ? lenis.velocity : 0;
  },
  stop: () => lenis?.stop(),
  start: () => lenis?.start(),
  toTop() {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  },
};

/** Mounts Lenis smooth scrolling and drives it from the shared GSAP ticker. */
export function SmoothScroll() {
  useEffect(() => {
    motionPref.init();
    history.scrollRestoration = "manual";
    gsap.ticker.lagSmoothing(0);
    if (!motionPref.get()) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
      lenis.stop(); // released by the preloader
      lenis.on("scroll", ScrollTrigger.update);
    }
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
