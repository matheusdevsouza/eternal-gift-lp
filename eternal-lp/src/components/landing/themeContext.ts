"use client";

import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext<Theme>("light");
export const useTheme = (): Theme => useContext(ThemeContext);

// Light asset path -> dark ("night") variant (in /background/darkmode/).
const DARK_ASSETS: Record<string, string> = {
  "/background/balloon.webp": "/background/darkmode/balloon.png",
  "/background/gift.webp": "/background/darkmode/gift.png",
  "/background/heart.webp": "/background/darkmode/heart.png",
  "/background/star.png": "/background/darkmode/star.png",
  "/background/heart-balloon.webp": "/background/darkmode/heart-balloon.png",
  "/background/hearts.png": "/background/darkmode/hearts.png",
  "/background/question.webp": "/background/darkmode/question.png",
};

/** Returns the night-mode variant of an asset when in dark theme, else the original. */
export function themedAsset(src: string, theme: Theme): string {
  return theme === "dark" && DARK_ASSETS[src] ? DARK_ASSETS[src] : src;
}
