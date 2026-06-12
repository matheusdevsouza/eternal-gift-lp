"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = textRef.current?.querySelectorAll(".word");
      if (!words) return;

      // Create scroll-driven reveal of words (editorial style) with pinning
      gsap.fromTo(
        words,
        {
          opacity: 0.15,
          y: 10,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Organic, continuous floating animations for background assets
      gsap.to(".float-left-asset", {
        y: "-=30",
        x: "+=15",
        rotation: 6,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".float-right-asset", {
        y: "+=25",
        x: "-=20",
        rotation: -8,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  const quote =
    "Flores morrem em dias. Perfumes evaporam. Roupas perdem a graça. Mas a memória de como você fez alguém se sentir... essa fica gravada para sempre. No final das contas, o que realmente importa não cabe em caixas ou embrulhos. Está na hora de parar de dar presentes sem alma e começar a eternizar o amor de verdade.";

  const wordsList = quote.split(" ");

  return (
    <section
      id="problema"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center py-24 bg-transparent border-y border-[#2D1318]/50 overflow-hidden"
    >
      <div className="glow-bg w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />

      {/* Floating Background Assets */}
      <div className="float-left-asset absolute left-6 lg:left-16 top-[20%] w-24 md:w-36 lg:w-48 select-none pointer-events-none opacity-20 hidden md:block">
        <img
          src="/background/heart-balloon.webp"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="float-right-asset absolute right-6 lg:right-16 bottom-[20%] w-20 md:w-28 lg:w-36 select-none pointer-events-none opacity-20 hidden md:block">
        <img
          src="/background/song.webp"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-20 text-center">
        {/* Editorial Text */}
        <div
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFF8F9] leading-[1.3] text-center max-w-4xl mx-auto flex flex-wrap justify-center gap-x-[12px] gap-y-[6px]"
        >
          {wordsList.map((word, idx) => {
            // Check if word is part of the final emotional statement "eternizar o amor de verdade." (last 5 words)
            const isGradient = idx >= wordsList.length - 5;
            return (
              <span
                key={idx}
                className={`word inline-block transition-all duration-300 ${
                  isGradient
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FDA4AF] font-black"
                    : ""
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
