import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/modules/work/data/projects";
import { WorkDetail } from "@/modules/work/components/work-detail";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.id }));

export function generateMetadata({ params }: Props): Metadata {
  const p = getProject(params.slug);
  return { title: p?.title ?? "Work", description: p?.sum };
}

export default function WorkDetailPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <WorkDetail project={project} />;
}
