"use client";

import { useState, useEffect } from "react";
import { animationSequence } from "../utils/animation";
import { SIDENAV_ITEMS } from "@/constants";
import "@/styles/globals.css";
import MenuItem from "../utils/menu-item";

export default function ViewWindow() {
  const [infoText, setInfoText] = useState("");
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  useEffect(() => {
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText,
      setImageLines,
      500,
      2000,
      1000,
      500,
      200
    );

    const navTimeout = setTimeout(() => {
      setShowNav(true);

      let startTime: number | null = null;
      const duration = 1000; // 1 second
      const animateOpacity = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const newOpacity = Math.min(progress / duration, 1);
        setNavOpacity(newOpacity);

        if (progress < duration) {
          requestAnimationFrame(animateOpacity);
        }
      };

      requestAnimationFrame(animateOpacity);
    }, 5000);

    return () => {
      clearTimeout(navTimeout);
    };
  }, []);

  return (
    <div className="bg-transparent h-screen ml-11 hidden lg:block">
      <div className={`relative w-full h-full aspect-video rounded-lg overflow-hidden shadow-lg
          ${showBackground ? "old-tv-background shadow-tv-glow" : "shadow-none"}
          ${animationState === "static" ? "tv-static" : ""}
          ${animationState === "screenOn" ? "tv-flicker" : ""}
          ${animationState === "content" ? "screen-on" : ""}
          transition-all duration-500 ease-out rounded-sm`}
      >
        {showLine && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className="animate-draw" x1="0" y1="0" x2="0" y2="100" stroke="#00ffff" strokeWidth="1.2"/>
            <line className="animate-draw" x1="100" y1="0" x2="100" y2="100" stroke="#00ffff" strokeWidth="1.2"/>
          </svg>
        )}
        <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%] before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_30%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]"></div>

        {showNav && (
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-0 nav-container
            ${showNav ? "visible" : ""}`}
          style={{ "--nav-opacity": navOpacity } as React.CSSProperties}
        >
            <nav className="flex flex-col -mt-[284px] z-10 ml-0 ">
              {SIDENAV_ITEMS.map((item, idx) => (
                <MenuItem key={idx} item={item} />
              ))}
            </nav>
          </div>
        )}

        {animationState !== "initial" && animationState !== "line" && (
          <div className="crt-effect"></div>
        )}
      </div>
    </div>
  );
}
