"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const layers = containerRef.current?.querySelectorAll(".solution-layer");
      if (!layers) return;

      layers.forEach((layer) => {
        gsap.fromTo(
          layer,
          {
            opacity: 0,
            y: 40,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: layer,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="solucao"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-32 bg-bg-deep"
    >
      <div className="glow-bg w-[500px] h-[500px] top-1/4 right-0 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        {/* Left Column (Reserved for the 3D iPhone) */}
        <div className="lg:col-span-5 h-[300px] lg:h-[500px] pointer-events-none relative flex justify-center items-center">
          <div className="glow-bg w-[300px] h-[300px] opacity-15" />
        </div>

        {/* Right Column (Solution narrative layers) */}
        <div className="lg:col-span-7 flex flex-col gap-16 text-left lg:pl-8">
          {/* Layer 1 */}
          <div className="solution-layer flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4">
              A Nova Forma de Presentear
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              Um santuário digital para os seus melhores momentos.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Eternal Gift é uma plataforma premium que transforma memórias
              espalhadas em uma página de homenagem impecável e personalizada.
              Uma obra de arte digital dedicada à pessoa que você ama.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="solution-layer flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4">
              Conexão Imediata
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              Pronto em menos de 5 minutos, guardado para sempre.
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Sem necessidade de habilidades técnicas. Envie suas fotos, grave
              uma mensagem sincera, escolha as músicas que marcaram sua jornada e
              crie um elo eterno acessível por um link ou QR Code exclusivo.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="solution-layer flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4">
              Impacto Emocional
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              Gere lágrimas sinceras de felicidade.
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Nossos usuários relatam que a surpresa entrega mais do que uma
              homenagem: é um abraço em forma de página, revivendo risadas,
              viagens e momentos inesquecíveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
