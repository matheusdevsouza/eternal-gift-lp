"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import FloatingHoverAssets from "./FloatingHoverAssets";

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

function HowItWorksCard({ step, idx }: { step: Step; idx: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for parallax mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configurations for premium organic movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="como-funciona-step-card opacity-0 relative w-full flex flex-col h-full p-[1px] rounded-2xl bg-gradient-to-br from-white/30 dark:from-white/10 to-transparent hover:from-primary/30 hover:to-accent/20 transition-[background,box-shadow] duration-500 shadow-xl shadow-primary/[0.01] hover:shadow-[0_20px_50px_rgb(var(--c-primary)/0.06)]"
      style={{ overflow: "visible", zIndex: isHovered ? 30 : 1 }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full flex-1 flex flex-col items-center text-center p-8 rounded-2xl bg-bg-card/70 backdrop-blur-md hover:bg-bg-card/95 transition-all duration-300 select-none border border-white/20 dark:border-white/10 hover:border-primary/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
        style={{ overflow: "visible" }}
      >
        {/* Floating elements layer */}
        <FloatingHoverAssets
          isHovered={isHovered}
          isMobile={isMobile}
          shouldReduceMotion={!!shouldReduceMotion}
          springX={springX}
          springY={springY}
          cardIndex={idx}
        />

        {/* Mascot illustration — enlarged, no circular pedestal */}
        <div className="w-40 h-40 lg:w-44 lg:h-44 relative mb-6 z-10 pointer-events-none select-none group-hover:scale-105 transition-transform duration-300 ease-out">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-contain pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(210,141,150,0.28)]"
            sizes="(min-width: 1024px) 176px, 160px"
            priority
          />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold mb-3 text-text-primary group-hover:text-primary transition-colors tracking-tight z-10 pointer-events-none">
          {step.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed z-10 pointer-events-none mb-6">
          {step.description}
        </p>

        {/* Step number badge - now placed at the bottom, centered */}
        <div className="mt-auto pt-6 flex justify-center w-full z-10">
          <span className="px-3 py-1 text-[10px] font-mono font-black tracking-widest rounded-full bg-primary/5 text-primary border border-primary/10 transition-colors">
            PASSO {step.number}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksStage() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Escreva sua homenagem",
      description:
        "Comece colocando em palavras as memórias e sentimentos mais sinceros que você compartilha com quem ama.",
      image: "/mascote/writing.png",
    },
    {
      number: "02",
      title: "Personalize do seu jeito",
      description:
        "Adicione as melhores fotos de vocês, escolha a música de fundo perfeita e personalize cada pequeno detalhe.",
      image: "/mascote/gift.png",
    },
    {
      number: "03",
      title: "Gere o link e QR Code",
      description:
        "Nossa plataforma cria instantaneamente uma página online exclusiva e gera um QR Code pronto para ser entregue.",
      image: "/mascote/phone.png",
    },
    {
      number: "04",
      title: "Emocione quem você ama",
      description:
        "Entregue o presente e veja a pessoa reviver a história de vocês através de uma experiência imersiva e inesquecível.",
      image: "/mascote/looking.png",
    },
  ];

  return (
    <div
      className="como-funciona-overlay absolute inset-0 z-[12] pointer-events-none flex items-center justify-center opacity-0"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Como funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">experiência.</span>
          </h2>
          <p className="mt-4 text-white/80 text-base md:text-lg">
            Em menos de 5 minutos você cria uma homenagem marcante que ficará guardada na memória para sempre.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <HowItWorksCard key={idx} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
