"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { images } from "@/shared/assets/images";
import { Heading } from "@/shared/components/heading";
import { ImageFrame } from "@/shared/components/image-frame";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { cn } from "@/shared/lib/utils";
import { motionPref } from "@/modules/motion/motion-preference";
import { testimonials } from "../data/testimonials";

const ctrl =
  "grid size-[clamp(52px,4vw,76px)] cursor-pointer place-items-center rounded-full border-[1.5px] border-dashed border-teal bg-transparent text-teal transition-colors duration-300 hover:bg-teal/10 disabled:cursor-not-allowed disabled:border-[#9aa39e] disabled:text-[#8a928d] disabled:hover:bg-transparent";

/** "Client conversations" / heading, prev/next controls and a peeking testimonial carousel. */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const start = useRef<number | null>(null);
  const last = testimonials.length - 1;

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(last, i))), [last]);

  useEffect(() => {
    const move = (instant = false) => {
      const el = track.current;
      const slide = el?.children[index] as HTMLElement | undefined;
      if (!el || !slide) return;
      gsap.to(el, { x: -slide.offsetLeft, duration: instant || motionPref.get() ? 0 : 0.9, ease: "expo.out", overwrite: true });
    };
    move();
    const onResize = () => move(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  return (
    <Section pal="light" aria-labelledby="ts" className="overflow-x-clip">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <div>
          <Tag>Client conversations</Tag>
          <Heading
            id="ts"
            lines={[
              { text: "The partnership.", className: "text-teal" },
              { text: "From their perspective.", className: "text-[#1a9d56]" },
            ]}
            className="font-bold tracking-[-.06em] text-[clamp(40px,5.2vw,86px)] leading-[1.08]"
          />
        </div>
        <div data-reveal="" className="max-w-[300px] max-[900px]:max-w-none">
          <div className="flex gap-[clamp(16px,1.6vw,34px)]">
            <button type="button" className={ctrl} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous testimonial">
              <ArrowLeft aria-hidden="true" className="size-[42%]" strokeWidth={1.6} />
            </button>
            <button type="button" className={ctrl} onClick={() => go(index + 1)} disabled={index === last} aria-label="Next testimonial">
              <ArrowRight aria-hidden="true" className="size-[42%]" strokeWidth={1.6} />
            </button>
          </div>
          <p className="mt-[clamp(18px,2vw,36px)] text-[clamp(13px,1.1vw,18px)] uppercase leading-[1.3] text-[#6b716d]">
            We value each and every client’s feedback which helps us to improve.
          </p>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current !== null && Math.abs(e.clientX - start.current) > 60) go(index + (e.clientX < start.current ? 1 : -1));
          start.current = null;
        }}
        className="-mr-[clamp(20px,7vw,132px)] mt-[clamp(40px,5vw,100px)] touch-pan-y overflow-hidden"
      >
        <ul ref={track} className="relative flex list-none will-change-transform">
          {testimonials.map((t, i) => {
            const active = i === index;
            const hidden = active ? {} : ({ inert: "" } as Record<string, string>);
            return (
              <li
                key={t.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${testimonials.length}`}
                aria-hidden={!active}
                {...hidden}
                className={cn(
                  "mr-[4%] grid w-[92%] shrink-0 grid-cols-[minmax(0,26%)_minmax(0,1fr)] items-center gap-[clamp(24px,3.5vw,70px)] transition-opacity duration-700 max-[900px]:w-[88%] max-[900px]:grid-cols-1",
                  active ? "opacity-100" : "opacity-45"
                )}
              >
                <ImageFrame
                  src={images[t.image]}
                  alt=""
                  sizes="(max-width: 900px) 88vw, 26vw"
                  className="aspect-[600/700] rounded-2xl border border-[#0e0e0d14] max-[900px]:aspect-[4/3]"
                >
                  {t.videoUrl && (
                    <a
                      href={t.videoUrl}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Play video testimonial from ${t.name} (opens in a new tab)`}
                      className="absolute left-1/2 top-1/2 grid size-[clamp(54px,5vw,84px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-teal backdrop-blur-sm"
                    >
                      <Play aria-hidden="true" className="size-[40%] fill-current" />
                    </a>
                  )}
                </ImageFrame>
                <div>
                  <blockquote className="text-[clamp(22px,2.45vw,48px)] font-medium leading-[1.28] text-teal">“{t.quote}”</blockquote>
                  <p className="mt-[clamp(20px,2.4vw,44px)] text-[clamp(34px,4.6vw,92px)] font-medium leading-none tracking-[-.02em] text-[#111]">{t.name}</p>
                  <p className="mt-[clamp(12px,1.4vw,26px)] text-[clamp(14px,1.45vw,26px)] tracking-[.02em] text-[#2d3733]">{t.role}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {testimonials.length}
      </p>
    </Section>
  );
}
