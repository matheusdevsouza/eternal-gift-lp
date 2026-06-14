// @ts-nocheck
"use client";

import { Suspense, useRef, useEffect, useMemo, useState, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Preload } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3d/apple_iphone_17_pro_max.glb";

// Preload the model so it is parsed/cached before either canvas mounts.
useGLTF.preload(MODEL_PATH);

/* -------------------------------------------------------------------------- */
/*  Model                                                                      */
/* -------------------------------------------------------------------------- */

function PhoneModel({ onReady, poseRef }) {
  const { scene } = useGLTF(MODEL_PATH);

  const rootRef = useRef(null);
  const spinRef = useRef(null);
  const entry = useRef(0);

  // Clone the cached scene so each canvas owns an independent instance.
  const cloned = useMemo(() => {
    const PINK = new THREE.Color("#D28D96");
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      // Never frustum-cull: at extreme scroll poses the bounding sphere can leave
      // the frustum and make the phone blink out of existence.
      child.frustumCulled = false;

      const original = child.material;
      const sources = Array.isArray(original) ? original : [original];
      // Clone every material so recoloring this instance never mutates the shared
      // useGLTF cache (the other canvas keeps its own copy).
      const processed = sources.map((src) => {
        if (!src) return src;
        const m = src.clone();
        m.envMapIntensity = 1.2;

        // 1) The phone screen = any material that emits an image (wallpaper/UI).
        //    Turn it fully off so no picture shows on the display.
        if (m.emissiveMap) {
          m.emissiveMap = null;
          if (m.emissive) m.emissive.setRGB(0, 0, 0);
          m.emissiveIntensity = 0;
          if (m.map) m.map = null;
          if (m.color) m.color.setRGB(0.02, 0.02, 0.02);
          m.transparent = false;
          m.opacity = 1;
          return m;
        }

        const c = m.color;
        if (!c) return m;

        const max = Math.max(c.r, c.g, c.b);
        const isGlass =
          m.transparent === true ||
          (typeof m.opacity === "number" && m.opacity < 0.95) ||
          (typeof m.transmission === "number" && m.transmission > 0);
        const isVeryDark = max < 0.12; // black frame bits / camera lenses -> keep dark
        const isWarm = c.r > 0.12 && c.r >= c.g * 1.4 && c.r >= c.b * 1.7; // orange/red casing

        // Recolor warm casing AND any textured opaque body panel. The back glass
        // takes its orange from a TEXTURE (its base color is plain white), so a
        // color-only check misses it — dropping the map + applying pink fixes it.
        // Plain neutral solids (titanium frame/buttons, white metal) have no map
        // and aren't warm, so they survive as tasteful accents.
        if (isWarm || (m.map && !isGlass && !isVeryDark)) {
          m.color.copy(PINK);
          if (m.map) m.map = null; // drop the orange texture so the pink reads cleanly
        }
        return m;
      });

      // Reassign preserving the ORIGINAL shape: a single-material mesh must stay a
      // single material — assigning a 1-element array turns it multi-material and,
      // with no geometry groups, the mesh renders nothing (this is what made the
      // whole phone disappear).
      child.material = Array.isArray(original) ? processed : processed[0];
    });

    return clone;
  }, [scene]);

  // Normalize + center the model (the source asset is only ~0.16 units tall).
  const { scaleValue, positionValue } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxSpan = Math.max(size.x, size.y, size.z, 0.0001);
    const TARGET_SPAN = 1.15;
    const VISUAL_SCALE = 2.1;
    return {
      scaleValue: (TARGET_SPAN / maxSpan) * VISUAL_SCALE,
      positionValue: [-center.x, -center.y, -center.z],
    };
  }, [cloned]);

  // Signal readiness once the (cloned + measured) model is in hand.
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    // Frame-rate-independent entry easing.
    if (entry.current < 1) entry.current = Math.min(1, entry.current + delta * 1.5);
    const eased = 1 - Math.pow(1 - entry.current, 3);

    const time = state.clock.getElapsedTime();
    const isFixedMode = !!(poseRef && poseRef.current);

    // Scroll-driven pose (hero) or gentle self-rotating showcase (card).
    const target = isFixedMode
      ? poseRef.current
      : { x: 0, y: -0.05, z: 0.6, rx: 0.15, ry: time * 0.4, rz: 0.05, scale: 0.95 };

    const isMobile = state.size.width < 1024;
    const x = isMobile && isFixedMode ? 0 : target.x;
    const y = isMobile && isFixedMode ? -0.4 : target.y;
    const z = isMobile && isFixedMode ? target.z - 0.25 : target.z;
    const baseScale = isMobile && isFixedMode ? target.scale * 0.72 : target.scale;
    const scale = baseScale * eased;

    const floatY = Math.sin(time * 1.4) * 0.045;
    const floatRot = Math.sin(time * 1.0) * 0.03;
    const idleSpin = isFixedMode ? time * 0.16 : 0;

    if (rootRef.current && spinRef.current) {
      rootRef.current.position.set(x, y + floatY, z);
      rootRef.current.rotation.set(target.rx, 0, target.rz);
      rootRef.current.scale.setScalar(scale);
      spinRef.current.rotation.set(0, target.ry + idleSpin + floatRot, 0);
    }
  });

  return (
    <group ref={rootRef}>
      <group ref={spinRef}>
        <group scale={scaleValue} position={positionValue}>
          <primitive object={cloned} />
        </group>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Error boundary (real WebGL/model failures only)                           */
/* -------------------------------------------------------------------------- */

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.warn("PhoneCanvas failed to render:", error?.message || error);
  }
  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Static fallback (no WebGL / failure) — only for the in-card variant        */
