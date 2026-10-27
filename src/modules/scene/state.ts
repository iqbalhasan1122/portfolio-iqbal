/** Mutable runtime state shared by the 3D layers (kept outside React on purpose: it changes every frame). */
export const pointer = {
  /** Pointer in normalised device coordinates (-1..1, y up). */
  x: 0,
  y: 0,
  /** Eased copy of x/y / used for parallax. */
  sx: 0,
  sy: 0,
  /** Pointer in client pixels (-1 until the first move). */
  cx: -1,
  cy: -1,
  hold: false,
};

/** 0 → 1 reveal factor for the travelling 3D element (tweened by the page-motion layer). */
export const intro = { v: 0 };
