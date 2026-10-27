"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createScene, type SceneApi } from "./engine";
import { pointer } from "./state";

/** Fixed full-screen canvas that lives in the root layout and survives route changes. */
export function SceneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const api = useRef<SceneApi | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let scene: SceneApi;
    try {
      scene = createScene(ref.current!);
    } catch (error) {
      document.documentElement.classList.add("no-webgl");
      return () => document.documentElement.classList.remove("no-webgl");
    }
    api.current = scene;
    scene.resize();
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / innerHeight) * 2 - 1);
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
    };
    const down = () => (pointer.hold = true);
    const up = () => (pointer.hold = false);
    addEventListener("pointermove", move);
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      scene.dispose();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    api.current?.refresh(pathname === "/");
  }, [pathname]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 size-full" />;
}
