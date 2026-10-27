import * as THREE from "three";
import gsap from "gsap";
import { motionPref } from "@/modules/motion/motion-preference";
import { pointer } from "./state";
import { portraitFragment, portraitVertex } from "./shaders";

const ASPECT = 1624 / 1250;

/**
 * Head-and-shoulders portrait rendered on its own small canvas.
 * The head follows the cursor with a soft-masked rigid motion (translate + tilt + face shift).
 */
export function createPortrait(canvas: HTMLCanvasElement, src: string, onUnavailable?: () => void) {
  let renderer: THREE.WebGLRenderer | null = null;
  let disposed = false;
  let fx = 0;
  let fy = 0;
  let last = 0;
  const uniforms = { uMap: { value: null as THREE.Texture | null }, uM: { value: new THREE.Vector2() } };
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-ASPECT / 2, ASPECT / 2, 0.5, -0.5, 0.1, 10);
  camera.position.z = 2;

  const size = () => {
    if (!renderer) return;
    const w = Math.max(2, canvas.clientWidth);
    renderer.setSize(w, w / ASPECT, false);
  };

  const img = new Image();
  img.onload = () => {
    if (disposed) return;
    const tex = new THREE.Texture(img);
    tex.premultiplyAlpha = true;
    tex.needsUpdate = true;
    uniforms.uMap.value = tex;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true });
    } catch (error) {
      uniforms.uMap.value?.dispose();
      uniforms.uMap.value = null;
      onUnavailable?.();
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(ASPECT, 1, 160, 120),
      new THREE.ShaderMaterial({ transparent: true, premultipliedAlpha: true, uniforms, vertexShader: portraitVertex, fragmentShader: portraitFragment })
    );
    mesh.scale.setScalar(0.94);
    mesh.position.y = -0.03;
    scene.add(mesh);
    size();
  };
  img.src = src;

  const ro = new ResizeObserver(size);
  ro.observe(canvas);

  const tick = (time: number) => {
    if (!renderer) return;
    const dt = Math.min(time - last, 0.05);
    last = time;
    const k = (a: number) => 1 - Math.exp(-dt * a);
    if (scrollY >= innerHeight * 1.5) return;
    if (pointer.cx >= 0) {
      const r = canvas.getBoundingClientRect();
      const cl = gsap.utils.clamp(-1, 1);
      const on = motionPref.get() ? 0 : 1;
      fx += (cl((pointer.cx - (r.left + r.width * 0.49)) / (innerWidth * 0.4)) * on - fx) * k(5);
      fy += (cl(-(pointer.cy - (r.top + r.height * 0.44)) / (innerHeight * 0.4)) * on - fy) * k(5);
    }
    uniforms.uM.value.set(fx, fy);
    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);

  return {
    dispose() {
      disposed = true;
      gsap.ticker.remove(tick);
      ro.disconnect();
      uniforms.uMap.value?.dispose();
      renderer?.dispose();
    },
  };
}
