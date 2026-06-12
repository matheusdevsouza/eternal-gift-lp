// @ts-nocheck
"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3d/apple_iphone_17_pro_max.glb";

// Preload the model
useGLTF.preload(MODEL_PATH);

function Model({ wrapperRef }) {
  const { scene } = useGLTF(MODEL_PATH);
  
  const modelRootRef = useRef<THREE.Group>(null);
  const spinGroupRef = useRef<THREE.Group>(null);
  
  const modelCenter = useRef(new THREE.Vector3());
  const normalizeScale = useRef(1);
  const entryProgress = useRef(0);

  // Compute normalization and center on load
  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    box.getCenter(modelCenter.current);
    
    const maxSpan = Math.max(size.x, size.y, size.z, 0.001);
    const TARGET_MODEL_SPAN = 1.15;
    const MODEL_VISUAL_SCALE = 2.1; // Slightly larger for better local framing
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
  }, [scene]);

  useFrame((state) => {
    // 1. Entry animation progress
    if (entryProgress.current < 1) {
      entryProgress.current = Math.min(1, entryProgress.current + 0.02);
    }

    const easedEntry = 1 - Math.pow(1 - entryProgress.current, 3);
    const targetPose = {
      x: 0,
      y: 0,
      z: 0,
      rx: 0.12,  // Slight premium angle for presentation
      ry: -0.22,
      rz: 0.02,
      s: 1.0,
    };

    const spinFactor = 1 - easedEntry;
    const rx = targetPose.rx + spinFactor * Math.PI * 3.5;
    const ry = targetPose.ry + spinFactor * Math.PI * 5.0;
    const rz = targetPose.rz + spinFactor * Math.PI * 2.0;
    const scale = targetPose.s * easedEntry;

    // 2. Idle float and slow continuous rotation
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.5) * 0.05;
    const floatRot = Math.sin(time * 1.0) * 0.03;
    const idleSpin = time * 0.18; // slow organic spin

    if (modelRootRef.current && spinGroupRef.current) {
      modelRootRef.current.position.set(
        targetPose.x,
        targetPose.y + floatY,
        targetPose.z
      );
      modelRootRef.current.rotation.set(rx, 0, rz);
      modelRootRef.current.scale.setScalar(scale);

      spinGroupRef.current.rotation.set(
        0,
        ry + idleSpin + floatRot,
        0
      );
    }

    // Sync opacity directly on wrapper element
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = `${easedEntry}`;
      wrapperRef.current.style.visibility = easedEntry > 0.02 ? "visible" : "hidden";
    }
  });

  return (
    <group ref={modelRootRef}>
      <group ref={spinGroupRef}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
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

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full min-h-[500px] lg:min-h-[600px] pointer-events-none select-none"
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
        camera={{ position: [0, 0.08, 5.0], fov: 40, near: 0.1, far: 100 }}
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
        <ambientLight intensity={1.1} />
        <directionalLight position={[4.2, 5.2, 6.1]} intensity={2.4} />
        <directionalLight position={[-5.2, 2.6, -6.4]} intensity={1.3} />
        <pointLight position={[0.8, 1.4, 3.8]} intensity={1.4} />
        <pointLight position={[-0.5, -2.2, -2]} intensity={0.7} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Model wrapperRef={wrapperRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
