import Image, { type StaticImageData } from "next/image";
import { cn } from "@/shared/lib/utils";

interface ImageFrameProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: boolean;
  children?: React.ReactNode;
  fit?: "cover" | "contain";
}

/** Rounded image with clip-reveal, parallax and hover zoom handled by the page-motion layer. */
export function ImageFrame({ src, alt, className, sizes = "(max-width: 900px) 100vw, 50vw", priority, reveal, children, fit = "cover" }: ImageFrameProps) {
  return (
    <div data-im={fit === "cover" ? "" : undefined} data-reveal={reveal ? "" : undefined} className={cn("relative overflow-hidden rounded-xl", fit === "contain" && "bg-[#e5ede7]", className)}>
      <div data-par={fit === "cover" ? "" : undefined} className={fit === "cover" ? "absolute inset-x-0 top-[-10%] h-[120%]" : "absolute inset-0 p-5"}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fit === "cover" ? "object-cover" : "object-contain p-5", "transition-transform duration-700 group-hover/card:scale-[1.025] group-focus-visible/card:scale-[1.025]")}
        />
      </div>
      {children}
    </div>
  );
}
