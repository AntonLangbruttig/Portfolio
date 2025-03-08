"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { animationSequence } from "./utils/animation";
import "../styles/globals.css";
import MenuItem from "./utils/menu-item";
import { SIDENAV_ITEMS } from "@/constants";

export default function ViewWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  const pathname = usePathname(); // Get the current route

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

  // Derive page title from pathname
  const pageTitle = pathname === "/" ? "Home" : pathname.split("/").pop();

  return (
    <div className="bg-transparent relative w-full flex-row items-center justify-center max-lg:block hidden">
      <div
        className={`relative w-full md:h-20 sm:h-16 aspect-v ${
          showBackground ? "old-tv-background" : ""
        } ${animationState === "static" ? "tv-static" : ""} ${
          animationState === "screenOn" ? "tv-flicker" : ""
        } ${animationState === "content" ? "screen-on" : ""}`}
        style={{
          boxShadow: showBackground
            ? "0 0 20px #00ffff, 0 0 40px #00ffff"
            : "none",
          transition: "all 0.5s ease-out",
          borderRadius: "0px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {showLine && (
          <svg
            className="absolute inset-0 w-full h-20 md:mt-0 sm:-mt-3"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ pointerEvents: "none" }}
          >
            <rect
              className="animate-draw"
              x="0"
              y="100"
              width="100"
              height="1"
              fill="none"
              stroke="#00ffff"
              strokeWidth="2"
            />
          </svg>
        )}
        {showNav && (
          <div
            className={`absolute inset-x-0 top-0 flex justify-left ${
              showNav ? "visible" : "invisible"
            }`}
            style={{
              opacity: navOpacity,
              pointerEvents: navOpacity === 1 ? "auto" : "none",
              transition: "opacity 0.5s ease-out",
              zIndex: 2,
            }}
          >
            <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%]"></div>

            <div className="relative z-0 flex">
              <Link
                href="/"
                className="text-2xl font-bold text-[#00ffff] mr-3 ml-0 hover:opacity-60"
              >
                <Image
                  src="/images/AL.png"
                  alt="AL Logo"
                  width={77} // Set fixed width
                  height={77} // Set fixed height
                  className="md:w-[77px] md:h-[77px] md:mt-[1px] sm:w-[50px] sm:h-[50px] sm:mt-2"
                />
              </Link>
              <h2 className="md:hidden text-[#ab91dd] transition-all duration-300 py-6 text-3xl text-bold capitalize">
                {pageTitle === "portfolioAbout"
                  ? "Portfolio Website"
                  : pageTitle === "luxAbout"
                  ? "Let's Face It Website"
                  : pageTitle}
              </h2>
              <nav className="flex container py-10 px-0">
                <div className="hidden md:flex space-x-8">
                  {SIDENAV_ITEMS.map((item) => {
                    const isActive =
                      item.path === "/"
                        ? pathname === "/" // Only highlight Home when exactly on "/"
                        : pathname.startsWith(item.path); // Otherwise, highlight parents
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`text-2xl transition-all duration-300 ${
                          isActive
                            ? "text-[#00ffff] font-bold border-b-2 border-[#00ffff]"
                            : "text-[#B19CD9] hover:text-white"
                        }`}
                        style={{
                          fontFamily: '"VT323", monospace',
                          fontWeight: "400",
                          letterSpacing: "0.05em",
                          lineHeight: "1.6",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          textAlign: "left",
                          fontSize: "1.5rem",
                        }}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>
        )}

        {animationState !== "initial" && animationState !== "line" && (
          <div
            className="crt-effect absolute inset-0"
            style={{ pointerEvents: "none" }}
          ></div>
        )}
      </div>
    </div>
  );
}
