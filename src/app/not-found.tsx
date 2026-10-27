import type { Metadata } from "next";
import { PageHead } from "@/shared/components/page-head";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return <PageHead tag="404" lines={["Page not found"]} lead="The page you’re looking for doesn’t exist. Try the work page or go home." />;
}
