
"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { animationSequence } from "@/components/animation";
import "../styles/globals.css";
// import "/components/view-window.css";
const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1.",
    link: "/project1",
    image: "/images/project1.png",
  },
  {
    title: "Project 2",
    description: "A brief description of project 2.",
    link: "/project2",
    image: "/images/project2.png",
  },
  {
    title: "Project 3",
    description: "A brief description of project 3.",
    link: "/project3",
    image: "/images/project3.png",
  },
  {
    title: "Project 4",
    description: "A brief description of project 4.",
    link: "/project4",
    image: "/images/project4.png",
  },
];

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
    <div className="flex items-start pt-3 justify-center min-h-screen w-full bg-transparent lg:ml-1 
                    lg:items-center lg:-mt-11 overflow-visible md:-mt-[2px] sm:-mt-2">
      <div className="w-full lg:ml-2 h-[85vh] lg:h-[70vh] lg:mt-[90px] sm:h-[100vh] overflow-visible">
        <div className="relative w-full flex-row items-center justify-center bg-fixed">
          <div className={`relative w-full h-full aspect-video rounded-none overscroll-none  
                           shadow-lg sm:h-screen bottom-2 sm:top-0  md:h-full lg:h-full                 
          ${showBackground ? "old-tv-background" : ""}
          ${animationState === "static" ? "tv-static" : ""}
          ${animationState === "screenOn" ? "tv-flicker" : ""}
          ${animationState === "content" ? "screen-on" : ""}
  `}
            style={{
              backgroundAttachment: "fixed",
              // backgroundColor: showBackground ? "#000" : "transparent",
              boxShadow: showBackground
                ? "0 0 20px #00ffff, 0 0 40px #00ffff"
                : "none",
              transition:
                "background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
              borderRadius: "2px",
            }}
          >
            
            {animationState !== "initial" && animationState !== "line" && (
              <div className="crt-effect"></div>
            )}
            {showLine && (
              <svg
                className="md:absolute md:pt-0 inset-0 w-full h-full sm:fixed sm:pt-[70px]"
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
                {/* New line that animates from top-right to bottom
                <line
                  className="animate-draw-top-right-to-bottom md:hidden sm:block "
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="#00ffff"
                  strokeWidth="1.2"
                /> */}
              </svg>
            )}
            <div
              className={`sm:flex sm:flex-col wrap relative w-full md:h-full aspect-video rounded-none overflow-hidden shadow-lg 
                ${
                animationState === "content" ? "screen-on" : ""
              } 
              sm:h-screen sm:overflow-none flex-wrap `}
            >
              {/* Scrollable Projects Section */}
              <div className="absolute inset-0 h-screen pointer-events-none before:content-[''] before:absolute before:inset-0 before:h-screen before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%] before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_30%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]"></div>
              <div
                className={`absolute inset-x-0 flex h-[470px] sm:min-h-min overflow-hidden  `}
                style={{ zIndex: 2 }}
              >
                <div className="p-1  h-screen flex flex-col w-screen ">
                  <div className="overflow-y-auto ">{children}</div>
                </div>
              </div>

              {showNav && (
                <div className="absolute bottom-2 right-0 hidden lg:block">
                  <Image
                    src="/images/AL.png"
                    alt="AL"
                    width={100}
                    height={100}
                  />
                </div>
              )}
          </div>
         </div>
      </div>
      </div>
    </div>
  );
}
