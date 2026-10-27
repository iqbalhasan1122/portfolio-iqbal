import { ProjectThumbnail } from "./project-thumbnail";
import { TransitionLink } from "@/modules/shell/transition-link";
import type { Project } from "../data/projects";

export function WorkCard({ project: p }: { project: Project }) {
  return (
    <TransitionLink href={`/work/${p.id}`} data-reveal="" data-cat={p.cat} className="group/card block rounded-[14px] text-inherit no-underline">
      <ProjectThumbnail project={p} />
      <div className="mb-2 mt-5 flex items-baseline justify-between gap-4">
        <h3 className="m-0 text-[clamp(24px,2.2vw,34px)] font-bold tracking-[-.03em] text-ink">{p.title.split(" — ")[0]}</h3>
        <span className="whitespace-nowrap text-sm text-muted">
          {p.cat} / {p.year}
        </span>
      </div>
      <p className="max-w-[560px] leading-[1.55] text-muted">{p.sum}</p>
    </TransitionLink>
  );
}
