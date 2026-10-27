import Image from "next/image";
import { images } from "@/shared/assets/images";
import type { Project } from "../data/projects";

/** Art-directed thumbnail built with the actual project artwork. */
export function ProjectThumbnail({ project: p }: {project: Project}) {
  const [name, description] = p.title.split(" — ");
  return <div className={`project-thumbnail thumbnail-${p.id}`}>
    <div className="thumbnail-heading"><span>{p.tag}</span><b>{name}</b><p>{description}</p></div>
    <span className="thumbnail-index" aria-hidden="true">{p.cat === "Mobile" ? "APP" : p.cat === "Branding" ? "IDENTITY" : "WEB"}</span>
    <div className={`thumbnail-art ${p.cat === "Mobile" ? "thumbnail-phone" : p.cat === "Branding" ? "thumbnail-brand" : "thumbnail-browser"}`}>
      {p.cat === "Web" && <div className="thumbnail-browser-bar" aria-hidden="true"><i/><i/><i/><span>{name.toLowerCase().replaceAll(" ", "")}</span></div>}
      <Image src={images[p.img]} alt={`${name} project thumbnail showing ${description.toLowerCase()}`} sizes="(max-width: 900px) 90vw, 45vw" className="thumbnail-screen" />
    </div>
    {p.cat === "Mobile" && <div className="thumbnail-phone thumbnail-second-phone"><img src="/projects/spirit-wise-start.png" alt="" loading="lazy" width="320" height="693" /></div>}
  </div>;
}
