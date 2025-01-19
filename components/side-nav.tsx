"use client";

import { useState, useEffect } from "react";
import { animationSequence } from "./animation";
import { SIDENAV_ITEMS } from "@/constants";
import "/styles/globals.css";
import MenuItem from "./Menu-Item";

export default function ViewWindow() {
  const [infoText, setInfoText] = useState("");
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0); // Add this state

  useEffect(() => {
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText,
      setImageLines,
      500, // initialDelay
      2000, // lineAnimationDuration
      1000, // staticDuration
      500, // flickerDuration
      200 // contentDelay
    );

    // Delay the nav display by 5 seconds
    const navTimeout = setTimeout(() => {
      setShowNav(true);
      // Animate nav opacity
      const opacityInterval = setInterval(() => {
        setNavOpacity((prevOpacity) => {
          if (prevOpacity < 1) {
            return Math.min(prevOpacity + 0.1, 1);
          }
          clearInterval(opacityInterval);
          return prevOpacity;
        });
      }, 100); // 0.1 opacity every 100ms
    }, 5000); // 5 seconds

    return () => {
      clearTimeout(navTimeout); // Cleanup timeout
    };
  }, []);

  return (
    <div className="bg-transparent h-screen ml-12 hidden lg:block ">
      <div
        className={`relative w-full h-full  aspect-video rounded-lg overflow-hidden shadow-lg 
          ${showBackground ? "old-tv-background" : ""}
          ${animationState === "static" ? "tv-static" : ""}
          ${animationState === "screenOn" ? "tv-flicker" : ""}
          ${animationState === "content" ? "screen-on" : ""}
        `}
        style={{
          boxShadow: showBackground
            ? "0 0 20px #00ffff, 0 0 40px #00ffff"
            : "none",
          transition: "all 0.5s ease-out",
          borderRadius: "2px",
        }}
      >
        {showLine && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              className="animate-draw"
              x1="0"
              y1="0"
              x2="0"
              y2="100"
              stroke="#00ffff"
              strokeWidth="1.2"
            />
            <line
              className="animate-draw"
              x1="100"
              y1="0"
              x2="100"
              y2="100"
              stroke="#00ffff"
              strokeWidth="1.2"
            />
          </svg>
        )}
        <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0  before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%] before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_30%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]"></div>



        {showNav && (
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              showNav ? "visible" : "invisible"
            }`}
            style={{
              opacity: navOpacity,
              pointerEvents: navOpacity === 1 ? "auto" : "none",
              transition: "opacity 0.5s ease-out",
              zIndex: 2,
            }}
          >
         
            
            <nav
              className="flex flex-col mt-4 z-10"
              style={{ marginTop: "-300px" }}
            >
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
