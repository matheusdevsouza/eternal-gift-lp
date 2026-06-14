// @ts-nocheck
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroStage from "./HeroStage";
import PhraseRevealStage from "./PhraseRevealStage";
import HowItWorksStage from "./HowItWorksStage";

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollJourneyProps {
  phonePose: React.RefObject<{
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    scale: number;
  }>;
  theme?: "light" | "dark";
}

export default function HeroScrollJourney({ phonePose, theme = "light" }: HeroScrollJourneyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  // Night-sky cloud variants when dark mode is active.
  const isDark = theme === "dark";
  const bgSrc = isDark ? "/background/darkmode/01_fundo_distante-dark.png" : "/background/01_fundo_distante.png";
  const midSrc = isDark ? "/background/darkmode/02_fundo_meio-dark.png" : "/background/02_nuvens_meio.png";
  const frontSrc = isDark ? "/background/darkmode/03_fundo_frente-dark.png" : "/background/03_nuvens_frente.png";
  // Cloud-interior overlay used in the dive transition (dark variant exists).
  const dentroSrc = isDark ? "/background/darkmode/dentro-nuvens.png" : "/background/nuvens/dentro-nuvens.png";

  const quote =
    "Flores morrem em dias. Perfumes evaporam. Roupas perdem a graça. Mas a memória de como você fez alguém se sentir... essa fica gravada para sempre. No final das contas, o que realmente importa não cabe em caixas ou embrulhos. Está na hora de parar de dar presentes sem alma e começar a eternizar o amor de verdade.";

  const wordsList = quote.split(" ");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Calculate radial vectors and distances for each character
      const letters = gsap.utils.toArray(".problem-letter");
      const textContainer = sectionRef.current.querySelector(".problem-overlay .max-w-3xl");
      
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      if (textContainer) {
        const containerRect = textContainer.getBoundingClientRect();
        centerX = containerRect.left + containerRect.width / 2;
        centerY = containerRect.top + containerRect.height / 2;
      }

      const lettersData = letters.map((el) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        let dx = elX - centerX;
        let dy = elY - centerY;
        
        if (dx === 0 && dy === 0) {
          dx = Math.random() - 0.5;
          dy = Math.random() - 0.5;
        }
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / distance;
        const uy = dy / distance;
        const flyDistance = 1150 + Math.random() * 300;
        
        return { el, distance, ux, uy, flyDistance };
      });

      const maxDistance = Math.max(...lettersData.map(d => d.distance), 1);

      // 2. Main Timeline Setup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000", // Pinned scroll distance extended for seamless text and how-it-works transition
          pin: true,
          scrub: 1, // Smooth scrolling lag
          invalidateOnRefresh: true,
          onLeave: () => {
            // Only the hero's fixed phone — never the in-card canvas (which shares
            // the generic .phone-canvas-wrapper class). Guard so GSAP never warns
            // about a missing target if the canvas hasn't mounted yet.
            if (document.querySelector(".hero-phone-canvas")) {
              gsap.set(".hero-phone-canvas", { display: "none" });
            }
          },
          onEnterBack: () => {
            if (document.querySelector(".hero-phone-canvas")) {
              gsap.set(".hero-phone-canvas", { display: "block" });
            }
          }
        },
      });

      // === STAGE 1 -> STAGE 2 TRANSITION ===
      // 1. Content fades out and slides up
      tl.to(".hero-content-to-fade", {
        opacity: 0,
        y: -100,
        scale: 0.95,
        ease: "power2.inOut",
        duration: 0.4
      }, 0);

      // 1b. Floating assets fade out (explicit fromTo so the resting state is always
      //     fully visible at scroll progress 0 — framer-motion owns their inner opacity,
      //     GSAP owns this wrapper opacity/translate, so there is no longer a conflict).
      tl.fromTo(".hero-floating-asset",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          ease: "power2.inOut",
          duration: 0.4
        }, 0);

      // 1c. Dark contrast overlay fades out
      tl.to(".hero-dark-overlay", {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.4
      }, 0);

      // Animate 3D Phone to the center, slightly behind text
      tl.to(phonePose.current, {
        x: 0,
        y: 0,
        z: -0.65,
        rx: 0.0,
        ry: Math.PI * 2 - 0.22, // 1 complete spin
        rz: 0.0,
        scale: 0.88,
        ease: "power2.inOut",
        duration: 1.2
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

      // === STAGE 2 -> STAGE 3 TRANSITION ===
      // 10. Dive Portal: zoom in the background representing the third section from the center
      tl.fromTo(".dive-portal-overlay",
        {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0
        },
        {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          ease: "power2.inOut",
          duration: 1.0
        },
        3.5
      );

      tl.fromTo(".dive-portal-img",
        { scale: 0.5 },
        { scale: 1.0, ease: "power2.inOut", duration: 1.0 },
        3.5
      );

      // Enable overflow visible on word containers so letters can fly off-screen without getting clipped
      tl.set(".problem-word-container", { overflow: "visible" }, 3.5);

      // Animate 3D Phone to the left side to balance cards in HowItWorksStage
      tl.to(phonePose.current, {
        x: -1.2, // Left side layout
        y: 0,
        z: 0.2,
        rx: 0.12,
        ry: Math.PI * 3.5, // organic spin during transition
        rz: -0.05,
        scale: 1.05,
        ease: "power2.inOut",
        duration: 1.0
      }, 3.3);

      // 11. Disassemble the problem text: fall down in a clean sequential wave (opposite of rising)
      tl.to(".problem-letter", {
        y: "110%",
        opacity: 0,
        stagger: 0.002, // elegant left-to-right cascade
        ease: "power2.in",
        duration: 0.45
      }, 3.6);

      // 12. Fade out problem section floating assets
      tl.to(".problem-floating-asset", {
        opacity: 0,
        scale: 0.8,
        ease: "power2.in",
        duration: 0.5
      }, 3.5);

      tl.to(".problem-overlay", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2
      }, 4.4);

      // === STAGE 3 ENTER ===
      // 13. Fade in the third section heading and step cards overlay
      tl.to(".como-funciona-overlay", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4
      }, 4.2);

      // 14. Stagger reveal of the step cards in the third section (explicit fromTo so
      //     it renders reliably from a clean hidden state, with a soft lift + scale).
      tl.fromTo(".como-funciona-step-card",
        { y: 64, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.14,
          ease: "power3.out",
          duration: 0.75
        }, 4.25);

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
      id="hero-journey"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 overflow-hidden pt-24 pb-12 z-[2]"
      style={{
        // Solid pink at the bottom so it connects seamlessly into the wave divider
        // at the top of the Features section below.
        background: "var(--sky)",
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full blur-[100px] z-[5] opacity-40 pointer-events-none select-none"
        style={{ background: "linear-gradient(to bottom, rgb(var(--c-primary) / 0.15), transparent)" }}
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
            src={bgSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Immersive Cloud Interior Transition Overlay (Pink Fog behind clouds) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-[2] hero-transition-overlay"
          style={{
            backgroundColor: "var(--sky)",
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
            src={dentroSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={midRef}
          className="absolute bottom-[-100px] left-0 w-full h-full pointer-events-none select-none z-[4]"
        >
          <img
            src={midSrc}
            alt=""
            className="w-full h-full object-cover float-mid-clouds scale-[1.15] origin-center"
          />
        </div>

        <div
          ref={frontRef}
          className="absolute bottom-[-150px] left-0 w-full h-full pointer-events-none select-none z-[5]"
        >
          <img
            src={frontSrc}
            alt=""
            className="w-full h-full object-cover float-front-clouds scale-[1.15] origin-center"
          />
        </div>
      </div>

      {/* Dive Portal Overlay (representing ComoFuncionaSection background) */}
      <div
        className="dive-portal-overlay absolute inset-0 z-[5.5] pointer-events-none select-none overflow-hidden opacity-0"
        style={{
          backgroundColor: "var(--sky)",
          clipPath: "circle(0% at 50% 50%)",
          WebkitClipPath: "circle(0% at 50% 50%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, transparent 100%)",
        }}
      >
        <img
          src={dentroSrc}
          alt=""
          className="dive-portal-img w-full h-full object-cover object-top opacity-[0.22]"
        />
        {/* Top Gradient matching ComoFuncionaSection */}
        <div
          className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-[6]"
          style={{
            background: "linear-gradient(to bottom, var(--sky), transparent)"
          }}
        />
      </div>

      {/* Subtle Dark Vignette / Gradient Overlay for Text Readability */}
      <div
        className="hero-dark-overlay absolute inset-0 z-[4] pointer-events-none bg-gradient-to-r from-black/40 via-black/15 to-transparent hidden lg:block"
      />
      <div
        className="hero-dark-overlay absolute inset-0 z-[4] pointer-events-none bg-black/35 lg:hidden"
      />

      {/* Stage 1: Hero Stage */}
      <HeroStage />

      {/* Stage 2: Phrase Reveal Stage */}
      <PhraseRevealStage wordsList={wordsList} />

      {/* Stage 3: How It Works Stage */}
      <HowItWorksStage />

      {/* Bottom Gradient for seamless transition to FeaturesSection (always rendered, unclipped) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[250px] pointer-events-none z-[5.8]"
        style={{
          background: "linear-gradient(to top, transparent 0%, var(--sky) 100%)"
        }}
      />
    </section>
  );
}
