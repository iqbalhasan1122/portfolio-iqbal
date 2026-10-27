"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionPref } from "@/modules/motion/motion-preference";
import { whenRevealed } from "@/modules/motion/phase";

gsap.registerPlugin(ScrollTrigger);

/** Thin reading-progress bar pinned to the top of article pages. */
export function ReadProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tween: gsap.core.Tween | undefined;
    const cancel = whenRevealed(() => {
      if (motionPref.get()) return;
      tween = gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "article", start: "top top", end: "bottom bottom", scrub: true } });
    });
    return () => {
      cancel();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return <div ref={bar} aria-hidden="true" className="fixed left-0 top-0 z-[150] h-1 w-full origin-left scale-x-0 bg-accent" />;
}
