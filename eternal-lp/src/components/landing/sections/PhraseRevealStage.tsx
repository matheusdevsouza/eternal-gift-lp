"use client";

interface PhraseRevealStageProps {
  wordsList: string[];
}

export default function PhraseRevealStage({ wordsList }: PhraseRevealStageProps) {
  return (
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
            <span key={wordIdx} className="problem-word-container inline-block whitespace-nowrap overflow-hidden py-1">
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
  );
}
