"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Keep the latest onComplete in a ref so the GSAP timeline (built once) never
  // captures a stale closure and never needs to re-run when the parent re-renders.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useGSAP(
    () => {
      const container = containerRef.current;
      const logo = logoRef.current;
      const bar = barRef.current;
      if (!container || !logo || !bar) return;

      // Lock the starting state up-front to avoid any first-frame flash.
      gsap.set(container, { yPercent: 0, autoAlpha: 1 });
      gsap.set(logo, { scale: 0.9, autoAlpha: 0, y: 0 });
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const counter = { val: 0 };

      // A single master timeline drives everything in one continuous, smooth pass.
      const master = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => onCompleteRef.current(),
      });

      // 1. Reveal the logo gently.
      master.to(logo, { scale: 1, autoAlpha: 1, duration: 1.0 });

      // 2. Subtle, perpetual breathing on the logo (a separate, independent tween so
      //    it can run for the whole load without ever interrupting the master timeline).
      const breathe = gsap.to(logo, {
        scale: 1.045,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.0,
      });

      // 3. Count + progress bar fill, perfectly in sync, eased the whole way.
      master.to(
        counter,
        {
          val: 100,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate: () => {
            const formatted = Math.round(counter.val).toString().padStart(2, "0");
            if (percentRef.current) percentRef.current.innerText = `${formatted}`;
            if (barRef.current) gsap.set(barRef.current, { scaleX: counter.val / 100 });
          },
        },
        "-=0.65"
      );

      // 4. Premium curtain exit. Stop the breathing first so the logo lifts cleanly.
      master.add(() => breathe.kill(), ">-0.05");
      master.to(logo, { y: -40, autoAlpha: 0, duration: 0.6, ease: "power3.inOut" }, ">");
      master.to(
        [barRef.current, percentRef.current],
        { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" },
        "<"
      );
      master.to(
        container,
        { yPercent: -100, duration: 1.0, ease: "power4.inOut" },
        "-=0.3"
      );
    },
    { scope: containerRef } // no reactive deps -> built exactly once, never restarts
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex items-center justify-center z-[9999] pointer-events-auto overflow-hidden"
      style={{ backgroundColor: "var(--sky)", willChange: "transform" }}
    >
      {/* Soft radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 60%)",
        }}
      />

      {/* Centered Minimal Logo */}
      <div
        ref={logoRef}
        className="flex flex-col items-center select-none pointer-events-none relative z-10"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/logo.png"
          alt="Eternal"
          width={72}
          height={72}
          className="w-16 h-16 md:w-[72px] md:h-[72px] opacity-95"
          priority
        />
      </div>

      {/* Slim progress bar + percentage, bottom-aligned */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] md:w-[260px] flex flex-col items-center gap-3 select-none pointer-events-none">
        <div className="w-full h-[2px] rounded-full bg-white/15 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full rounded-full bg-white/80"
            style={{ willChange: "transform" }}
          />
        </div>
        <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-white/70">
          <span ref={percentRef}>00</span>
          <span className="text-white/40">%</span>
        </span>
      </div>
    </div>
  );
}
