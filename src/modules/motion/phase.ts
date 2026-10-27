/**
 * Tiny coordination layer between the preloader, page transitions and the
 * animation layers: animations wait until the page is actually revealed.
 */
export const bus = typeof window !== "undefined" ? new EventTarget() : (null as unknown as EventTarget);

export const phase = { ready: false, transitioning: false };

export function revealNow() {
  phase.ready = true;
  phase.transitioning = false;
  bus.dispatchEvent(new Event("reveal"));
}

/** Runs `cb` once the page is visible (after preloader / wipe). Returns a cancel function. */
export function whenRevealed(cb: () => void): () => void {
  if (phase.ready && !phase.transitioning) {
    cb();
    return () => {};
  }
  const handler = () => {
    bus.removeEventListener("reveal", handler);
    cb();
  };
  bus.addEventListener("reveal", handler);
  return () => bus.removeEventListener("reveal", handler);
}
