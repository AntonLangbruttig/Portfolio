"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { animationSequence } from "@/utils/animation";
import "../styles/globals.css";
import Link from "next/link";

export default function HomePage({ children }: { children: ReactNode }) {
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
      500, // initialDelay
      2000, // lineAnimationDuration
      1000, // staticDuration
      500, // flickerDuration
      200 // contentDelay
    );
    // Delay the nav display by 4 seconds
    const navTimeout = setTimeout(() => {
      setShowNav(true);
      // Animate nav opacity
      const opacityInterval = setInterval(() => {
        setNavOpacity((prevOpacity) => {
          if (prevOpacity < 1) {
            return Math.min(prevOpacity + 0.0001, 1); // Even smaller increment for a more gradual fade-in
          }
          clearInterval(opacityInterval);
          return prevOpacity;
        });
      }, 10000); // Slower transition by increasing interval to 200ms
    }, 4250); // Delay before showing the nav

    return () => {
      clearTimeout(navTimeout); // Cleanup timeout
    };
  }, []);

  return (
    <div
      className="flex items-start pt-3 justify-center min-h-screen w-full bg-transparent lg:ml-1 
                    lg:items-center lg:-mt-11 overflow-visible md:-mt-[2px] sm:-mt-2 "
    >
      <div className="w-full lg:ml-2 sm:ml-0 sm:-mr-1 h-[85vh] lg:h-[70vh] lg:mt-[90px] sm:h-[9vh] overflow-visible ">
        <div className="relative w-full flex-row items-center justify-center bg-fixed">
          <div
            className={`relative md:w-full sm:w-[99vw]   aspect-video rounded-none overscroll-none  
                           shadow-lg h-screen bottom-2 sm:top-0  md:h-full lg:h-full   sm:-mt-1     
              ${showBackground ? "old-tv-background" : ""}
              ${animationState === "static" ? "tv-static" : ""}
              ${animationState === "screenOn" ? "tv-flicker" : ""}
              ${animationState === "content" ? "screen-on" : ""}
          `}
            style={{
              backgroundAttachment: "fixed",
              boxShadow: showBackground
                ? "0 0 20px #00ffff, 0 0 40px #00ffff"
                : "none",
              transition:
                "background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out ",
              borderRadius: "2px",
            }}
          >
            {animationState !== "initial" && animationState !== "line" && (
              <div className="crt-effect"></div>
            )}
            {showLine && (
              <svg
                className="md:absolute md:pt-0 inset-0 w-full h-full sm:fixed sm:pt-[63px] "
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <rect
                  className="animate-draw"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="1.2"
                />
                <rect
                  className="animate-draw-clockwise"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="1.2"
                />
              </svg>
            )}
            <div
              className={`sm:flex  sm:flex-col wrap relative w-full md:h-full aspect-video rounded-none overflow-hidden shadow-lg 
                ${
                  animationState === "content" ? "screen-on" : ""
                } sm:h-screen sm:overflow-none flex-wrap `}
            >
              <div className="absolute inset-0 h-screen pointer-events-none before:content-[''] before:absolute before:inset-0 before:h-screen before:from-transparent before:via-black/10 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%] before:bg-[linear-gradient(rgba(18,16,16,0)_70%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))]"></div>
              <div
                className={`absolute inset-x-0 flex h-[470px] sm:min-h-min overflow-hidden `}
                style={{ zIndex: 2 }}
              >
                <div className="md:p-1  h-screen flex flex-col w-screen sm:h-screen z-40 sm:p-0">
                  {children}
                </div>
              </div>
              {showNav && (
                <div className="absolute bottom-0 right-0 hidden lg:block pointer-events-auto ">
                  <Link href="/">
                    <Image
                      src="/images/al.png"
                      alt="AL"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}