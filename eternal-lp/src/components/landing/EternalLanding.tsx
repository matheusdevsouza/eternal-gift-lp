"use client";

import { useEffect, useState, useRef, useCallback } from "react";
// @ts-ignore
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import EternalHeader from "./EternalHeader";
import EternalFooter from "./EternalFooter";

import { ThemeContext } from "./themeContext";
import HeroScrollJourney from "./sections/HeroScrollJourney";
import PhoneCanvas from "./three/PhoneCanvas";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import FAQSection from "./sections/FAQSection";
import FinalCTASection from "./sections/FinalCTASection";
import LoadingScreen from "./LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

type Theme = "light" | "dark";

export default function EternalLanding() {
  const [loading, setLoading] = useState(true);

  // Theme (light = day sky, dark = night sky). Initialized from localStorage
  // synchronously (this component is client-only via dynamic ssr:false).
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("eternal-theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("eternal-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  // Stable reference so the LoadingScreen's GSAP timeline is built only once.
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  // Initial hero pose: a prominent 3/4 product shot anchored to the RIGHT column.
  // The hero scroll journey then drifts it across the screen (right -> center ->
  // left) as the user scrolls — the awwwards-style scroll-reactive 3D motion.
  const phonePose = useRef({
    x: 1.3,
    y: 0,
    z: 0.15,
    rx: 0.1,
    ry: -0.45,
    rz: 0.0,
    scale: 1.12,
  });


  useEffect(() => {
    if (!loading) {
      // Theme-aware page backdrop (resolves the CSS var live, so it follows the theme).
      document.body.style.backgroundColor = "rgb(var(--c-bg-deep))";
      // Refresh ScrollTrigger after DOM updates and loading screen unmounts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
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
    <ThemeContext.Provider value={theme}>
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
      <EternalHeader theme={theme} onToggleTheme={toggleTheme} />


      {/* 3. Sections Path */}
      <div className="relative z-20">
        <HeroScrollJourney phonePose={phonePose} theme={theme} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </div>

      {/* 4. Global Footer */}
      <EternalFooter />

      {/* Global Pinned Phone Canvas - Rendered at root to bypass container transform glitches */}
      <PhoneCanvas poseRef={phonePose} />

      {/* Premium Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
    </div>
    </ThemeContext.Provider>
  );
}
