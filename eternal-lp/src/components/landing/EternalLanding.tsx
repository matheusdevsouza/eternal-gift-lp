"use client";

import { useEffect, useState } from "react";
// @ts-ignore
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import EternalHeader from "./EternalHeader";
import EternalFooter from "./EternalFooter";

import HeroScrollJourney from "./sections/HeroScrollJourney";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import FAQSection from "./sections/FAQSection";
import FinalCTASection from "./sections/FinalCTASection";
import LoadingScreen from "./LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

export default function EternalLanding() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      document.body.style.backgroundColor = "#FFF8F9";
    }
  }, [loading]);

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
    <div id="landing-wrapper" className="relative w-full min-h-screen bg-bg-deep">
      {/* 0. Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <Image
          src="/background/pattern.webp"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover"
          style={{ opacity: 0.04 }}
          priority
        />
      </div>

      {/* 2. Global Header */}
      <EternalHeader />

      {/* 3. Sections Path */}
      <div className="relative z-20">
        <HeroScrollJourney />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </div>

      {/* 4. Global Footer */}
      <EternalFooter />

      {/* Premium Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    </div>
  );
}
