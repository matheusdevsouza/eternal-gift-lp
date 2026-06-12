"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PhoneCanvas from "../three/PhoneCanvas";

interface FloatingElementProps {
  src: string;
  className: string;
  delay?: number;
  duration?: number;
  yRange?: number;
  xRange?: number;
  rotateRange?: number;
  opacity?: number;
  blur?: string;
  size?: string;
}

function FloatingElement({
  src,
  className,
  delay = 0,
  duration = 20,
  yRange = 20,
  xRange = 0,
  rotateRange = 10,
  opacity = 0.4,
  blur = "0px",
  size = "w-32",
}: FloatingElementProps) {
  const entranceVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: delay * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={entranceVariants}
      className={className}
    >
      <motion.div
        animate={{
          y: yRange !== 0 ? [0, -yRange, 0] : 0,
          x: xRange !== 0 ? [0, xRange, 0] : 0,
          rotate: rotateRange !== 0 ? [-rotateRange / 2, rotateRange / 2, -rotateRange / 2] : 0,
        }}
        transition={{
          y: {
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
          },
          x: {
            duration: duration * 1.1,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: duration * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{ opacity: opacity }}
      >
        <img
          src={src}
          alt=""
          className={`${size} h-auto select-none pointer-events-none`}
          style={{ filter: blur !== "0px" ? `blur(${blur})` : "none" }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[40px] z-[-1] opacity-20"
          style={{ background: "#FF3366" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroStage() {
  return (
    <>
      {/* Floating Background Effects - Organic & Refined (Top layer z-5) */}
      <FloatingElement
        src="/background/gift.webp"
        className="hero-floating-asset absolute -left-10 md:-left-5 lg:left-4 top-[15%] pointer-events-none select-none hidden xl:block z-[5]"
        delay={0}
        duration={18}
        opacity={0.5}
        size="w-32 md:w-40 lg:w-48"
        blur="1px"
      />

      <FloatingElement
        src="/background/balloon.webp"
        className="hero-floating-asset absolute -right-10 md:-right-5 lg:right-4 top-[10%] pointer-events-none select-none hidden 2xl:block z-[5]"
        delay={2}
        duration={22}
        opacity={0.35}
        size="w-24 md:w-32 lg:w-40"
        blur="1.5px"
        rotateRange={25}
        yRange={40}
      />

      <FloatingElement
        src="/background/gift.webp"
        className="hero-floating-asset absolute right-[5%] bottom-[15%] pointer-events-none select-none hidden xl:block z-[5]"
        delay={4}
        duration={20}
        opacity={0.4}
        size="w-28 md:w-36 lg:w-44"
        blur="2px"
        rotateRange={15}
        xRange={-20}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-[5] hero-content-to-fade">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Column 1: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-1"
          >
            {/* Title & Description in layer z-3 (behind front clouds on layer z-4) */}
            <div className="relative z-[3]">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-black mb-6 lg:mb-8 leading-[1.05] tracking-tighter text-text-primary max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto lg:mx-0 xl:-mr-10 relative z-20"
              >
                Eternize histórias
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] via-[#FDA4AF] to-[#FF3366] bg-[length:200%_auto] animate-gradient block">
                  e emocione de verdade.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-lg sm:text-xl text-text-secondary mx-auto lg:mx-0 font-light leading-relaxed mb-10 max-w-2xl"
              >
                Esqueça os presentes comuns. Crie uma página interativa com fotos,
                vídeos, textos e uma trilha sonora marcante. Em menos de 5 minutos,
                você monta a homenagem perfeita que durará para sempre, para quem
                quer que seja.
              </motion.p>
            </div>

            {/* CTA Buttons in layer z-5 (above front clouds on layer z-4) */}
            <div className="relative z-[5]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <a
                  href="#pricing"
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#FF3366] to-[#E91E63] hover:opacity-90 text-white font-black rounded-xl transition-all shadow-xl shadow-[#FF3366]/20 hover:scale-105 active:scale-95 text-center min-w-[200px] flex items-center justify-center gap-3 group"
                >
                  Criar meu presente agora
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#features"
                  className="w-full sm:w-auto px-10 py-5 bg-bg-card border border-border hover:bg-bg-card-hover hover:border-primary text-text-primary font-black rounded-xl transition-all text-center min-w-[200px] flex items-center justify-center gap-3 group"
                >
                  Ver exemplo real
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2: Local 3D Phone Canvas (layer z-5) */}
          <div
            className="relative order-2 flex items-center justify-center lg:h-[100vh] w-full z-[5]"
            style={{ minHeight: "600px" }}
          >
            <div className="glow-bg w-[300px] h-[300px] opacity-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="w-full h-full max-w-[450px] aspect-square lg:aspect-auto lg:h-[700px] relative pointer-events-none">
              <PhoneCanvas />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
