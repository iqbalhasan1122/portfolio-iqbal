import { images } from "@/shared/assets/images";
import { ImageFrame } from "@/shared/components/image-frame";
import { Heading } from "@/shared/components/heading";
import { MetaLine } from "@/shared/components/meta-line";
import { Section } from "@/shared/components/section";
import { TransitionLink } from "@/modules/shell/transition-link";
import { CtaSection } from "@/modules/contact/components/cta-section";
import { posts, type Post } from "../data/posts";
import { ReadProgress } from "./read-progress";

type Block = { type: "h2" | "p"; text: string } | { type: "ul"; items: string[] };

function parse(lines: string[]): Block[] {
  const out: Block[] = [];
  for (const l of lines) {
    if (l.startsWith("- ")) {
      const last = out[out.length - 1];
      if (last?.type === "ul") last.items.push(l.slice(2));
      else out.push({ type: "ul", items: [l.slice(2)] });
    } else if (l.startsWith("## ")) out.push({ type: "h2", text: l.slice(3) });
    else out.push({ type: "p", text: l });
  }
  return out;
}

const copy = "text-lg leading-[1.75]";

export function PostArticle({ post: p }: { post: Post }) {
  const next = posts[(posts.indexOf(p) + 1) % posts.length];
  return (
    <>
      <ReadProgress />
      <Section pal="light" st=".78,.1,.55" className="min-h-0 pb-10 pt-[calc(150px+env(safe-area-inset-top,0px))]">
        <div className="mx-auto max-w-[760px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex gap-2 text-[15px] text-muted">
            <TransitionLink href="/blog" className="underline">
              Blog
            </TransitionLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{p.cat}</span>
          </nav>
          <MetaLine items={[p.cat, p.date, p.read]} />
          <Heading as="h1" lines={[p.title]} tabIndex={-1} className="text-[clamp(34px,4.6vw,64px)]" />
          <p data-reveal="" className="mt-[26px] max-w-[640px] text-[clamp(18px,1.6vw,24px)] leading-[1.55] text-muted">
            {p.ex}
          </p>
        </div>
      </Section>

      <Section pal="soft" className="pt-5">
        <article className="mx-auto max-w-[760px]">
          <ImageFrame src={images[p.img]} alt="" className="my-[34px] h-[min(50vw,440px)]" sizes="(max-width: 900px) 100vw, 760px" />
          {parse(p.body).map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="mb-3.5 mt-11 text-[clamp(26px,2.6vw,36px)] font-semibold tracking-[-.02em]">
                {b.text}
              </h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="mb-[18px] ml-[22px] list-disc pl-10">
                {b.items.map((x) => (
                  <li key={x} className={`${copy} text-muted`}>
                    {x}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className={`mb-[18px] ${copy} text-[#2d3733]`}>
                {b.text}
              </p>
            )
          )}
        </article>
      </Section>

      <Section pal="light">
        <TransitionLink href={`/blog/${next.id}`} data-reveal="" className="block rounded-[20px] bg-[linear-gradient(120deg,#0e0e0dcc,#063b26cc)] p-[clamp(28px,5vw,60px)] text-white no-underline backdrop-blur-[8px]">
          <span className="text-sm uppercase tracking-[.1em] text-accent">Next article</span>
          <b className="mt-2.5 block text-[clamp(28px,4vw,58px)] font-bold tracking-[-.03em]">{next.title}</b>
        </TransitionLink>
      </Section>

      <CtaSection />
    </>
  );
}
