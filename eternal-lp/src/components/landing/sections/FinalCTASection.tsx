"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate heart image particles floating up/orbiting
      gsap.to(".heart-particle", {
        y: "-=120",
        x: "random(-30, 30)",
        rotation: "random(-60, 60)",
        opacity: 0,
        stagger: {
          each: 0.15,
          repeat: -1,
        },
        duration: "random(3, 5)",
        ease: "power1.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="final-cta"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-transparent text-center overflow-hidden border-t border-border/50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="glow-bg w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

        {/* Orbiting Heart Particles (Images) */}
        {[...Array(35)].map((_, i) => {
          const leftPos = `${5 + Math.random() * 90}%`;
          const topPos = `${15 + Math.random() * 70}%`;
          const scale = 0.4 + Math.random() * 0.7;
          return (
            <div
              key={i}
              className="heart-particle absolute w-8 h-8 opacity-40 pointer-events-none"
              style={{
                left: leftPos,
                top: topPos,
                transform: `scale(${scale})`,
              }}
            >
              <Image
                src="/background/heart.webp"
                alt="Heart"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-20 flex flex-col items-center">
        {/* Emotional Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-text-primary leading-none mb-6 max-w-2xl">
          Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">emocionar</span> quem você ama?
        </h2>

        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-12">
          Não deixe sentimentos para depois. Crie uma homenagem inesquecível em
          menos de 5 minutos e gere lembranças para a vida inteira.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-6">
          <a
            href="#pricing"
            className="px-10 py-5 bg-gradient-to-r from-[#FF3366] to-[#E91E63] hover:opacity-90 text-white font-black rounded-xl transition-all shadow-xl shadow-[#FF3366]/20 hover:scale-105 active:scale-95 text-center min-w-[200px] flex items-center justify-center gap-3 group"
          >
            Criar Homenagem
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
