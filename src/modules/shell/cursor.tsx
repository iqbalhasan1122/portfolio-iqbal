"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = "a,button,[data-im],[data-tilt],summary,label,input,textarea";

/** Custom dot + ring cursor (hidden on touch devices). */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cu = dot.current!;
    const rg = ring.current!;
    const cuX = gsap.quickTo(cu, "x", { duration: 0.1, ease: "power3" });
    const cuY = gsap.quickTo(cu, "y", { duration: 0.1, ease: "power3" });
    const rgX = gsap.quickTo(rg, "x", { duration: 0.6, ease: "power3" });
    const rgY = gsap.quickTo(rg, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      cuX(e.clientX);
      cuY(e.clientY);
      rgX(e.clientX);
      rgY(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      gsap.to(rg, { scale: t?.closest?.(INTERACTIVE) ? 1.9 : 1, duration: 0.5, ease: "power3" });
    };
    const down = () => gsap.to(rg, { scale: 0.55, duration: 0.35 });
    const up = () => gsap.to(rg, { scale: 1, duration: 0.5 });
    addEventListener("pointermove", move);
    addEventListener("pointerover", over);
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[260] -ml-1 -mt-1 size-2 rounded-full bg-white mix-blend-difference [@media(hover:none)]:hidden" />
      <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[260] -ml-[23px] -mt-[23px] size-[46px] rounded-full border-[1.5px] border-white mix-blend-difference [@media(hover:none)]:hidden" />
    </>
  );
}
