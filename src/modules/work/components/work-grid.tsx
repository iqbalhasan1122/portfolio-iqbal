"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectCategories, projects } from "../data/projects";
import { WorkCard } from "./work-card";

gsap.registerPlugin(ScrollTrigger);

/** Filterable project grid (All / Web / Mobile / Branding). */
export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const shown = projects.filter((p) => filter === "All" || p.cat === filter);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    gsap.fromTo(Array.from(grid.current?.children ?? []), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true });
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mt-[34px] flex flex-wrap gap-2.5">
        {projectCategories.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-11 cursor-pointer rounded-full border-[1.5px] border-brand bg-transparent px-[22px] py-2.5 text-[15px] font-semibold text-brand transition-colors duration-300 aria-pressed:bg-brand aria-pressed:text-white"
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <div ref={grid} className="mt-14 grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-8 gap-y-11">
        {shown.map((p) => (
          <WorkCard key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
