import { images } from "@/shared/assets/images";
import { ImageFrame } from "@/shared/components/image-frame";
import { TransitionLink } from "@/modules/shell/transition-link";
import type { Post } from "../data/posts";

export function BlogCard({ post: p }: { post: Post }) {
  return (
    <TransitionLink href={`/blog/${p.id}`} data-reveal="" className="group/card block rounded-[14px] text-inherit no-underline">
      <ImageFrame src={images[p.img]} alt="" className="h-[min(54vw,460px)] rounded-[20px]" />
      <div className="mb-2 mt-5 flex items-baseline justify-between gap-4">
        <h3 className="m-0 text-[clamp(24px,2.2vw,34px)] font-bold tracking-[-.03em] text-ink">{p.title}</h3>
      </div>
      <p className="mb-2 text-sm leading-[1.55] text-muted">
        {p.cat} / {p.date} / {p.read}
      </p>
      <p className="max-w-[560px] leading-[1.55] text-muted">{p.ex}</p>
    </TransitionLink>
  );
}
