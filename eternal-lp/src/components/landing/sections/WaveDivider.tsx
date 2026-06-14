"use client";

/**
 * WaveDivider — a premium, multi-layer animated wave shape divider.
 *
 * The "sky" (the section above) crashes DOWN into this band with a wavy bottom
 * edge; everything below that edge is transparent, so the page's real fixed
 * background pattern shows through continuously (no duplicated/mismatched copy).
 * Three layers drift horizontally at different speeds and gently bob vertically.
 */

interface WaveDividerProps {
  /** Total height of the divider band, in px. */
  height?: number;
  className?: string;
}

const VIEW_W = 2880;
const VIEW_H = 160;
// Must be EVEN: the layer is 200% wide and loops by translateX(-50%) = one band
// width = PERIODS/2 wave periods. Even keeps that an integer -> seamless loop.
const PERIODS = 6;

// Wave path that fills the TOP region (sky), leaving a wavy bottom edge.
const generateWavePath = (
  width: number,
  height: number,
  baseY: number,
  amplitude: number,
  periods: number
) => {
  const periodWidth = width / periods;
  let path = `M 0 ${baseY}`;
  for (let i = 0; i < periods; i++) {
    const xStart = i * periodWidth;
    const xMid = xStart + periodWidth / 2;
    const xEnd = xStart + periodWidth;

    const peakY = baseY - amplitude;
    const troughY = baseY + amplitude;

    const cp1 = periodWidth * 0.16;
    const cp2 = periodWidth * 0.34;

    path += ` C ${xStart + cp1} ${peakY}, ${xStart + cp2} ${peakY}, ${xMid} ${baseY}`;
    path += ` C ${xMid + cp1} ${troughY}, ${xMid + cp2} ${troughY}, ${xEnd} ${baseY}`;
  }
  // Close to the TOP -> the upper region is filled (sky), the rest is transparent.
  path += ` L ${width} 0 L 0 0 Z`;
  return path;
};

interface LayerProps {
  fill: string;
  baseY: number;
  amplitude: number;
  loop: "left" | "right";
  loopDuration: number;
  bob: "a" | "b" | "c";
  bobDuration: number;
}

function WaveLayer({ fill, baseY, amplitude, loop, loopDuration, bob, bobDuration }: LayerProps) {
  return (
    <div
      // class contains "eternal-wave" so the prefers-reduced-motion rule in
      // globals.css can disable it.
      className="eternal-wave-layer"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "200%",
        height: "100%",
        animation: `eternal-wave-loop-${loop} ${loopDuration}s linear infinite`,
        willChange: "transform",
      }}
    >
      <div
        className="eternal-wave-bob"
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "top center",
          animation: `eternal-wave-bob-${bob} ${bobDuration}s ease-in-out infinite alternate`,
          willChange: "transform",
        }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          {/* fill via style so CSS var() colors resolve */}
          <path d={generateWavePath(VIEW_W, VIEW_H, baseY, amplitude, PERIODS)} style={{ fill }} />
        </svg>
      </div>
    </div>
  );
}

export default function WaveDivider({ height = 120, className = "" }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 top-0 w-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Back layer — translucent sky, slow drift, shallow reach */}
      <WaveLayer
        fill="rgb(var(--c-sky) / 0.4)"
        baseY={58}
        amplitude={30}
        loop="right"
        loopDuration={17}
        bob="c"
        bobDuration={5.6}
      />
      {/* Mid layer — more opaque sky */}
      <WaveLayer
        fill="rgb(var(--c-sky) / 0.7)"
        baseY={74}
        amplitude={26}
        loop="left"
        loopDuration={11.5}
        bob="b"
        bobDuration={4.6}
      />
      {/* Front layer — solid sky, deepest reach (crashes furthest down) */}
      <WaveLayer
        fill="var(--sky)"
        baseY={90}
        amplitude={24}
        loop="left"
        loopDuration={8.6}
        bob="a"
        bobDuration={3.4}
      />
    </div>
  );
}
