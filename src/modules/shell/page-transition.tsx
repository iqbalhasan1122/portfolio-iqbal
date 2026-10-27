"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { nav } from "@/modules/site/config";
import { motionPref } from "@/modules/motion/motion-preference";
import { phase, revealNow } from "@/modules/motion/phase";
import { scroller } from "@/modules/motion/smooth-scroll";

type Runner = (href: string) => void;
let runner: Runner | null = null;

export function navigateWithTransition(href: string) {
  runner?.(href);
}

const focusMain = () => {
  document.getElementById("view")?.focus({ preventScroll: true });
};

/** Green wipe between routes + live-region announcement for assistive tech. */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const wipe = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLDivElement>(null);
  const pending = useRef<(() => void) | null>(null);
  const scrollTopNext = useRef(false);

  useEffect(() => {
    runner = async (href) => {
      if (phase.transitioning) return;
      if (motionPref.get() || !wipe.current) {
        scrollTopNext.current = true;
        router.push(href);
        return;
      }
      phase.transitioning = true;
      scroller.stop();
      const base = "/" + (href.split("/")[1] ?? "");
      label.current!.textContent = nav.find((n) => n.href === base)?.label ?? "Iqbal Hasan";
      await gsap
        .timeline()
        .set(wipe.current, { display: "flex", yPercent: 100 })
        .to(wipe.current, { yPercent: 0, duration: 0.75, ease: "expo.inOut" })
        .fromTo(label.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=.3");
      const arrived = new Promise<void>((res) => (pending.current = res));
      router.push(href);
      await arrived;
      scroller.toTop();
      gsap
        .timeline()
        .to(wipe.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.2 })
        .add(() => revealNow(), "-=.6")
        .set(wipe.current, { display: "none" })
        .add(() => {
          scroller.start();
          focusMain();
        });
    };
    return () => {
      runner = null;
    };
  }, [router]);

  useEffect(() => {
    if (pending.current) {
      pending.current();
      pending.current = null;
    } else if (scrollTopNext.current) {
      scrollTopNext.current = false;
      scroller.toTop();
      focusMain();
    }
    const t = setTimeout(() => {
      if (live.current) live.current.textContent = "Navigated to " + document.title;
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div ref={wipe} aria-hidden="true" className="fixed inset-0 z-[250] hidden items-center justify-center bg-brand text-[clamp(40px,9vw,140px)] font-bold tracking-[-3px] text-accent">
        <span ref={label} />
      </div>
      <div ref={live} className="sr-only" aria-live="polite" />
    </>
  );
}
