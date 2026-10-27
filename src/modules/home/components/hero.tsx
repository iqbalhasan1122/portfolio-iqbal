"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/shared/components/section";
import { ArrowUpRight } from "@/shared/components/icons";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { Button } from "@/shared/ui/button";
import { PortraitCanvas } from "@/modules/scene/PortraitCanvas";
import { pointer } from "@/modules/scene/state";
import { motionPref } from "@/modules/motion/motion-preference";
import { whenRevealed } from "@/modules/motion/phase";
import { TransitionLink } from "@/modules/shell/transition-link";

gsap.registerPlugin(ScrollTrigger);

const word = (w: string) =>
  [...w].map((ch, i) => (
    <span key={i} data-letter="" className="inline-block will-change-transform">
      {ch}
    </span>
  ));

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    let ctx: gsap.Context | undefined;
    const cancel = whenRevealed(() => {
      if (motionPref.get()) return;
      ctx = gsap.context(() => {
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .from("[data-letter]", { yPercent: 130, rotate: 10, duration: 1.5, stagger: 0.06 })
          .from("[data-hero-in]", { y: 50, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.3);
        gsap.utils.toArray<HTMLElement>("[data-letter]").forEach((l, i) =>
          gsap.to(l, { y: -(50 + i * 12), opacity: 0.15, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom 25%", scrub: true } })
        );
        gsap.to("[data-hero-fade]", { y: -70, opacity: 0, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "55% top", scrub: true } });
      }, el);
    });

    // "IQBAL" / "HASAN" drift in opposite directions with the pointer.
    const w1 = el.querySelector<HTMLElement>('[data-w="1"]');
    const w2 = el.querySelector<HTMLElement>('[data-w="2"]');
    const tick = () => {
      if (motionPref.get() || scrollY >= innerHeight * 1.2 || !w1 || !w2) return;
      gsap.set(w1, { x: pointer.sx * -26 });
      gsap.set(w2, { x: pointer.sx * 26 });
    };
    gsap.ticker.add(tick);
    return () => {
      cancel();
      gsap.ticker.remove(tick);
      ctx?.revert();
    };
  }, []);

  return (
    <Section
      ref={root}
      id="hero"
      pal="hero"
      aria-label="Introduction"
      className="portfolio-hero"
    >
      <div
        data-hero-in=""
        data-hero-fade=""
        className="hero-availability"
      >
        <i className="size-[9px] animate-pulse-dot rounded-full bg-[#1f9d55] shadow-[0_0_0_0_#1f9d5588]" />
        Available for new projects
      </div>

      <h1
        id="title"
        aria-label="Iqbal Hasan"
        className="hero-name"
      >
        <span data-w="1" aria-hidden="true" className="hero-first-name">
          <span className="inline-block overflow-hidden pb-[.06em]">{word("IQBAL")}</span>
        </span>
        <span data-w="2" aria-hidden="true" className="hero-last-name">
          <span className="inline-block overflow-hidden pb-[.06em]">{word("HASAN")}</span>
        </span>
      </h1>

      <div
        data-hero-in=""
        data-hero-fade=""
        className="hero-introduction"
      >
        <p className="text-[clamp(15px,1.15vw,19px)] font-medium leading-[1.55] text-[#d6e6dc]">
          I turn complex ideas into clear, thoughtful websites and apps. UI/UX design shaped around your users and your business.
        </p>
        <div className="mt-[22px] flex flex-wrap gap-3">
          <Button asChild variant="glass" data-mag="">
            <TransitionLink href="/work">
              View my work <ArrowUpRight />
            </TransitionLink>
          </Button>
          <WhatsAppLink />
        </div>
      </div>

      <div
        data-hero-in=""
        data-hero-fade=""
        className="hero-project-count"
      >
        <b data-count="150" data-dec="0" data-sfx="+" className="mb-3.5 block text-[34px] font-semibold">
          150+
        </b>
        <span className="text-base font-medium leading-[1.35]">Projects completed with care and attention to detail</span>
      </div>

      <div
        data-portrait-frame=""
        className="hero-portrait-frame"
      >
        <PortraitCanvas />
      </div>

      <div
        data-hero-fade=""
        aria-hidden="true"
        className="absolute bottom-[1.5vh] left-1/2 z-[4] h-[34px] w-0.5 -translate-x-1/2 overflow-hidden bg-[#ffffff55] after:absolute after:left-0 after:top-[-50%] after:h-1/2 after:w-full after:animate-scroll-line after:bg-white after:content-['']"
      />
    </Section>
  );
}
