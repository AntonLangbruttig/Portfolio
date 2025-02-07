"use client";
import { useState, useEffect } from "react";

// Global flag to track if the animation has already run
let hasAboutAnimationRun = false;

export const useAboutPageAnimation = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(!hasAboutAnimationRun);

  useEffect(() => {
    if (!hasAboutAnimationRun) {
      // Delay fade-in animation only on first load
      const timeout = setTimeout(() => {
        setFadeIn(true);
        hasAboutAnimationRun = true; // Mark animation as completed
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      setFadeIn(true); // Instantly show content if animation has already run
    }
  }, []);

  return { fadeIn, isFirstLoad };
};
