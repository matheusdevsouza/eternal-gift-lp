"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      
      // 1. Staggered reveal of the logo scale and opacity
      gsap.fromTo(logoRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" }
      );

      // 2. Ticks from 00% to 100%
      gsap.to(obj, {
        val: 100,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = Math.floor(obj.val).toString().padStart(2, "0");
          if (percentRef.current) {
            percentRef.current.innerText = `${formatted}%`;
          }
        },
        onComplete: () => {
          // Awwwards premium transition: slide up curtain panel
          const tl = gsap.timeline({
            onComplete: () => {
              isFinishedRef.current = true;
              onComplete();
            },
          });

          // Logo slides up slightly and fades
          tl.to(logoRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.inOut",
          });

          // Panel slides up completely
          tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.0,
            ease: "power4.inOut",
          }, "-=0.35");
        },
      });

      // Subtle heartbeat pulsing loop for the logo
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });
    }, containerRef);

    return () => {
      if (!isFinishedRef.current) {
        ctx.revert();
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#D28D96] z-[9999] pointer-events-auto"
      style={{ transform: "translateY(0%)" }}
    >
      {/* Centered Minimal Logo */}
      <div ref={logoRef} className="flex flex-col items-center select-none pointer-events-none">
        <Image
          src="/logo.png"
          alt="Eternal"
          width={64}
          height={64}
          className="w-16 h-16 invert opacity-95"
          priority
        />
      </div>

      {/* Awwwards Minimalist Bottom-Right Percentage Counter */}
      <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 select-none pointer-events-none">
        <span
          ref={percentRef}
          className="text-sm md:text-base font-mono font-bold tracking-widest text-white/70"
        >
          00%
        </span>
      </div>
    </div>
  );
}
