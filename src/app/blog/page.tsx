import type { Metadata } from "next";
import { PageHead } from "@/shared/components/page-head";
import { Section } from "@/shared/components/section";
import { BlogCard } from "@/modules/blog/components/blog-card";
import { posts } from "@/modules/blog/data/posts";
import { CtaSection } from "@/modules/contact/components/cta-section";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHead tag="Blog" lines={["Notes on design,", "UX and code"]} lead="Practical articles on UI/UX, design systems, accessibility and motion." />
      <Section pal="soft" aria-label="Articles" className="pt-5">
        <div className="mt-14 grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-8 gap-y-11">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
