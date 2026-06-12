"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade-in pricing elements
      gsap.from(".pricing-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 bg-transparent"
    >
      <div className="glow-bg w-[400px] h-[400px] top-1/3 left-1/4 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 pricing-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            Escolha como <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">eternizar</span> suas memórias.
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
            Sem mensalidades recorrentes. Pagamento único com acesso completo.
          </p>
        </div>

        {/* Content Layout - Centered Plans */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start pricing-fade">
          {/* Plan 1: Premium */}
          <div className="glass-card p-8 sm:p-10 rounded-2xl border border-border bg-bg-card/70 text-left flex flex-col justify-between h-full relative">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#FF3366] uppercase block mb-2">
                Plano Tradicional
              </span>
              <h4 className="text-2xl font-black text-text-primary mb-4">
                Premium
              </h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm font-bold text-text-muted">R$</span>
                <span className="text-5xl font-black text-text-primary">49</span>
                <span className="text-lg font-bold text-text-primary">,90</span>
                <span className="text-xs text-text-muted ml-2">Pág. único</span>
              </div>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Ideal para datas sazonais específicas com lembranças focadas.
              </p>

              {/* Features list */}
              <ul className="flex flex-col gap-3.5 mb-8">
                {[
                  "Página ativa por 1 ano",
                  "Até 50 fotos e 5 vídeos",
                  "Trilha sonora de fundo dedicada",
                  "QR Code em alta definição",
                  "Painel intuitivo de edição",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#FF3366] flex-shrink-0" />
                    <span className="text-text-secondary">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="w-full text-center py-4 font-bold text-sm text-text-primary bg-bg-card border border-border hover:bg-bg-card-hover hover:border-primary rounded-xl transition-all duration-300 block"
            >
              Escolher Premium
            </a>
          </div>

          {/* Plan 2: Eternal */}
          <div className="glass-card p-8 sm:p-10 rounded-2xl border-2 border-primary bg-bg-card/90 text-left flex flex-col justify-between h-full relative shadow-[0_12px_40px_rgba(255,51,102,0.06)]">
            {/* Recommended Badge */}
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#FF3366] to-[#E91E63] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-lg">
              Mais Escolhido
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#FF3366] uppercase block mb-2">
                Sem data de expiração
              </span>
              <h4 className="text-2xl font-black text-text-primary mb-4">
                Eternal
              </h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm font-bold text-text-muted">R$</span>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">
                  79
                </span>
                <span className="text-lg font-bold text-primary">,90</span>
                <span className="text-xs text-text-muted ml-2">Pág. único</span>
              </div>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Para guardar e alimentar suas memórias de forma perpétua.
              </p>

              {/* Features list */}
              <ul className="flex flex-col gap-3.5 mb-8">
                {[
                  "Página ativa para sempre",
                  "Mídias (fotos/vídeos) ilimitadas",
                  "Trilha sonora de fundo dedicada",
                  "QR Code HD + link personalizado",
                  "Painel intuitivo de edição",
                  "Atualizações ilimitadas",
                  "Suporte prioritário via WhatsApp",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#FF3366] flex-shrink-0" />
                    <span className="text-text-primary font-semibold">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="w-full text-center py-4 font-bold text-sm text-white bg-gradient-to-r from-[#FF3366] to-[#E91E63] hover:opacity-90 rounded-xl shadow-lg shadow-[#FF3366]/20 transition-all duration-300 block"
            >
              Garantir Presente Eternal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
