"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CalendarRange, Sparkles, Heart, Shield } from "lucide-react";
import FloatingHoverAssets from "./FloatingHoverAssets";
import PhoneCanvas from "../three/PhoneCanvas";
import WaveDivider from "./WaveDivider";

interface FeatureCardProps {
  children: React.ReactNode;
  cardIndex: number;
  className?: string;
  shouldClip?: boolean;
  initialDelay?: number;
}

function FeatureCard({ children, cardIndex, className = "", shouldClip = false, initialDelay = 0 }: FeatureCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: initialDelay, ease: "easeOut" }}
      className={`relative w-full ${className}`}
      style={{ overflow: "visible", zIndex: isHovered ? 30 : 1 }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full h-full rounded-2xl bg-bg-card border border-border hover:border-primary/40 hover:bg-bg-card-hover shadow-xl shadow-primary/[0.02] hover:shadow-[0_20px_50px_rgb(var(--c-primary)/0.08)] hover:-translate-y-2 transition-all duration-300 select-none flex flex-col justify-between"
        style={{ overflow: shouldClip ? "hidden" : "visible" }}
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

        {shouldClip ? (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden relative rounded-2xl p-8 z-10">
            {children}
          </div>
        ) : (
          <div className="p-8 flex flex-col justify-between w-full h-full flex-1 relative z-10">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-screen pt-44 md:pt-48 pb-24 bg-transparent overflow-hidden"
    >
      {/* Animated wave divider — blends the sky journey above into the section below
          (theme-aware via CSS vars) */}
      <WaveDivider height={120} className="z-[1]" />

      <div className="glow-bg w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Section Header (Eyebrow tag removed) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
            Tudo o que você precisa para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">eternizar.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
            Combinamos design editorial minimalista com tecnologia imersiva para criar homenagens insubstituíveis.
          </p>
        </div>

        {/* Asymmetric Grid (3 columns layout using Framer Motion for highly robust rendering) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1 & COLUMN 2 (Left and Middle) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Sempre Online (Online Forever) */}
            <FeatureCard cardIndex={0} className="h-[300px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Sempre online</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Sua homenagem é guardada na nuvem instantaneamente de forma segura. Sempre online, acessível de qualquer lugar do mundo.
                </p>
              </div>
            </FeatureCard>

            {/* Card 2: 100% Personalizável */}
            <FeatureCard cardIndex={1} className="h-[300px]" initialDelay={0.1}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">100% personalizável</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Escolha fotos, trilha sonora, cartas dinâmicas e contadores de tempo. Cada detalhe desenhado para mover sentimentos.
                </p>
              </div>
            </FeatureCard>

            {/* Card 3: Relembre seus melhores momentos (Spans 2 columns wide) */}
            <FeatureCard cardIndex={2} className="md:col-span-2 h-[400px]" shouldClip={false} initialDelay={0.2}>
              <div className="max-w-md z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Relembre seus melhores momentos</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  O presente digital que conecta o casal de forma imersiva e inesquecível, fazendo a pessoa amada se sentir verdadeiramente especial.
                </p>
              </div>

              {/* Clip wrapper for phone mockups at the bottom matching card border radius */}
              <div className="absolute bottom-0 inset-x-0 h-[240px] overflow-hidden rounded-b-2xl pointer-events-none select-none">
                {/* Three overlapping phone screens in the center/bottom */}
                <div className="absolute bottom-[-64px] left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-[240px] flex justify-center items-end">
                  {/* Phone Left */}
                  <div className="w-[120px] sm:w-[140px] h-[220px] bg-bg-deep border border-border rounded-t-2xl shadow-2xl relative overflow-hidden transform -rotate-12 translate-x-10 translate-y-6 group-hover:translate-x-6 group-hover:translate-y-3 transition-transform duration-500">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full" />
                    <div className="p-3 pt-6 flex flex-col gap-2">
                      <div className="w-full h-20 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-[8px] text-primary uppercase font-black">
                        Nossa História
                      </div>
                      <div className="w-10/12 h-2 bg-border rounded-sm" />
                      <div className="w-8/12 h-2 bg-border rounded-sm" />
                      <div className="w-9/12 h-2 bg-border rounded-sm" />
                    </div>
                  </div>

                  {/* Phone Middle (Front) */}
                  <div className="w-[130px] sm:w-[150px] h-[240px] bg-bg-card border-2 border-primary/30 rounded-t-2xl shadow-2xl relative overflow-hidden z-10 transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full" />
                    <div className="p-3 pt-7 flex flex-col items-center gap-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center text-white font-extrabold text-xs">
                        L&Y
                      </div>
                      <span className="text-[9px] font-bold text-text-primary uppercase tracking-tight">Momento Especial</span>
                      <span className="text-[7px] text-text-primary/55 font-mono -mt-1">Leonardo & Yasmin</span>
                      <div className="w-full p-2 py-3 bg-bg-deep border border-border rounded-lg mt-1 flex flex-col items-center">
                        <span className="text-[12px] font-black text-primary leading-none">670</span>
                        <span className="text-[5px] text-text-secondary uppercase tracking-widest mt-1">dias juntos</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone Right */}
                  <div className="w-[120px] sm:w-[140px] h-[220px] bg-bg-deep border border-border rounded-t-2xl shadow-2xl relative overflow-hidden transform rotate-12 -translate-x-10 translate-y-6 group-hover:-translate-x-6 group-hover:translate-y-3 transition-transform duration-500">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full" />
                    <div className="p-3 pt-6 flex flex-col gap-2">
                      <div className="w-full h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center text-[8px] text-primary uppercase font-black">
                        Playlist de Amor
                      </div>
                      <div className="w-7/12 h-2 bg-border rounded-sm" />
                      <div className="w-9/12 h-2 bg-border rounded-sm" />
                      <div className="w-6/12 h-2 bg-border rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </FeatureCard>

          </div>

          {/* COLUMN 3: Right side tall card */}
          {/* Card 4: Com uma Retrospectiva Única */}
          <FeatureCard cardIndex={3} className="col-span-1 h-[360px] lg:h-[732px]" initialDelay={0.3}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <CalendarRange className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Com uma retrospectiva única</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Linha do tempo animada e cronológica (linha do tempo) para reviver os melhores momentos da história de vocês.
              </p>
            </div>

            {/* Live 3D Phone Model Canvas in the card container */}
            <div className="w-full flex-1 min-h-[300px] lg:min-h-[460px] relative pointer-events-none mt-6 overflow-hidden rounded-xl">
              <PhoneCanvas isFixed={false} />
            </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
}
