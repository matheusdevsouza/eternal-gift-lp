"use client";

import { useState, useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import FloatingHoverAssets from "./FloatingHoverAssets";

interface PricingCardProps {
  children: React.ReactNode;
  cardIndex: number;
  className?: string;
}

function PricingCard({ children, cardIndex, className = "" }: PricingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for parallax mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative p-8 sm:p-10 rounded-[2.25rem] transition-all duration-500 select-none flex flex-col justify-between h-full ${className}`}
      style={{ overflow: "visible", zIndex: isHovered ? 30 : 1 }}
    >
      {/* Floating Hover Assets Layer */}
      <FloatingHoverAssets
        isHovered={isHovered}
        isMobile={isMobile}
        shouldReduceMotion={!!shouldReduceMotion}
        springX={springX}
        springY={springY}
        cardIndex={cardIndex}
      />

      {/* Visual content container */}
      <div className="relative z-10 flex flex-col justify-between h-full flex-1">
        {children}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const premiumFeatures = [
    "Página ativa por 1 ano",
    "Até 50 fotos e 5 vídeos",
    "Trilha sonora de fundo dedicada",
    "QR Code em alta definição",
    "Painel intuitivo de edição",
  ];

  const eternalFeatures = [
    "Página ativa para sempre",
    "Mídias (fotos/vídeos) ilimitadas",
    "Trilha sonora de fundo dedicada",
    "QR Code HD + link personalizado",
    "Painel intuitivo de edição",
    "Atualizações ilimitadas",
    "Suporte prioritário via WhatsApp",
  ];

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-28 md:py-32 overflow-hidden bg-transparent"
    >
      {/* Giant Watermark Text Background */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black text-text-primary/[0.04] tracking-tighter leading-none select-none pointer-events-none z-0">
        PLANOS
      </div>

      {/* Ambient background glows (soft, light) */}
      <div className="absolute top-[38%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-accent/25 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[62%] right-[22%] translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-primary/15 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
            Escolha como{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              eternizar suas memórias.
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
            Sem mensalidades recorrentes. Pagamento único com acesso completo.
          </p>
        </div>

        {/* Content Layout - Centered Plans */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10">
          {/* Plan 1: Premium */}
          <PricingCard
            cardIndex={4}
            className="bg-bg-card border border-border shadow-[0_20px_50px_-20px_rgba(45,19,24,0.12)] hover:shadow-[0_30px_60px_-20px_rgba(45,19,24,0.18)] hover:-translate-y-2"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-black text-text-primary mb-1">Premium</h4>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                  Ideal para datas especiais com lembranças focadas.
                </p>

                <div className="flex items-baseline gap-1 mb-8 text-text-primary">
                  <span className="text-lg font-bold text-text-muted">R$</span>
                  <span className="text-6xl font-black tracking-tighter">49</span>
                  <span className="text-2xl font-black">,90</span>
                  <span className="text-[11px] text-text-secondary ml-3 border border-border bg-bg-section px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Taxa única
                  </span>
                </div>

                {/* Features list */}
                <ul className="flex flex-col gap-5 mb-12">
                  {premiumFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary stroke-[3]" />
                      </div>
                      <span className="text-text-primary/85 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#pricing"
                className="w-full text-center py-4 font-bold text-sm text-text-primary bg-bg-card border border-border hover:border-primary hover:bg-bg-card-hover rounded-xl transition-all duration-300 block hover:scale-[1.02] active:scale-[0.98]"
              >
                Escolher Premium
              </a>
            </div>
          </PricingCard>

          {/* Plan 2: Eternal (Recommended) */}
          <PricingCard
            cardIndex={5}
            className="bg-bg-card border-2 border-primary/40 shadow-[0_25px_60px_-20px_rgb(var(--c-primary)/0.28)] hover:border-primary/60 hover:shadow-[0_35px_70px_-20px_rgb(var(--c-primary)/0.38)] hover:-translate-y-2"
          >
            {/* internal soft glow */}
            <div className="absolute top-0 right-0 w-[220px] h-[220px] rounded-full blur-[90px] bg-primary/10 pointer-events-none group-hover:bg-primary/15 transition-colors duration-500" />

            {/* Recommended Badge */}
            <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-primary to-primary-dark text-white text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg shadow-primary/30 z-20">
              Mais Escolhido
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div>
                <h4 className="text-2xl font-black text-text-primary mb-1">Eternal</h4>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                  Para guardar e alimentar suas memórias de forma perpétua.
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-lg font-bold text-text-muted">R$</span>
                  <span className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-dark bg-[length:200%_auto] animate-gradient">
                    79
                  </span>
                  <span className="text-2xl font-black text-primary">,90</span>
                  <span className="text-[11px] text-primary ml-3 border border-primary/25 bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                    Taxa única
                  </span>
                </div>

                {/* Features list */}
                <ul className="flex flex-col gap-5 mb-12">
                  {eternalFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 flex-shrink-0 shadow-[0_0_10px_rgb(var(--c-primary)/0.18)]">
                        <Check className="w-3 h-3 text-primary stroke-[3]" />
                      </div>
                      <span className="text-text-primary font-semibold">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#pricing"
                className="w-full text-center py-4 font-black text-sm text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-[0_10px_25px_-8px_rgb(var(--c-primary)/0.5)] hover:shadow-[0_14px_30px_-8px_rgb(var(--c-primary)/0.6)] transition-all duration-300 block hover:scale-[1.02] active:scale-[0.98]"
              >
                Garantir Presente Eternal
              </a>
            </div>
          </PricingCard>
        </div>
      </div>
    </section>
  );
}
