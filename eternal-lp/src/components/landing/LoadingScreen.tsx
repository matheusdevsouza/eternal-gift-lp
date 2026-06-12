"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Progress count animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const current = Math.floor(obj.val);
          if (percentRef.current) percentRef.current.innerText = `${current}%`;
          if (progressRef.current) progressRef.current.style.width = `${current}%`;
        },
        onComplete: () => {
          // Exit animations when progress is 100%
          const tl = gsap.timeline({
            onComplete: onComplete,
          });

          // Text and logo fade out first
          tl.to([logoRef.current, textRef.current], {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.inOut",
          });

          // The whole screen slides up / fades out with a curtain effect
          tl.to(containerRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut",
          }, "-=0.2");
        },
      });

      // 2. Pulse heartbeat animation on the logo
      gsap.to(".heart-logo", {
        scale: 1.15,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#D28F9A] via-[#D28D96] to-[#E5A4B0] z-[9999] pointer-events-auto"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF3366] opacity-20 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FDA4AF] opacity-25 blur-[120px] pointer-events-none select-none" />

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center max-w-sm px-6 text-center z-10">
        {/* Glowing Heart Logo */}
        <div ref={logoRef} className="relative mb-8">
          <div className="heart-logo w-24 h-24 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl shadow-[#FF3366]/20">
            <svg
              className="w-12 h-12 text-white fill-current drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20" />
        </div>

        {/* Loading details */}
        <div ref={textRef} className="w-full">
          <h1 className="text-white text-2xl font-black tracking-tight mb-2">
            Eternal Gift
          </h1>
          <p className="text-white/70 text-sm font-medium mb-6">
            Eternizando sua história de amor...
          </p>

          {/* Progress Bar Container */}
          <div className="relative w-full h-1.5 bg-black/10 rounded-full overflow-hidden mb-3">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full w-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center px-1">
            <span className="text-xs text-white/50 font-bold uppercase tracking-wider">
              Carregando
            </span>
            <span
              ref={percentRef}
              className="text-sm text-white font-mono font-black"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
