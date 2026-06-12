"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

export default function ComoFuncionaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section
      id="como-funciona"
      ref={containerRef}
      className="relative py-24 bg-transparent border-b border-[#2D1318]/50 overflow-hidden"
    >
      <div className="glow-bg w-[500px] h-[500px] top-10 right-10 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Section Heading (Eyebrow tag removed) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFF8F9] tracking-tight leading-tight">
            Como funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FDA4AF]">experiência.</span>
          </h2>
          <p className="mt-4 text-[#FFF8F9]/60 text-base md:text-lg">
            Em menos de 5 minutos você cria uma homenagem marcante que ficará guardada na memória para sempre.
          </p>
        </div>

        {/* Steps Grid (Using Framer Motion whileInView for 100% reliable animations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: "easeOut" }}
              className="step-card group relative p-8 rounded-2xl bg-[#1A0B0E]/60 border border-[#2D1318] hover:border-[#FF3366]/30 hover:bg-[#2D1318]/40 shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ y: -6 }}
            >
              {/* Step number badge */}
              <span className="absolute top-6 left-6 font-mono font-black text-2xl text-[#FF3366]/20 group-hover:text-[#FF3366]/40 transition-colors">
                {step.number}
              </span>

              {/* Mascot illustration */}
              <div className="w-40 h-40 relative mb-6 flex items-center justify-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                  sizes="160px"
                  priority
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-[#FFF8F9] group-hover:text-[#FF3366] transition-colors tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#FFF8F9]/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
