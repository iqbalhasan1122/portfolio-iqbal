import type { ImageKey } from "@/shared/assets/images";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: ImageKey;
  /** Optional video testimonial / when set, a play button is shown on the photo. */
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "pure-bullion",
    quote: "Delivered the first phase on time and moving on to the second phase. Easy to work with.",
    name: "Pure Bullion",
    role: "United States",
    image: "t2",
  },
];
