"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface EternalHeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: "#problema", label: "O Problema" },
  { href: "#features", label: "Recursos" },
  { href: "#storytelling", label: "A Jornada" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#pricing", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

function ThemeToggle({
  theme,
  onToggleTheme,
  className = "",
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo noturno"}
      title={theme === "dark" ? "Modo claro" : "Modo noturno"}
      className={`relative w-9 h-9 flex items-center justify-center text-text-primary hover:text-primary transition-colors duration-300 active:scale-90 ${className}`}
    >
      <Sun
        className={`w-[19px] h-[19px] absolute transition-all duration-300 ${
          theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`w-[19px] h-[19px] absolute transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />
    </button>
  );
}

export default function EternalHeader({ theme, onToggleTheme }: EternalHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // logo.png is white -> invert it to a dark logo in light mode; keep it white in dark.
  const logoFilter = theme === "dark" ? "" : "invert";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Frosted backdrop on its own layer, masked to fade out at the edges so it
            never shows a hard "border" line (the issue was the blur panel's edge). */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 backdrop-blur-md transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)",
          }}
        />
        <div
          className={`mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "max-w-5xl" : "max-w-7xl"
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/logo.png"
              alt="Eternal Gift"
              width={36}
              height={36}
              className={`w-9 h-9 transition-transform duration-300 group-hover:scale-105 ${logoFilter}`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-primary/75 hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#pricing"
              className="hidden sm:inline-flex px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white rounded-xl text-sm font-bold transition-all shadow-[0_4px_15px_rgb(var(--c-primary)/0.3)] hover:shadow-[0_4px_20px_rgb(var(--c-primary)/0.4)] hover:scale-105 active:scale-95"
            >
              Criar homenagem
            </a>

            {/* Theme toggle (icon only) */}
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="md:hidden w-9 h-9 flex items-center justify-center text-text-primary hover:text-primary transition-colors active:scale-90"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] md:hidden flex flex-col overflow-y-auto"
            style={{
              background:
                "linear-gradient(to bottom, var(--sky) 0%, rgb(var(--c-bg-deep)) 70%)",
            }}
          >
            {/* Ambient glow */}
            <div className="glow-bg w-[480px] h-[480px] top-[-10%] right-[-20%]" />

            {/* Top bar */}
            <div className="relative flex items-center justify-between px-6 py-6 shrink-0">
              <Image
                src="/logo.png"
                alt="Eternal Gift"
                width={36}
                height={36}
                className={`w-9 h-9 ${logoFilter}`}
              />
              <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="w-9 h-9 flex items-center justify-center text-text-primary hover:text-primary transition-colors active:scale-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Links */}
            <motion.nav
              className="relative flex-1 flex flex-col justify-center gap-1 px-7"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between py-3 border-b border-border/60"
                >
                  <span className="text-3xl font-black tracking-tight text-text-primary group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <span className="text-text-muted font-mono text-xs">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            {/* CTA footer */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-7 pb-10 pt-4 shrink-0"
            >
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-base font-black transition-all shadow-[0_10px_30px_-8px_rgb(var(--c-primary)/0.5)] active:scale-95"
              >
                Criar homenagem
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-center text-xs text-text-muted mt-4">
                Pagamento único · Sem mensalidades
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
