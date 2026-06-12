// @ts-nocheck
"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "/3d/apple_iphone_17_pro_max.glb";

// Preload the model
useGLTF.preload(MODEL_PATH);

interface BottlePose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
  opacity: number;
}

const ENTRY_POSE: BottlePose = {
  x: 5.4,
  y: -0.16,
  z: 1.1,
  rx: 0.08,
  ry: 1.08,
  rz: -0.18,
  s: 0.14,
  opacity: 0,
};

const STORY_FRAMES: BottlePose[] = [
  { x: 1.48, y: -0.08, z: 0.56, rx: 0.02, ry: -0.24, rz: 0.14, s: 0.78, opacity: 1 }, // Hero
  { x: 1.64, y: -0.62, z: 0.76, rx: -0.03, ry: -2.62, rz: -0.04, s: 1.26, opacity: 1 }, // Approach/Window-dive start
  { x: -15.0, y: -0.06, z: -1.4, rx: 0.01, ry: -6.34, rz: -0.02, s: 0.34, opacity: 0 }, // Out of screen
];

const glassPose: BottlePose = {
  x: 0.28,
  y: -0.34,
  z: -0.1,
  rx: -0.02,
  ry: -4.26,
  rz: 0.01,
  s: 0.58,
  opacity: 1,
};

const leftOutsidePose: BottlePose = {
  x: -2.48,
  y: -0.12,
  z: -1.08,
  rx: -0.03,
  ry: -6.16,
  rz: -0.02,
  s: 0.44,
  opacity: 0.98,
};

const throwLeftPose: BottlePose = {
  x: -15.0,
  y: -0.08,
  z: -1.4,
  rx: -0.02,
  ry: -6.54,
  rz: -0.06,
  s: 0.34,
  opacity: 0,
};

const VANISH_START_PROGRESS = 0.72;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPose(a: BottlePose, b: BottlePose, t: number): BottlePose {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
    rx: lerp(a.rx, b.rx, t),
    ry: lerp(a.ry, b.ry, t),
    rz: lerp(a.rz, b.rz, t),
    s: lerp(a.s, b.s, t),
    opacity: lerp(a.opacity, b.opacity, t),
  };
}

