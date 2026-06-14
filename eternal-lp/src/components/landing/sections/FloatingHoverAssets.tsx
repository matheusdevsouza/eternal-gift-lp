"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useTheme, themedAsset } from "../themeContext";

interface FloatingHoverAssetsProps {
  isHovered: boolean;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  cardIndex: number;
}

interface AssetConfig {
  src: string;
  targetX: number;
  targetY: number;
  initialRotate: number;
  parallaxFactorX: number;
  parallaxFactorY: number;
  floatDuration: number;
  sizeClass: string;
  marginOffset: number; // half of element width/height in pixels to center it
}

const getAssetsConfig = (cardIndex: number): AssetConfig[] => {
  const variations = [
    // Card Variation 0
    [
      { src: "/background/balloon.webp", targetX: -150, targetY: -190, initialRotate: -15, parallaxFactorX: 25, parallaxFactorY: 25, floatDuration: 3.5, sizeClass: "w-24 h-24", marginOffset: -48 },
      { src: "/background/gift.webp", targetX: 150, targetY: -190, initialRotate: 12, parallaxFactorX: -18, parallaxFactorY: 22, floatDuration: 4.2, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/heart.webp", targetX: -155, targetY: 20, initialRotate: -8, parallaxFactorX: 28, parallaxFactorY: -15, floatDuration: 3.0, sizeClass: "w-16 h-16", marginOffset: -32 },
      { src: "/background/star.png", targetX: 150, targetY: 190, initialRotate: 25, parallaxFactorX: -15, parallaxFactorY: -25, floatDuration: 5.0, sizeClass: "w-16 h-16", marginOffset: -32 },
    ],
    // Card Variation 1
    [
      { src: "/background/balloon.webp", targetX: -140, targetY: -185, initialRotate: 10, parallaxFactorX: 18, parallaxFactorY: 28, floatDuration: 4.0, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/gift.webp", targetX: 160, targetY: -190, initialRotate: -15, parallaxFactorX: -25, parallaxFactorY: 25, floatDuration: 3.8, sizeClass: "w-24 h-24", marginOffset: -48 },
      { src: "/background/heart.webp", targetX: -150, targetY: -30, initialRotate: 18, parallaxFactorX: 24, parallaxFactorY: -18, floatDuration: 3.2, sizeClass: "w-16 h-16", marginOffset: -32 },
      { src: "/background/star.png", targetX: 145, targetY: 180, initialRotate: -20, parallaxFactorX: -12, parallaxFactorY: -20, floatDuration: 4.5, sizeClass: "w-20 h-20", marginOffset: -40 },
    ],
    // Card Variation 2
    [
      { src: "/background/balloon.webp", targetX: -145, targetY: -190, initialRotate: -20, parallaxFactorX: 22, parallaxFactorY: 22, floatDuration: 3.8, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/gift.webp", targetX: 150, targetY: -180, initialRotate: 8, parallaxFactorX: -20, parallaxFactorY: 18, floatDuration: 4.6, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/heart.webp", targetX: -155, targetY: 45, initialRotate: -15, parallaxFactorX: 26, parallaxFactorY: -22, floatDuration: 3.5, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/star.png", targetX: 150, targetY: 185, initialRotate: 15, parallaxFactorX: -18, parallaxFactorY: -18, floatDuration: 4.2, sizeClass: "w-16 h-16", marginOffset: -32 },
    ],
    // Card Variation 3
    [
      { src: "/background/balloon.webp", targetX: -140, targetY: -180, initialRotate: 15, parallaxFactorX: 15, parallaxFactorY: 28, floatDuration: 4.2, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/gift.webp", targetX: 155, targetY: -195, initialRotate: -10, parallaxFactorX: -24, parallaxFactorY: 24, floatDuration: 3.5, sizeClass: "w-24 h-24", marginOffset: -48 },
      { src: "/background/heart.webp", targetX: -150, targetY: -10, initialRotate: 10, parallaxFactorX: 30, parallaxFactorY: -15, floatDuration: 3.8, sizeClass: "w-20 h-20", marginOffset: -40 },
      { src: "/background/star.png", targetX: 140, targetY: 190, initialRotate: -15, parallaxFactorX: -20, parallaxFactorY: -20, floatDuration: 4.8, sizeClass: "w-16 h-16", marginOffset: -32 },
    ],
  ];

  return variations[cardIndex % variations.length];
};

export default function FloatingHoverAssets({
  isHovered,
  isMobile,
  shouldReduceMotion,
  springX,
  springY,
  cardIndex,
}: FloatingHoverAssetsProps) {
  const theme = useTheme();
  const assets = getAssetsConfig(cardIndex);

  // If prefers-reduced-motion is active, render only simple opacity transitions
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0">
        {assets.map((asset, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute ${asset.sizeClass} pointer-events-none select-none`}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: `${asset.marginOffset}px`,
              marginTop: `${asset.marginOffset}px`,
              transform: `translate(${asset.targetX}px, ${asset.targetY}px) rotate(${asset.initialRotate}deg)`,
            }}
          >
            <img src={themedAsset(asset.src, theme)} alt="" className="w-full h-full object-contain" />
          </motion.div>
        ))}
      </div>
    );
  }

  // Mobile layout: render static decorative floating elements with low opacity and no movement
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0">
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`absolute ${asset.sizeClass} pointer-events-none select-none opacity-25`}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: `${asset.marginOffset}px`,
              marginTop: `${asset.marginOffset}px`,
              transform: `translate(${asset.targetX}px, ${asset.targetY}px) rotate(${asset.initialRotate}deg) scale(0.85)`,
            }}
          >
            <img src={themedAsset(asset.src, theme)} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    );
  }

  // Desktop layout: premium hover parallax, scale, rotate, and floating loop
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {assets.map((asset, index) => {
        // Compute interactive mouse parallax offsets using MotionValue spring hooks
        const translateX = useTransform(springX, [-0.5, 0.5], [-asset.parallaxFactorX, asset.parallaxFactorX]);
        const translateY = useTransform(springY, [-0.5, 0.5], [-asset.parallaxFactorY, asset.parallaxFactorY]);

        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: 0,
              y: 0,
              rotate: asset.initialRotate - 20,
            }}
            animate={
              isHovered
                ? {
                    opacity: 1,
                    scale: 1.05,
                    x: asset.targetX,
                    y: asset.targetY,
                    rotate: asset.initialRotate,
                  }
                : {
                    opacity: 0,
                    scale: 0.3,
                    x: 0,
                    y: 0,
                    rotate: asset.initialRotate - 20,
                  }
            }
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 240,
              mass: 0.4,
            }}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: `${asset.marginOffset}px`,
              marginTop: `${asset.marginOffset}px`,
            }}
            className={`absolute ${asset.sizeClass} pointer-events-none select-none`}
          >
            {/* Parallax layer wrapper */}
            <motion.div
              style={{
                x: translateX,
                y: translateY,
              }}
              className="w-full h-full relative"
            >
              {/* Inner loop animation for continuous floating feel */}
              <motion.div
                animate={
                  isHovered
                    ? {
                        y: [0, -6, 0],
                        rotate: [0, 4, 0],
                      }
                    : {
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  y: {
                    duration: asset.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: asset.floatDuration * 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="w-full h-full relative"
              >
                <img
                  src={themedAsset(asset.src, theme)}
                  alt=""
                  className="w-full h-full object-contain drop-shadow-md filter blur-[0.2px] hover:blur-none transition-[filter] duration-300"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
