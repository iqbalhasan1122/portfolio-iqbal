"use client";

import { motionPref, useMotionOff } from "@/modules/motion/motion-preference";

/** Footer switch: pauses decorative animation (WCAG 2.2.2). */
export function MotionToggle() {
  const off = useMotionOff();
  return (
    <button
      id="mo"
      type="button"
      aria-pressed={off}
      onClick={() => motionPref.toggle()}
      className="min-h-11 cursor-pointer rounded-full border-[1.5px] border-white bg-transparent px-4 py-2 text-sm font-semibold text-white aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-ink"
    >
      Reduce motion
    </button>
  );
}
