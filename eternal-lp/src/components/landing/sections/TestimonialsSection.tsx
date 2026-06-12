"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Testimonial {
  name: string;
  relation: string;
  story: string;
  date: string;
}

const renderRow = (direction: "left" | "right", isEven: boolean) => {
  const baseWords = ["DEPOIMENTOS", "DEPOIMENTOS", "DEPOIMENTOS", "DEPOIMENTOS", "DEPOIMENTOS", "DEPOIMENTOS"];

  const renderInner = () => (
    <div style={{ display: "flex", gap: "3.2rem", paddingRight: "3.2rem" }}>
      {baseWords.map((word, wIdx) => {
        const isOutline = isEven ? wIdx % 2 === 0 : wIdx % 2 !== 0;
        return (
          <span
            key={wIdx}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(5.5rem, 9.5vw, 11rem)",
              fontWeight: 900,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: isOutline ? "transparent" : "rgba(255, 51, 102, 0.015)",
              WebkitTextStroke: isOutline ? "0.8px rgba(255, 51, 102, 0.012)" : "none",
              userSelect: "none",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: "flex", overflow: "hidden", width: "100%" }}>
      <div
        className={`testimonials-bg-marquee-track testimonials-bg-marquee-track--${direction}`}
        style={{
          display: "flex",
          width: "max-content",
        }}
      >
        {renderInner()}
        {renderInner()}
      </div>
    </div>
  );
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="w-[280px] sm:w-[320px] bg-white text-text-primary p-5 pb-8 rounded-sm shadow-xl flex flex-col justify-between transform rotate-[-1deg] odd:rotate-[1.5deg] hover:rotate-0 hover:scale-105 transition-all duration-300 select-none border border-border"
      style={{ flexShrink: 0 }}
    >
      {/* Polaroid Photo Area */}
      <div className="w-full aspect-square bg-bg-deep rounded-sm mb-5 relative overflow-hidden flex flex-col items-center justify-center p-4 border border-border">
        {/* Couple profile mock */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF3366] to-[#E91E63] flex items-center justify-center text-white font-extrabold text-xl mb-3 shadow-md">
          {t.name
            .split("&")
            .map((n) => n.trim()[0])
            .join("")}
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#FF3366] uppercase mb-1">
          {t.relation}
        </span>
        <span className="text-[9px] text-text-muted font-mono">
          {t.date}
        </span>

        {/* Heart SVG badge overlay */}
        <div className="absolute top-3 right-3 text-[#FF3366]">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Testimonial text */}
      <p className="text-sm text-text-secondary leading-relaxed font-medium italic mb-6">
        &ldquo;{t.story}&rdquo;
      </p>

      {/* Polaroid Handwriting Footer */}
      <div className="border-t border-border pt-4 flex justify-between items-center">
        <span className="font-serif italic text-lg font-bold text-text-primary tracking-tight">
          {t.name}
        </span>
        <div className="flex text-[#FF3366]">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      name: "Mariana & Bruno",
      relation: "3 Anos de Namoro",
      story:
        "Entreguei o QR Code em um cartão de madeira personalizado. Quando ela abriu e a música começou a tocar, ela chorou muito. Foi o presente mais especial que já dei.",
      date: "12/06/2025",
    },
    {
      name: "Roberto & Sofia",
      relation: "25 Anos de Casamento",
      story:
        "Meus filhos criaram essa página reunindo fotos de toda a nossa jornada familiar. Reviver 25 anos em um link dinâmico foi a surpresa mais linda que já recebemos.",
      date: "18/10/2025",
    },
    {
      name: "Luana & Camila",
      relation: "Melhores Amigas",
      story:
        "Fiz para o aniversário de 30 anos dela com fotos da nossa infância. Ela disse que foi infinitamente melhor do que qualquer presente físico. Ficamos horas relembrando.",
      date: "04/02/2026",
    },
    {
      name: "Carlos & Clara",
      relation: "Dia dos Namorados",
      story:
        "A facilidade de montar é impressionante. Colei o QR Code em uma caixa de bombons e a reação dela foi inesquecível. Eternal Gift realmente eterniza o afeto.",
      date: "12/06/2025",
    },
    {
      name: "Helena",
      relation: "Dia das Mães",
      story:
        "Criei em 5 minutos no celular. Minha mãe compartilha o link com toda a família até hoje. É mais do que um presente, é um arquivo de carinho guardado na nuvem.",
      date: "10/05/2026",
    },
  ];

  const row1Base = [testimonials[0], testimonials[1], testimonials[2], testimonials[4]];
  const row2Base = [testimonials[3], testimonials[4], testimonials[1], testimonials[0]];

  const row1 = [...row1Base, ...row1Base, ...row1Base];
  const row2 = [...row2Base, ...row2Base, ...row2Base];

  useGSAP(
    () => {
      // Autoplay marquee loop for Row 1 (moving rightwards)
      gsap.fromTo(
        row1Ref.current,
        { x: "-33.3333%" },
        {
          x: "0%",
          duration: 35,
          ease: "none",
          repeat: -1,
        }
      );

      // Autoplay marquee loop for Row 2 (moving leftwards)
      gsap.fromTo(
        row2Ref.current,
        { x: "0%" },
        {
          x: "-33.3333%",
          duration: 35,
          ease: "none",
          repeat: -1,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative overflow-hidden py-24 flex flex-col gap-12"
    >
      <style>{`
        @keyframes testimonials-scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes testimonials-scroll-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .testimonials-bg-marquee-track--left {
          animation: testimonials-scroll-left 45s linear infinite;
        }
        .testimonials-bg-marquee-track--right {
          animation: testimonials-scroll-right 45s linear infinite;
        }
      `}</style>

      {/* Background Slanted Marquees */}
      <div
        className="testimonials-bg-marquee-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.2rem",
          transform: "rotate(-7deg) scale(1.15)",
          transformOrigin: "center center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {renderRow("left", true)}
        {renderRow("right", false)}
        {renderRow("left", true)}
        {renderRow("right", false)}
        {renderRow("left", true)}
        {renderRow("right", false)}
      </div>

      {/* Centered Heading */}
      <div className="text-center max-w-3xl mx-auto px-6 z-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
          Lágrimas de felicidade e <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#E91E63]">conexões eternizadas.</span>
        </h2>
        <p className="mt-4 text-text-secondary text-base md:text-lg">
          Veja o que dizem as pessoas que já receberam e enviaram homenagens através da Eternal Gift.
        </p>
      </div>

      {/* Horizontal Track Wrapper */}
      <div className="relative w-full overflow-hidden py-4 flex flex-col gap-8">
        {/* Left & Right transparent gradients (large, starting at absolute screen edges) */}
        <div className="absolute inset-y-0 left-0 w-[240px] sm:w-[380px] testimonials-gradient-left z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[240px] sm:w-[380px] testimonials-gradient-right z-30 pointer-events-none" />

        {/* Row 1: Slides to the right */}
        <div className="relative w-full overflow-hidden py-10">
          <div
            ref={row1Ref}
            className="flex gap-6 sm:gap-8 w-max px-0"
          >
            {row1.map((t, idx) => (
              <TestimonialCard key={idx} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2: Slides to the left */}
        <div className="relative w-full overflow-hidden py-10">
          <div
            ref={row2Ref}
            className="flex gap-6 sm:gap-8 w-max px-0"
          >
            {row2.map((t, idx) => (
              <TestimonialCard key={idx} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
