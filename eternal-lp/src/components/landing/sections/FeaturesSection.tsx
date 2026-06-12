"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarRange, Sparkles, Heart, Shield } from "lucide-react";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-transparent border-b border-border/50 overflow-hidden"
    >
      <div className="glow-bg w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        {/* Section Header (Eyebrow tag removed) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
            Tudo o que você precisa para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">eternizar.</span>
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
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="feature-asymmetric-card group p-8 rounded-2xl bg-bg-card border border-border hover:border-primary/30 hover:bg-bg-card-hover shadow-xl shadow-[#FF3366]/[0.02] transition-all duration-300 flex flex-col justify-between h-[360px] overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Sempre online</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Sua homenagem é guardada na nuvem instantaneamente de forma segura. Sempre online, acessível de qualquer lugar do mundo.
                </p>
              </div>
              <div className="w-24 h-24 relative self-center mt-4 flex items-center justify-center">
                {/* Dog Mascot on Cloud (using dog-looking or dog-phone as placeholder) */}
                <Image
                  src="/mascote/looking.png"
                  alt="Mascote Nuvem"
                  fill
                  className="object-contain pointer-events-none select-none group-hover:scale-110 transition-transform duration-300"
                  sizes="96px"
                />
              </div>
            </motion.div>

            {/* Card 2: 100% Personalizável */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="feature-asymmetric-card group p-8 rounded-2xl bg-bg-card border border-border hover:border-primary/30 hover:bg-bg-card-hover shadow-xl shadow-[#FF3366]/[0.02] transition-all duration-300 flex flex-col justify-between h-[360px] overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">100% personalizável</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Escolha fotos, trilha sonora, cartas dinâmicas e contadores de tempo. Cada detalhe desenhado para mover sentimentos.
                </p>
              </div>
              <div className="w-24 h-24 relative self-center mt-4 flex items-center justify-center">
                {/* Dog Mascot Artist (using dog-writing as placeholder) */}
                <Image
                  src="/mascote/writing.png"
                  alt="Mascote Artista"
                  fill
                  className="object-contain pointer-events-none select-none group-hover:scale-110 transition-transform duration-300"
                  sizes="96px"
                />
              </div>
            </motion.div>

            {/* Card 4: Relembre seus melhores momentos (Spans 2 columns wide) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="feature-asymmetric-card group p-8 rounded-2xl bg-bg-card border border-border hover:border-primary/30 hover:bg-bg-card-hover shadow-xl shadow-[#FF3366]/[0.02] transition-all duration-300 flex flex-col justify-between md:col-span-2 h-[400px] overflow-hidden relative"
            >
              <div className="max-w-md z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Relembre seus melhores momentos</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  O presente digital que conecta o casal de forma imersiva e inesquecível, fazendo a pessoa amada se sentir verdadeiramente especial.
                </p>
              </div>

              {/* Three overlapping phone screens in the center/bottom */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-[220px] pointer-events-none select-none flex justify-center items-end">
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF3366] to-[#E91E63] flex items-center justify-center text-white font-extrabold text-xs">
                      L&Y
                    </div>
                    <span className="text-[9px] font-bold text-text-primary uppercase tracking-tight">Momento Especial</span>
                    <span className="text-[7px] text-text-secondary/55 font-mono -mt-1">Leonardo & Yasmin</span>
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
            </motion.div>

          </div>

          {/* COLUMN 3: Right side tall card */}
          {/* Card 3: Com uma Retrospectiva Única */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="feature-asymmetric-card group p-8 rounded-2xl bg-bg-card border border-border hover:border-primary/30 hover:bg-bg-card-hover shadow-xl shadow-[#FF3366]/[0.02] transition-all duration-300 flex flex-col justify-between h-[360px] lg:h-[792px] overflow-hidden relative col-span-1"
          >
            <div className="z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <CalendarRange className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary tracking-tight">Com uma retrospectiva única</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Linha do tempo animada e cronológica (linha do tempo) para reviver os melhores momentos da história de vocês.
              </p>
            </div>

            {/* Vertical phone mockup at the bottom */}
            <div className="w-[190px] sm:w-[210px] h-[340px] sm:h-[460px] bg-bg-deep border-2 border-border rounded-t-3xl shadow-2xl relative self-center mt-6 overflow-hidden flex flex-col group-hover:translate-y-[-8px] transition-transform duration-500">
              {/* Dynamic Island bar */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#1A1A1A] rounded-full absolute left-2" />
              </div>

              {/* Simulated Screen with metrics */}
              <div className="w-full h-full bg-bg-deep p-4 pt-12 flex flex-col gap-4 relative">
                {/* Yellow/Black Wave Card at the top */}
                <div className="w-full bg-bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden h-[180px] sm:h-[220px]">
                  {/* Yellowish accent lines simulating waves */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FF3366]/5 to-transparent" />
                  
                  <span className="text-[9px] uppercase tracking-widest text-primary font-bold mb-2">Horas Juntos</span>
                  
                  <span className="text-3xl sm:text-4xl font-black text-text-primary leading-none mb-2 tracking-tight">
                    39,670
                  </span>
                  
                  <span className="text-[8px] text-primary/80 flex items-center gap-1 mt-1 font-mono">
                    18% dos casais no mundo 🌟
                  </span>
                </div>

                {/* Additional metrics */}
                <div className="flex flex-col gap-2.5">
                  <div className="w-full p-3 bg-bg-card border border-border rounded-xl flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-medium">Fotos salvas</span>
                    <span className="text-primary font-bold">150+</span>
                  </div>
                  <div className="w-full p-3 bg-bg-card border border-border rounded-xl flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-medium">Cartas escritas</span>
                    <span className="text-primary font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
