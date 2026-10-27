import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/modules/blog/data/posts";
import { PostArticle } from "@/modules/blog/components/post-article";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.id }));

export function generateMetadata({ params }: Props): Metadata {
  const p = getPost(params.slug);
  return { title: p?.title ?? "Blog", description: p?.ex };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