function Model({
  preWindowProgress,
  windowDiveProgress,
  windowDiveActive,
  scrollProgress,
  wrapperRef,
}) {
  const { scene } = useGLTF(MODEL_PATH);
  
  const modelRootRef = useRef<THREE.Group>(null);
  const spinGroupRef = useRef<THREE.Group>(null);
  
  const modelCenter = useRef(new THREE.Vector3());
  const normalizeScale = useRef(1);
  const entryProgress = useRef(0);
  
  const currentPose = useRef<BottlePose>({ ...ENTRY_POSE });

  // Compute normalization and center on load
  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    box.getCenter(modelCenter.current);
    
    const maxSpan = Math.max(size.x, size.y, size.z, 0.001);
    const TARGET_MODEL_SPAN = 1.1;
    const MODEL_VISUAL_SCALE = 1.72;
    normalizeScale.current = (TARGET_MODEL_SPAN / maxSpan) * MODEL_VISUAL_SCALE;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((m: any) => {
            m.envMapIntensity = 1.5;
            m.side = THREE.FrontSide;
            m.precision = "mediump";
          });
        }
      }
    });

    // Mark as entered to trigger intro spin
    entryProgress.current = 0;
  }, [scene]);

  const getLateralFactor = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 680) return 0.58;
    if (w < 980) return 0.72;
    if (w < 1280) return 0.9;
    return 1;
  };

  useFrame((state) => {
    // 1. Entry animation progress
    if (entryProgress.current < 1) {
      entryProgress.current = Math.min(1, entryProgress.current + 0.026);
    }

    const preP = preWindowProgress.current;
    const diveP = windowDiveProgress.current;
    const diveActive = windowDiveActive.current;

    const approachStart = STORY_FRAMES[0];
    const approachEnd = STORY_FRAMES[1];

    let targetPose = { ...ENTRY_POSE };
    const bottleGoneAfterWindow = diveP >= 1.0;

    if (!diveActive && preP > 0 && preP < 1) {
      targetPose = lerpPose(approachStart, approachEnd, preP);
    } else if (diveActive || (diveP > 0 && diveP < 1)) {
      const p = Math.min(1, Math.max(0, diveP));
      let choreoPose: BottlePose;

      if (p < 0.52) {
        choreoPose = lerpPose(approachEnd, glassPose, p / 0.52);
      } else if (p < 0.72) {
        choreoPose = lerpPose(glassPose, leftOutsidePose, (p - 0.52) / 0.2);
      } else {
        choreoPose = lerpPose(leftOutsidePose, throwLeftPose, (p - 0.72) / 0.28);
      }

      targetPose = choreoPose;

      if (bottleGoneAfterWindow) {
        targetPose.opacity = 0;
      } else if (p >= VANISH_START_PROGRESS) {
        const fadeProgress = Math.min(
          1,
          Math.max(0, (p - VANISH_START_PROGRESS) / (1.0 - VANISH_START_PROGRESS))
        );
        targetPose.opacity = lerp(choreoPose.opacity, 0, fadeProgress);
      }
    } else {
      if (bottleGoneAfterWindow) {
        targetPose = { ...STORY_FRAMES[2] };
        targetPose.opacity = 0;
      } else {
        const easedEntry = 1 - Math.pow(1 - entryProgress.current, 3);
        const baseHeroPose = lerpPose(ENTRY_POSE, STORY_FRAMES[0], easedEntry);
        const spinFactor = 1 - easedEntry;

        targetPose = { ...baseHeroPose };
        // Premium multi-axis spin that settles smoothly
        targetPose.rx = baseHeroPose.rx + spinFactor * Math.PI * 3.5;
        targetPose.ry = baseHeroPose.ry + spinFactor * Math.PI * 5.0;
        targetPose.rz = baseHeroPose.rz + spinFactor * Math.PI * 2.0;
      }
    }

    const lerpFactor = entryProgress.current < 1 ? 0.34 : 0.28;
    currentPose.current.x = lerp(currentPose.current.x, targetPose.x, lerpFactor);
    currentPose.current.y = lerp(currentPose.current.y, targetPose.y, lerpFactor);
    currentPose.current.z = lerp(currentPose.current.z, targetPose.z, lerpFactor);
    currentPose.current.rx = lerp(currentPose.current.rx, targetPose.rx, lerpFactor);
    currentPose.current.ry = lerp(currentPose.current.ry, targetPose.ry, lerpFactor);
    currentPose.current.rz = lerp(currentPose.current.rz, targetPose.rz, lerpFactor);
    currentPose.current.s = lerp(currentPose.current.s, targetPose.s, lerpFactor);
    currentPose.current.opacity = lerp(currentPose.current.opacity, targetPose.opacity, 0.2);

    // 3. Floating idle and scroll-based rotation
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.7) * 0.03;
    const floatRot = Math.sin(time * 1.2) * 0.02;
    const idleSpin = time * 0.42;
    const scrollSpin = scrollProgress.current * -18.5;
    const lateralFactor = getLateralFactor();

    if (modelRootRef.current && spinGroupRef.current) {
      modelRootRef.current.position.set(
        currentPose.current.x * lateralFactor,
        currentPose.current.y + floatY,
        currentPose.current.z
      );
      modelRootRef.current.rotation.set(currentPose.current.rx, 0, currentPose.current.rz);
      modelRootRef.current.scale.setScalar(currentPose.current.s);

      spinGroupRef.current.rotation.set(
        0,
        currentPose.current.ry + scrollSpin + idleSpin + floatRot,
        0
      );
    }

    // Sync HTML Wrapper transparency directly for maximum performance
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = `${Math.min(1, Math.max(0, currentPose.current.opacity))}`;
      wrapperRef.current.style.visibility =
        currentPose.current.opacity > 0.02 ? "visible" : "hidden";
    }
  });

  return (
    <group ref={modelRootRef}>
      <group ref={spinGroupRef}>
        {/* orientGroup */}
        <group rotation={[Math.PI / 2, 0, 0.26]}>
          {/* counterOrientGroup */}
          <group rotation={[-Math.PI / 2, 0, 0]}>
            {/* normalizedModelGroup */}
            <group
              scale={normalizeScale.current}
              position={[
                -modelCenter.current.x,
                -modelCenter.current.y,
                -modelCenter.current.z,
              ]}
            >
              <primitive object={scene} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function PhoneCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const preWindowProgress = useRef(0);
  const windowDiveProgress = useRef(0);
  const windowDiveActive = useRef(false);
  const scrollProgress = useRef(0);

  useEffect(() => {
    // 1. ScrollTrigger for entry/approach (Top of page to end of Hero cloud dive)
    const triggerPre = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "+=1800",
      scrub: true,
      onUpdate: (self) => {
        preWindowProgress.current = self.progress;
      },
    });

    // 2. ScrollTrigger for the pinned text section (Window Dive)
    const triggerDive = ScrollTrigger.create({
      trigger: "#hero",
      start: "top+=1800 top",
      end: "+=1200",
      scrub: true,
      onUpdate: (self) => {
        windowDiveProgress.current = self.progress;
        windowDiveActive.current = self.isActive || (self.progress > 0 && self.progress < 1);
      },
    });

    // 3. Master ScrollTrigger for overall page scroll rotation
    const triggerMaster = ScrollTrigger.create({
      trigger: "#landing-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      triggerPre.kill();
      triggerDive.kill();
      triggerMaster.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
      style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.2s" }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: 4, // ACESFilmicToneMapping is 4
          outputColorSpace: "srgb",
        }}
        camera={{ position: [0, 0.18, 5.2], fov: 40, near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost. Hiding canvas wrapper.");
            if (wrapperRef.current) {
              wrapperRef.current.style.opacity = "0";
              wrapperRef.current.style.visibility = "hidden";
            }
          });
        }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[4.2, 5.2, 6.1]} intensity={2.35} />
        <directionalLight position={[-5.2, 2.6, -6.4]} intensity={1.25} />
        <pointLight position={[0.8, 1.4, 3.8]} intensity={1.35} />
        <pointLight position={[-0.5, -2.2, -2]} intensity={0.7} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Model
            preWindowProgress={preWindowProgress}
            windowDiveProgress={windowDiveProgress}
            windowDiveActive={windowDiveActive}
            scrollProgress={scrollProgress}
            wrapperRef={wrapperRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
