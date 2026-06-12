"use client";

import { useEffect } from "react";
// @ts-ignore
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import EternalHeader from "./EternalHeader";
import EternalFooter from "./EternalFooter";
import PhoneCanvas from "./three/PhoneCanvas";

import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import ComoFuncionaSection from "./sections/ComoFuncionaSection";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import FAQSection from "./sections/FAQSection";
import FinalCTASection from "./sections/FinalCTASection";

gsap.registerPlugin(ScrollTrigger);

export default function EternalLanding() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Optimize GSAP performance
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once everything loads
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="landing-wrapper" className="relative w-full min-h-screen bg-[#0F0507]">
      {/* 0. Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <Image
          src="/background/pattern.webp"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover"
          style={{ opacity: 0.03 }}
          priority
        />
      </div>

      {/* 1. Global Fixed R3F Phone Canvas */}
      <PhoneCanvas />

      {/* 2. Global Header */}
      <EternalHeader />

      {/* 3. Sections Path */}
      <div className="relative z-20">
        <HeroSection />
        <ProblemSection />
        <ComoFuncionaSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </div>

      {/* 4. Global Footer */}
      <EternalFooter />
    </div>
  );
}
