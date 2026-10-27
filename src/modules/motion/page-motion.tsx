"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intro } from "@/modules/scene/state";
import { motionPref } from "./motion-preference";
import { scroller } from "./smooth-scroll";
import { whenRevealed } from "./phase";

gsap.registerPlugin(ScrollTrigger);

/**
 * Declarative scroll choreography. Markup opts in with data attributes:
 * data-line (heading lines) / data-reveal / data-count / data-im/data-par / data-tilt / data-mag
 */
function setup(view: HTMLElement, signal: AbortSignal) {
  const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, view);

  q<HTMLElement>("h1, h2").forEach((h) => {
    const lines = h.querySelectorAll("[data-line]");
    if (!lines.length) return;
    gsap.from(lines, { yPercent: 115, rotate: 3, duration: 1.3, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: h, start: "top 90%" } });
  });

  q("[data-reveal]").forEach((e) => gsap.from(e, { y: 60, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: e, start: "top 92%" } }));

  q("[data-count]").forEach((el) => {
    const o = { v: 0 };
    const d = Number(el.dataset.dec) || 0;
    const s = el.dataset.sfx || "";
    el.textContent = (0).toFixed(d) + s;
    gsap.to(o, {
      v: Number(el.dataset.count),
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent = o.v.toFixed(d) + s;
      },
    });
  });

  q("[data-im]").forEach((el) => {
    const par = el.querySelector("[data-par]");
    gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", onEnter: () => (el.dataset.in = "1") } });
    if (par) {
      gsap.from(par, { scale: 1.4, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      gsap.fromTo(par, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
    } else el.dataset.in = "1";
  });

  q("[data-tilt]").forEach((c) => {
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      gsap.to(c, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8, transformPerspective: 800, duration: 0.6 });
    }, { signal });
    c.addEventListener("pointerleave", () => gsap.to(c, { rotationX: 0, rotationY: 0, duration: 0.9 }), { signal });
  });

  q("[data-mag]").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
    }, { signal });
    b.addEventListener("pointerleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.4)" }), { signal });
  });
}

export function PageMotion() {
  const pathname = usePathname();

  // Per-route choreography, started only once the page is visible (after preloader / wipe).
  useEffect(() => {
    const view = document.getElementById("view");
    if (!view) return;
    const ac = new AbortController();
    let ctx: gsap.Context | undefined;
    const cancel = whenRevealed(() => {
      gsap.fromTo(intro, { v: 0 }, { v: 1, duration: 2.2, ease: "expo.out", delay: 0.15 });
      if (!motionPref.get()) ctx = gsap.context(() => setup(view, ac.signal), view);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ac.abort();
      ctx?.revert();
      view.querySelectorAll<HTMLElement>("[data-in]").forEach((e) => delete e.dataset.in);
    };
  }, [pathname]);

  // Velocity-based skew on images while scrolling fast.
  useEffect(() => {
    let skS = 0;
    let active = false;
    const tick = () => {
      if (motionPref.get()) return;
      const k = 1 - Math.exp(-(gsap.ticker.deltaRatio() / 60) * 8);
      skS += (gsap.utils.clamp(-3, 3, scroller.velocity * 0.06) - skS) * k;
      if (Math.abs(skS) > 0.02 || active) {
        active = Math.abs(skS) > 0.02;
        const s = active ? skS : 0;
        document.querySelectorAll<HTMLElement>("[data-im][data-in]").forEach((el) => gsap.set(el, { skewY: s }));
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return null;
}
