"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pinned scrolling timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stage 1 Text: Starts visible, fades out
      tl.to(".stage-1", { opacity: 0, y: -40, duration: 1 })

        // Stage 2 Text: Fades in, stays, fades out
        .fromTo(
          ".stage-2",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.2"
        )
        .to(".stage-2", { opacity: 0, y: -40, duration: 1 }, "+=0.8")

        // Stage 3 Text: Fades in and stays
        .fromTo(
          ".stage-3",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="storytelling"
      className="relative bg-transparent w-full"
    >
      <div
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        <div className="glow-bg w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-20 pointer-events-none">
          {/* Left space / background space for 3D Phone to interact */}
          <div className="lg:col-span-5 h-[300px] lg:h-[500px]" />

          {/* Right column with absolute-positioned text stages */}
          <div className="lg:col-span-7 relative flex items-center justify-center h-[350px] lg:h-[450px]">
            {/* Stage 1: Focus */}
            <div className="stage-1 absolute w-full max-w-xl text-center px-6 py-10 glass-card rounded-2xl pointer-events-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight mb-6 leading-tight">
                Entre no <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">coração</span> do presente.
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                Quando seu ente querido clica no QR Code ou abre o link, a página
                carrega com uma transição cinematográfica. A trilha sonora começa
                a tocar sutilmente e a caixa de memórias é revelada.
              </p>
            </div>

            {/* Stage 2: Rotate */}
            <div className="stage-2 absolute w-full max-w-xl text-center opacity-0 px-6 py-10 glass-card rounded-2xl pointer-events-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight mb-6 leading-tight">
                Sofisticação <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">digital</span> em cada pixel.
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                Fotos e vídeos ganham molduras premium. Cada palavra escrita é
                destacada com tipografia impecável, cercada por micro-animações
                e glows sutis no fundo.
              </p>
            </div>

            {/* Stage 3: Shift */}
            <div className="stage-3 absolute w-full max-w-xl text-center opacity-0 px-6 py-10 glass-card rounded-2xl pointer-events-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight mb-6 leading-tight">
                Um presente <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">inesquecível</span> e eterno.
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                É a conexão do físico com o digital. Um abraço em forma de link,
                salvo para sempre nos servidores da nuvem, pronto para ser
                revisitado a qualquer momento da vida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