/* -------------------------------------------------------------------------- */

function PhoneFallback() {
  return (
    <div className="w-[190px] sm:w-[210px] h-[340px] sm:h-[460px] bg-bg-deep border-2 border-border rounded-t-3xl shadow-2xl relative self-center mt-6 overflow-hidden flex flex-col pointer-events-none mx-auto">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />
      <div className="w-full h-full bg-bg-deep p-4 pt-12 flex flex-col gap-4 relative">
        <div className="w-full bg-bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden h-[180px] sm:h-[220px]">
          <span className="text-[9px] uppercase tracking-widest text-primary font-bold mb-2">Horas Juntos</span>
          <span className="text-3xl sm:text-4xl font-black text-text-primary leading-none mb-2 tracking-tight">39,670</span>
          <span className="text-[8px] text-primary/80 flex items-center gap-1 mt-1 font-mono">18% dos casais 🌟</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="w-full p-3 bg-bg-card border border-border rounded-xl flex items-center justify-between text-xs">
            <span className="text-text-primary/70 font-medium">Fotos salvas</span>
            <span className="text-primary font-bold">150+</span>
          </div>
          <div className="w-full p-3 bg-bg-card border border-border rounded-xl flex items-center justify-between text-xs">
            <span className="text-text-primary/70 font-medium">Cartas escritas</span>
            <span className="text-primary font-bold">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Canvas                                                                     */
/* -------------------------------------------------------------------------- */

interface PhoneCanvasProps {
  poseRef?: React.RefObject<{
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    scale: number;
  }>;
  isFixed?: boolean;
}

export default function PhoneCanvas({ poseRef, isFixed = true }: PhoneCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    setMounted(true);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On mobile, run only ONE WebGL context (the hero phone). The in-card phone
  // falls back to the lightweight static mockup so two heavy contexts + a 5.5MB
  // transmission model don't exhaust the mobile GPU (which caused context loss).
  const useStaticFallback = !isFixed && isMobile;

  const wrapperClass = `${isFixed ? "hero-phone-canvas " : ""}phone-canvas-wrapper pointer-events-none select-none transition-opacity duration-700 ${
    isFixed
      ? "fixed inset-0 z-[25]"
      : "relative w-full h-full min-h-[300px] sm:min-h-[400px] z-[2]"
  } ${loaded || useStaticFallback ? "opacity-100" : "opacity-0"}`;

  return (
    <div className={wrapperClass}>
      {mounted && useStaticFallback && (
        <div className="w-full h-full flex items-center justify-center">
          <PhoneFallback />
        </div>
      )}
      {mounted && !useStaticFallback && (
        <CanvasErrorBoundary fallback={isFixed ? null : <PhoneFallback />}>
          <Canvas
            events={() => ({ enabled: false })}
            dpr={isMobile ? 1 : [1, 1.75]}
            frameloop="always"
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            camera={{ position: [0, 0.08, 5.0], fov: 40, near: 0.1, far: 100 }}
            style={{ background: "transparent" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              // Recover gracefully instead of permanently tearing the canvas down.
              const canvas = gl.domElement;
              canvas.addEventListener(
                "webglcontextlost",
                (event) => {
                  event.preventDefault();
                },
                false
              );
            }}
          >
            <ambientLight intensity={1.1} />
            <directionalLight position={[4.2, 5.2, 6.1]} intensity={2.4} />
            <directionalLight position={[-5.2, 2.6, -6.4]} intensity={1.3} />
            <pointLight position={[0.8, 1.4, 3.8]} intensity={1.4} />
            <pointLight position={[-0.5, -2.2, -2]} intensity={0.7} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <PhoneModel onReady={() => setLoaded(true)} poseRef={poseRef} />
              <Preload all />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
