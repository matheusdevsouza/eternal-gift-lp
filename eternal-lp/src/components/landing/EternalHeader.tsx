"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function EternalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div
        className={`mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "max-w-5xl" : "max-w-7xl"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Eternal Gift"
            width={36}
            height={36}
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-105 invert"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#problema"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            O Problema
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            Recursos
          </a>
          <a
            href="#storytelling"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            A Jornada
          </a>
          <a
            href="#depoimentos"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            Depoimentos
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            Planos
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <div>
          <a
            href="#pricing"
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF3366] to-[#E91E63] hover:opacity-90 text-white rounded-xl text-sm font-bold transition-all shadow-[0_4px_15px_rgba(255,51,102,0.25)] hover:shadow-[0_4px_20px_rgba(255,51,102,0.35)] hover:scale-105 active:scale-95"
          >
            Criar Homenagem
          </a>
        </div>
      </div>
    </header>
  );
}
