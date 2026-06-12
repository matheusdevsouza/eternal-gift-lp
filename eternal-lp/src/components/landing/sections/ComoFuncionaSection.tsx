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
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
      style={{
        backgroundColor: "#D28D96",
      }}
    >
      {/* Background Image of cloud transition */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none">
        <img
          src="/background/nuvens/transicao-nuvens.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-[0.22]"
        />
      </div>

      {/* Gradient transition at the top (to blend with HeroSection) */}
      <div
        className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to bottom, #D28D96, transparent)"
        }}
      />

      {/* Gradient transition at the bottom (to blend with FeaturesSection) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[250px] pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, #FFF8F9, transparent)"
        }}
      />

      <div className="glow-bg w-[500px] h-[500px] top-10 right-10 opacity-5 z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Section Heading (Eyebrow tag removed) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
            Como funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">experiência.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
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
              className="step-card group relative p-8 rounded-2xl bg-bg-card border border-border hover:border-primary/30 hover:bg-bg-card-hover shadow-xl shadow-[#FF3366]/[0.02] transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ y: -6 }}
            >
              {/* Step number badge */}
              <span className="absolute top-6 left-6 font-mono font-black text-2xl text-primary/20 group-hover:text-primary/40 transition-colors">
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
              <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
