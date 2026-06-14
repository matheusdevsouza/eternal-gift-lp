"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Como o destinatário acessa a homenagem?",
      answer:
        "Você receberá um link exclusivo e um QR Code em alta definição. Você pode imprimir o QR Code em cartões, álbuns, porta-retratos ou presentes físicos. Quando a pessoa escanear com a câmera do celular, ela será direcionada instantaneamente para a experiência com música e fotos.",
    },
    {
      question: "Posso alterar as fotos e músicas depois de criar?",
      answer:
        "Sim, com certeza! Ao adquirir qualquer plano, você terá acesso a um painel de controle exclusivo. Nele, você pode adicionar ou remover fotos, atualizar as mensagens e trocar a música de fundo a qualquer momento, e a página do presente será atualizada em tempo real.",
    },
    {
      question: "O presente realmente fica ativo para sempre?",
      answer:
        "Sim! No Plano Eternal, a página é hospedada de forma perpétua em servidores seguros na nuvem sem nenhuma cobrança adicional ou assinatura recorrente. É um pagamento único para um presente vitalício.",
    },
    {
      question: "Quais formatos de arquivo posso enviar?",
      answer:
        "Nossa plataforma aceita imagens (JPG, PNG, WebP, HEIC) e vídeos gravados pelo celular. Para a trilha de áudio, você pode escolher de uma lista de músicas premium selecionadas ou fazer o envio do seu próprio arquivo de música instrumental ou canção favorita.",
    },
    {
      question: "Existe alguma taxa ou assinatura oculta?",
      answer:
        "Absolutamente nenhuma. Nosso modelo de negócios é baseado exclusivamente em pagamento único. Você escolhe o plano (Premium ou Eternal), paga uma vez e o presente é seu, sem taxas extras ou surpresas na fatura.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-24 bg-transparent"
    >
      <div className="glow-bg w-[400px] h-[400px] bottom-0 right-0 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">frequentes</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
            Tudo o que você precisa saber para criar uma surpresa inesquecível.
          </p>
        </div>

        {/* Centered Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-border pb-4 last:border-b-0"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-lg text-text-primary hover:text-primary transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <Plus
                    className={`text-primary w-6 h-6 transform transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-60 opacity-100 mt-2"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="py-2 text-base text-text-secondary leading-relaxed max-w-2xl">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Support CTA — gradient-bordered card faithful to the brand */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="relative rounded-[2rem] p-[1.5px] bg-gradient-to-br from-primary/40 via-accent/25 to-transparent shadow-[0_30px_60px_-30px_rgb(var(--c-primary)/0.3)]">
            <div className="relative rounded-[1.9rem] bg-gradient-to-br from-bg-card to-bg-section px-7 py-9 md:px-10 md:py-10 flex flex-col sm:flex-row items-center gap-7 md:gap-9 overflow-hidden group">
              {/* Soft ambient glow */}
              <div className="absolute -top-12 -right-10 w-60 h-60 rounded-full bg-primary/10 blur-[90px] pointer-events-none group-hover:bg-primary/15 transition-colors duration-500" />

              {/* Mascot */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0">
                <Image
                  src="/mascote/looking.png"
                  alt="Suporte Eternal Gift"
                  fill
                  className="object-contain drop-shadow-[0_14px_28px_rgba(210,141,150,0.32)]"
                  sizes="144px"
                />
              </div>

              <div className="flex-1 text-center sm:text-left relative z-10">
                <h3 className="text-2xl md:text-[1.7rem] font-black text-text-primary mb-2.5 tracking-tight leading-tight">
                  Ainda tem alguma dúvida?
                </h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-md mx-auto sm:mx-0">
                  A gente adora ajudar. Fale com nossa equipe e crie, do começo ao fim,
                  a homenagem perfeita para quem você ama.
                </p>
                <a
                  href="mailto:contato@eternalgift.com.br"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-[0_12px_28px_-10px_rgb(var(--c-primary)/0.5)] hover:shadow-[0_16px_32px_-10px_rgb(var(--c-primary)/0.6)] hover:scale-105 active:scale-95 group/btn"
                >
                  Falar com o suporte
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
