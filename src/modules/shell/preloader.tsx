"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motionPref } from "@/modules/motion/motion-preference";
import { revealNow } from "@/modules/motion/phase";
import { scroller } from "@/modules/motion/smooth-scroll";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    motionPref.init();
    const rm = motionPref.get();
    const o = { v: 0 };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      gsap.to(root.current, { yPercent: -101, duration: rm ? 0.01 : 1.2, ease: "expo.inOut", onComplete: () => setGone(true) });
      timer = setTimeout(() => {
        scroller.start();
        revealNow();
      }, rm ? 0 : 450);
    };
    const tween = gsap.to(o, {
      v: 100,
      duration: rm ? 0.3 : 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num.current) num.current.textContent = String(Math.floor(o.v));
      },
      onComplete: () => (document.readyState === "complete" ? run() : window.addEventListener("load", run, { once: true })),
    });
    return () => {
      tween.kill();
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} id="pre" role="status" className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-2.5 bg-ink text-accent">
      <span className="text-xs tracking-[.35em] opacity-80">IQBAL HASAN / UI/UX DESIGNER</span>
      <b ref={num} className="text-[clamp(80px,17vw,220px)] font-semibold leading-none tracking-[-5px]">
        0
      </b>
    </div>
  );
}
