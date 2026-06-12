// @ts-nocheck
"use client";

import { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneCanvas from "../three/PhoneCanvas";

gsap.registerPlugin(ScrollTrigger);

// ===========================================
// FLOATING ASSET COMPONENT
// ===========================================
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

// ===========================================
// MAIN HERO SECTION
// ===========================================
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  const quote =
    "Flores morrem em dias. Perfumes evaporam. Roupas perdem a graça. Mas a memória de como você fez alguém se sentir... essa fica gravada para sempre. No final das contas, o que realmente importa não cabe em caixas ou embrulhos. Está na hora de parar de dar presentes sem alma e começar a eternizar o amor de verdade.";

  const wordsList = quote.split(" ");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000", // Pinned scroll distance extended for seamless text transition
          pin: true,
          scrub: 1, // Smooth scrolling lag
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.set(".phone-canvas-wrapper", { display: "none" });
          },
          onEnterBack: () => {
            gsap.set(".phone-canvas-wrapper", { display: "flex" });
          }
        },
      });

      // 1. Content fades out and slides up
      tl.to(".hero-content-to-fade", {
        opacity: 0,
        y: -100,
        scale: 0.95,
        ease: "power2.inOut",
        duration: 0.4
      }, 0);

      // 1b. Floating assets fade out
      tl.to(".hero-floating-asset", {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        duration: 0.4
      }, 0);

      // 2. Sky background scales up and fades
      tl.to(bgRef.current, {
        scale: 1.3,
        y: -100,
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.8
      }, 0);

      // 3. Middle clouds scale and rise completely out of the screen
      tl.to(midRef.current, {
        scale: 2.2,
        y: "-120%",
        opacity: 0,
        ease: "power1.inOut",
        duration: 1.0
      }, 0);

      // 4. Front clouds scale massively and rise completely out of the screen
      tl.to(frontRef.current, {
        scale: 4.5,
        y: "-150%",
        opacity: 0,
        ease: "power2.inOut",
        duration: 1.0
      }, 0);

      // 5. Pink fog rolls in to cover everything except the phone (which sits on z-10)
      tl.to(".hero-transition-overlay", {
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.4
      }, 0.4);

      // 6. Cloud image within transition overlay fades in (very subtle, low opacity) together with the fog
      tl.to(".hero-transition-cloud-img", {
        opacity: 0.22,
        ease: "power2.inOut",
        duration: 0.4
      }, 0.4);

      // 7. Fade in the problem overlay/container
      tl.to(".problem-overlay", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.2
      }, 1.0);

      // 8. Character-by-character reveal of the text (coming up from below)
      tl.fromTo(".problem-letter",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.005, // 280 characters * 0.005s = 1.4s total stagger
          ease: "power2.out",
          duration: 0.25,
          clearProps: "transform" // Free GPU layer memory after animating
        },
        1.1
      );

      // 9. Fade in the problem floating assets
      tl.fromTo(".problem-floating-asset",
        { opacity: 0, scale: 0.8 },
        { opacity: 0.35, scale: 1, duration: 0.4 },
        1.2
      );

      // 10. Fade out and slide up the problem overlay to transition to ComoFuncionaSection
      tl.to(".problem-overlay", {
        opacity: 0,
        y: -80,
        ease: "power2.in",
        duration: 0.3
      }, 2.6);

      // Organic, slow drifting loops for clouds (using separate inner elements to avoid conflicts)
      gsap.to(".float-mid-clouds", {
        x: "+=75",
        y: "-=25",
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".float-front-clouds", {
        x: "-=95",
        y: "+=35",
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Organic, continuous floating animations for problem background assets
      gsap.to(".float-left-asset", {
        y: "-=30",
        x: "+=15",
        rotation: 6,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".float-right-asset", {
        y: "+=25",
        x: "-=20",
        rotation: -8,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 overflow-hidden pt-24 pb-12 z-[2]"
      style={{
        backgroundColor: "#D28F9A",
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full blur-[100px] z-[5] opacity-40 pointer-events-none select-none"
        style={{ background: "linear-gradient(to bottom, rgba(255, 51, 102, 0.15), transparent)" }}
      />

      {/* Parallax Background Layers Wrapper with CSS Mask to fade to transparent at the bottom */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[1]"
        style={{
          maskImage: "linear-gradient(to top, transparent 0px, rgba(0,0,0,1) 450px)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0px, rgba(0,0,0,1) 450px)",
        }}
      >
        {/* Parallax Background Layers */}
        <div
          ref={bgRef}
          className="absolute top-[-10%] left-0 w-full h-[130%] pointer-events-none select-none z-[1]"
        >
          <img
            src="/background/01_fundo_distante.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Immersive Cloud Interior Transition Overlay (Pink Fog behind clouds) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-[2] hero-transition-overlay"
          style={{
            backgroundColor: "#D28D96",
            opacity: 0,
          }}
        />

        {/* Cloud Interior Transition Image (behind front/mid clouds) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-[3] hero-transition-cloud-img"
          style={{
            opacity: 0,
          }}
        >
          <img
            src="/background/nuvens/dentro-nuvens.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={midRef}
          className="absolute bottom-[-100px] left-0 w-full h-full pointer-events-none select-none z-[4]"
        >
          <img
            src="/background/02_nuvens_meio.png"
            alt=""
            className="w-full h-full object-cover float-mid-clouds scale-[1.15] origin-center"
          />
        </div>

        <div
          ref={frontRef}
          className="absolute bottom-[-150px] left-0 w-full h-full pointer-events-none select-none z-[5]"
        >
          <img
            src="/background/03_nuvens_frente.png"
            alt=""
            className="w-full h-full object-cover float-front-clouds scale-[1.15] origin-center"
          />
        </div>
      </div>

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

      {/* Problem Section content integrated directly for a seamless transition */}
      <div
        className="problem-overlay absolute inset-0 z-[6] pointer-events-none flex items-center justify-center opacity-0"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Floating Background Assets */}
        <div className="problem-floating-asset absolute left-6 lg:left-16 top-[20%] w-24 md:w-36 lg:w-48 select-none pointer-events-none z-10 hidden md:block">
          <img
            src="/background/gift.webp"
            alt=""
            className="w-full h-auto object-contain float-left-asset"
          />
        </div>

        <div className="problem-floating-asset absolute right-6 lg:right-16 bottom-[20%] w-20 md:w-28 lg:w-36 select-none pointer-events-none z-10 hidden md:block">
          <img
            src="/background/balloon.webp"
            alt=""
            className="w-full h-auto object-contain float-right-asset"
          />
        </div>

        <div className="problem-floating-asset absolute left-[12%] bottom-[15%] w-20 md:w-28 lg:w-36 select-none pointer-events-none z-10 hidden md:block">
          <img
            src="/background/gift.webp"
            alt=""
            className="w-full h-auto object-contain float-left-asset"
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-20 text-center">
          {/* Editorial Text */}
          <div
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.3] text-center max-w-4xl mx-auto flex flex-wrap justify-center gap-x-[8px] gap-y-[4px]"
          >
            {wordsList.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden py-1">
                {word.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="problem-letter inline-block bg-gradient-to-b from-white via-[#FFF8F9] to-[#FDA4AF] bg-clip-text text-transparent"
                  >
                    {char}
                  </span>
                ))}
                {/* Space after the word */}
                {wordIdx < wordsList.length - 1 && (
                  <span className="problem-letter inline-block bg-gradient-to-b from-white via-[#FFF8F9] to-[#FDA4AF] bg-clip-text text-transparent">
                    &nbsp;
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
