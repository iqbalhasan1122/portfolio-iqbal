import { Heading } from "@/shared/components/heading";
import { MetaLine } from "@/shared/components/meta-line";
import { Section } from "@/shared/components/section";
import { TransitionLink } from "@/modules/shell/transition-link";
import type { Project } from "../data/projects";
import { projectScreens } from "../data/project-screens";

export function WorkDetail({ project: p }: { project: Project }) {
  const [name, sub] = p.title.split(" — ");
  const screens = projectScreens[p.id];
  return <>
    <Section pal="light" st=".78,.12,.55" className="min-h-0 pb-[50px] pt-[calc(150px+env(safe-area-inset-top,0px))]">
      <nav aria-label="Breadcrumb" className="mb-7 flex gap-2 text-[15px] text-muted"><TransitionLink href="/work" className="underline">Work</TransitionLink><span aria-hidden="true">/</span><span aria-current="page">{name}</span></nav>
      <MetaLine items={[p.cat, p.tag]} />
      <Heading as="h1" lines={[name]} tabIndex={-1} />
      <p className="mt-6 max-w-[640px] text-[clamp(18px,1.6vw,24px)] leading-[1.55] text-muted">{sub}. {p.sum}</p>
    </Section>
    <Section pal="light" className="pt-0" aria-label={`${name} project screens`}>
      <div className={`project-gallery ${p.cat === "Mobile" ? "project-gallery-mobile" : ""}`}>
        {screens.map((screen, i) => <figure key={screen.src}>
          <div className="project-screen-mat"><img src={screen.src} alt={`${name}: ${screen.caption}`} width={screen.width} height={screen.height} loading={i === 0 ? "eager" : "lazy"} className="project-detail-screen" /></div>
          <figcaption><span>{String(i + 1).padStart(2,"0")}</span>{screen.caption}</figcaption>
        </figure>)}
      </div>
    </Section>
    <Section pal="soft" aria-label="Problem and solution">
      <div className="grid grid-cols-2 gap-14 max-[900px]:grid-cols-1">
        <div><span className="text-sm font-bold uppercase tracking-[.1em] text-teal">01 / Problem</span><h2 className="mt-3 text-3xl font-semibold">The problem</h2><p className="mt-4 text-lg leading-[1.75] text-muted">{p.ch}</p></div>
        <div><span className="text-sm font-bold uppercase tracking-[.1em] text-teal">02 / Solution</span><h2 className="mt-3 text-3xl font-semibold">The solution</h2><p className="mt-4 text-lg leading-[1.75] text-muted">{p.so}</p></div>
      </div>
      <TransitionLink href="/work" className="mt-12 inline-flex min-h-11 items-center border-b border-current font-semibold">Back to all projects</TransitionLink>
    </Section>
  </>;
}
