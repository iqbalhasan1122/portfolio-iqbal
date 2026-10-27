import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionPref } from "@/modules/motion/motion-preference";
import { scroller } from "@/modules/motion/smooth-scroll";
import { palettes, type PaletteName } from "./palettes";
import { bgFragment, bgVertex, waveFragment, waveVertex } from "./shaders";
import { intro, pointer } from "./state";

export interface SceneApi {
  /** Re-scan the page for `[data-sec]` sections (call after every route change). */
  refresh(isHome: boolean): void;
  resize(): void;
  dispose(): void;
}

type Vec3Tuple = [number, number, number];

/**
 * Persistent WebGL scene: liquid gradient background + particle wave field (layer 1)
 * and the travelling glass-knot element (layer 2). Reacts to scroll, scroll velocity,
 * pointer, section progress and click/hold.
 */
export function createScene(canvas: HTMLCanvasElement): SceneApi {
  const R = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  R.autoClear = false;
  R.outputEncoding = THREE.sRGBEncoding;
  R.toneMapping = THREE.ACESFilmicToneMapping;
  R.toneMappingExposure = 1.15;

  const S = new THREE.Scene();
  const C = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  C.position.z = 9;

  const U = {
    uT: { value: 0 },
    uV: { value: 0 },
    uR: { value: new THREE.Vector2(1, 1) },
    uM: { value: new THREE.Vector2() },
    uC1: { value: new THREE.Color() },
    uC2: { value: new THREE.Color() },
    uC3: { value: new THREE.Color() },
    uA: { value: new THREE.Color() },
    uRip: { value: new THREE.Vector3(9, 9, 2) },
    uB: { value: 0 },
    uMW: { value: new THREE.Vector2(0, -4) },
    uDk: { value: 1 },
  };

  // ---- layer 1: background + wave field
  const bg = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.ShaderMaterial({ uniforms: U, depthTest: false, depthWrite: false, vertexShader: bgVertex, fragmentShader: bgFragment })
  );
  bg.frustumCulled = false;
  bg.renderOrder = -1;
  S.add(bg);

  const CX = 210;
  const CZ = 110;
  const pos = new Float32Array(CX * CZ * 3);
  const rnd = new Float32Array(CX * CZ);
  for (let i = 0; i < CX; i++) {
    for (let j = 0; j < CZ; j++) {
      const k = i * CZ + j;
      pos.set([(i / CX - 0.5) * 44, 0, -(j / CZ) * 28 + 5], k * 3);
      rnd[k] = Math.random();
    }
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("aR", new THREE.BufferAttribute(rnd, 1));
  const pts = new THREE.Points(
    pg,
    new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, vertexShader: waveVertex.replace("DPRX", R.getPixelRatio().toFixed(1)), fragmentShader: waveFragment })
  );
  pts.frustumCulled = false;
  S.add(pts);

  // ---- layer 2: travelling glass knot with orbiting rings
  const S2 = new THREE.Scene();
  const C2 = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  C2.position.z = 9;
  {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const x = c.getContext("2d")!;
    const g = x.createLinearGradient(0, 0, 0, 512);
    [[0, "#eafff2"], [0.28, "#3ddc84"], [0.5, "#0f7a43"], [0.75, "#052a18"], [1, "#010a05"]].forEach(([o, k]) => g.addColorStop(o as number, k as string));
    x.fillStyle = g;
    x.fillRect(0, 0, 1024, 512);
    x.fillStyle = "#fff";
    [[90, 110, 260, 70], [560, 70, 300, 56], [800, 190, 160, 110], [330, 230, 120, 26]].forEach((r) => x.fillRect(r[0], r[1], r[2], r[3]));
    x.fillStyle = "rgba(0,8,4,.75)";
    [[0, 250, 1024, 26], [420, 120, 70, 150], [700, 300, 200, 40]].forEach((r) => x.fillRect(r[0], r[1], r[2], r[3]));
    const t = new THREE.CanvasTexture(c);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.encoding = THREE.sRGBEncoding;
    const pm = new THREE.PMREMGenerator(R);
    S2.environment = pm.fromEquirectangular(t).texture;
    pm.dispose();
    t.dispose();
  }
  const H = new THREE.Group();
  S2.add(H);
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x2bd67b,
    metalness: 0.15,
    roughness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.9,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
    depthWrite: false,
    emissive: 0x04361c,
    emissiveIntensity: 0.6,
  });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.33, 360, 56, 2, 3), glass);
  H.add(knot);
  const orbs = ([[2.05, 0.35, 0.1, 0], [2.5, -0.6, 0.07, 1.3], [2.95, 0.9, 0.12, 2.6]] as number[][]).map(([r, tl, sz, ph], i) => {
    const piv = new THREE.Group();
    piv.rotation.set(tl, i * 0.7, tl * 0.5);
    piv.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.011, 8, 220), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })));
    const sp = new THREE.Mesh(new THREE.SphereGeometry(sz, 32, 24), i === 1 ? new THREE.MeshBasicMaterial({ color: 0x7bf0a6 }) : glass);
    sp.position.x = r;
    const arm = new THREE.Group();
    arm.add(sp);
    arm.rotation.z = ph;
    piv.add(arm);
    H.add(piv);
    return { piv, arm, v: (i % 2 ? -1 : 1) * (0.35 + i * 0.12) };
  });
  S2.add(new THREE.DirectionalLight(0xffffff, 1.1).translateX(3).translateY(4).translateZ(5));
  const pl2 = new THREE.PointLight(0x34d27b, 2, 30);
  pl2.position.set(-4, -2, 3);
  S2.add(pl2);

  // ---- section tracking
  let secs: HTMLElement[] = [];
  let tops: number[] = [];
  let P: THREE.Color[][] = [];
  let SHs: Vec3Tuple[] = [];
  let isHome = false;
  let hy = 0.36;
  const cur = { pal: palettes.light.map((c) => c.clone()) };
  let cH: number[] | null = null;
  let actI = 0;
  let kick = 0;
  let spin = 0;
  let sv = 0;
  let AT = 0;
  let last = 0;
  const sst = THREE.MathUtils.smoothstep;

  const meas = () => {
    tops = secs.map((s) => s.getBoundingClientRect().top + scrollY);
    const r = document.querySelector<HTMLElement>("[data-portrait-frame]");
    if (r) {
      const b = r.getBoundingClientRect();
      hy = (b.top + scrollY + b.height * 0.34) / innerHeight;
    }
  };
  const samplePalette = () => {
    const y = scrollY + innerHeight * 0.55;
    const w = innerHeight * 0.2;
    let pal = P[0].map((c) => c.clone());
    for (let i = 1; i < secs.length; i++) {
      const k = sst(y, tops[i] - w, tops[i] + w);
      pal = pal.map((c, j) => c.lerp(P[i][j], k));
    }
    return pal;
  };
  const sampleElement = () => {
    const y = scrollY + innerHeight * 0.5;
    const w = innerHeight * 0.42;
    let st: number[] = isHome ? [0.03, 1 - 2 * hy, 0.62] : [...SHs[0]];
    let a = 0;
    for (let i = 1; i < secs.length; i++) {
      const k = sst(y, tops[i] - w, tops[i] + w);
      st = st.map((v, j) => v + (SHs[i][j] - v) * k);
      if (k > 0.5) a = i;
    }
    return { st, a };
  };

  const refresh = (home: boolean) => {
    isHome = home;
    secs = Array.from(document.querySelectorAll<HTMLElement>("#view [data-sec]"));
    P = secs.map((s) => palettes[(s.dataset.pal as PaletteName) in palettes ? (s.dataset.pal as PaletteName) : "light"]);
    SHs = secs.map((s, i) => (s.dataset.st ? (s.dataset.st.split(",").map(Number) as Vec3Tuple) : ([i % 2 ? 0.8 : -0.8, i % 2 ? -0.3 : 0.3, 0.55] as Vec3Tuple)));
    if (P[0]) cur.pal = P[0].map((c) => c.clone());
    cH = null;
    actI = 0;
    meas();
  };

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    R.setSize(w, h, false);
    C.aspect = w / h;
    C.updateProjectionMatrix();
    C2.aspect = w / h;
    C2.updateProjectionMatrix();
    U.uR.value.set(w * R.getPixelRatio(), h * R.getPixelRatio());
    meas();
    ScrollTrigger.refresh();
  };
  window.addEventListener("resize", resize);
  let rot: ReturnType<typeof setTimeout>;
  const viewEl = document.getElementById("view");
  const ro = new ResizeObserver(() => {
    clearTimeout(rot);
    rot = setTimeout(() => {
      meas();
      ScrollTrigger.refresh();
    }, 150);
  });
  if (viewEl) ro.observe(viewEl);

  // ---- render loop (frame-rate independent damping)
  const ray = new THREE.Raycaster();
  const plN = new THREE.Plane(new THREE.Vector3(0, 1, 0), 3);
  const hit = new THREE.Vector3();
  const mw = new THREE.Vector2();
  const lum = (c: THREE.Color) => 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
  let vel = 0;

  const tick = (time: number) => {
    const MO = motionPref.get();
    const dt = Math.min(time - last, 0.05);
    last = time;
    const k = (a: number) => 1 - Math.exp(-dt * a);
    const f = dt * 60;
    if (!MO) AT += dt;
    vel += ((MO ? 0 : scroller.velocity) - vel) * k(7);
    sv += (Math.min(Math.abs(vel) / 40, 1) - sv) * k(4);
    if (secs.length) {
      const pal = samplePalette();
      for (let i = 0; i < 4; i++) cur.pal[i].lerp(pal[i], k(6));
      const g = sampleElement();
      if (!cH) cH = g.st.slice();
      if (g.a !== actI) {
        actI = g.a;
        kick = 1;
      }
      cH = cH.map((v, i) => v + (g.st[i] - v) * k(4.5));
    }
    kick *= Math.exp(-dt * 3);
    U.uC1.value.copy(cur.pal[0]);
    U.uC2.value.copy(cur.pal[1]);
    U.uC3.value.copy(cur.pal[2]);
    U.uA.value.copy(cur.pal[3]);
    U.uDk.value = 1 - lum(cur.pal[2]);
    pointer.sx += (pointer.x - pointer.sx) * k(4);
    pointer.sy += (pointer.y - pointer.sy) * k(4);
    const { sx: smx, sy: smy } = pointer;
    U.uT.value = AT;
    U.uV.value = sv;
    U.uM.value.set(smx, smy);
    U.uB.value += ((pointer.hold ? 1 : 0) - U.uB.value) * k(pointer.hold ? 3 : 4);
    C.position.set(smx * 0.7, 1.2 + smy * 0.35, 10);
    C.lookAt(0, -1.6, 0);
    ray.setFromCamera(new THREE.Vector2(smx, smy), C);
    if (ray.ray.intersectPlane(plN, hit)) {
      mw.set(hit.x, hit.z);
      U.uMW.value.lerp(mw, k(7));
    }
    if (cH) {
      const vh2 = 2 * Math.tan((C2.fov * Math.PI) / 360) * C2.position.z;
      const vw2 = vh2 * C2.aspect;
      spin += (0.004 + sv * 0.06 + kick * 0.08 + (pointer.hold ? 0.03 : 0)) * f * (MO ? 0 : 1);
      const sc = Math.min(0.19 * vh2, 0.3 * vw2) * cH[2] * intro.v * (1 + U.uB.value * 0.14);
      H.visible = intro.v > 0.01;
      H.scale.set(sc * (1 - sv * 0.06), sc * (1 + sv * 0.18), sc);
      H.position.set(cH[0] * (vw2 / 2) + smx * 0.3, cH[1] * (vh2 / 2) + smy * 0.2 + Math.sin(AT * 0.6) * 0.1, 0);
      knot.rotation.set(AT * 0.2 + smy * 0.6 + scrollY * 0.0009, spin + smx * 0.8 + scrollY * 0.0016 + (1 - intro.v) * 8, AT * 0.05);
      glass.color.set(0x2bd67b).lerp(cur.pal[3], 0.2);
      orbs.forEach((o, i) => {
        const m = MO ? 0 : 1;
        o.arm.rotation.z += o.v * 0.012 * (1 + sv * 6 + kick * 3) * f * m;
        o.piv.rotation.x += (0.0015 * (i + 1) + smy * 0.002) * f * m;
        o.piv.rotation.y += (0.002 + smx * 0.002) * f * m;
      });
    }
    R.clear();
    R.render(S, C);
    R.clearDepth();
    R.render(S2, C2);
  };
  gsap.ticker.add(tick);

  return {
    refresh,
    resize,
    dispose() {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      pg.dispose();
      R.dispose();
    },
  };
}
