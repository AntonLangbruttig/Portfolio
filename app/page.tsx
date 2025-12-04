"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { animationSequence } from "@/utils/animation";


export default function HomePage() {
  const [infoText, setInfoText] = useState(""); // For md+ screens
  const [infoText2, setInfoText2] = useState(""); // For sm screens
  const [infoText3, setInfoText3] = useState(""); // For xs screens (385px and below)
  const [isXsScreen, setIsXsScreen] = useState(false);
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [isOverlapping, setIsOverlapping] = useState(false);

  const textRef = useRef<HTMLPreElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXsScreen(window.innerWidth <= 453);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check overlap between text and logo
  useEffect(() => {
    const checkOverlap = () => {
      if (!textRef.current || !logoRef.current) return;

      const textRect = textRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      const overlap = !(
        textRect.right < logoRect.left ||
        textRect.left > logoRect.right ||
        textRect.bottom < logoRect.top ||
        textRect.top > logoRect.bottom
      );

      setIsOverlapping(overlap);
    };

    checkOverlap();

    window.addEventListener('resize', checkOverlap);
    scrollContainerRef.current?.addEventListener('scroll', checkOverlap);

    return () => {
      window.removeEventListener('resize', checkOverlap);
      scrollContainerRef.current?.removeEventListener('scroll', checkOverlap);
    };
  }, [animationState]);

  useEffect(() => {
    // Text for md+ screens (more spacing)
    const textForMd =
      "I'm passionate about building elegant, intuitive software\nthat is visually stunning." +
      "\n\n          Anton Langbruttig";
    // Text for sm screens (less spacing)
    const textForSm =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n                  Anton Langbruttig";
    // Text for xs screens (385px and below) - fewer spaces
    const textForXs =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n  Anton Langbruttig";

    // Run animation for md+ text
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
      200,
      textForMd,
      50
    );

    // Run animation for sm text
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText2,
      setImageLines,
      500,
      2000,
      1000,
      500,
      200,
      textForSm,
      50
    );

    // Run animation for xs text
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText3,
      setImageLines,
      500,
      2000,
      1000,
      500,
      200,
      textForXs,
      50
    );
  }, []);

  return (
    <div>
      {/* other pages content here  */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto md:overflow-hidden relative w-full h-screen md:h-full"
      >
        {animationState === "content" && (
          <div className="flex flex-col md:flex-row h-full animate-fade-in w-full max-w-[1400px] mx-auto px-4 md:px-0">
            {/* Image Container */}
            <div className="flex items-center justify-center w-full md:w-1/2 pt-8 md:pt-0 md:p-3 md:-ml-4 lg:-ml-4">
              <div className="relative w-full max-w-[400px] md:max-w-none h-[350px] md:h-[507px] md:ml-2 md:mt-[14px]">
                <Image
                  src="/images/me.webp"
                  alt="Anton Langbruttig"
                  layout="fill"
                  objectFit="contain"
                  priority={true} 
                  style={{
                    clipPath: `inset(0 0 ${100 - imageLines * 3}% 0)`,
                    transition: "clip-path 0.2s ease-out",
                    filter: "brightness(150%)",
                    zIndex: 50,
                  }}
                />
              </div>
            </div>
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start mt-10 md:mt-32 md:ml-4 pb-20 md:pb-30">
              <div className="w-full max-w-[500px] md:max-w-none p-4">
                <pre
                  className="text-xl sm:hidden md:block"
                  style={{
                    fontSize: "22px",
                    color: "#ffffff",
                    fontFamily: '"VT323", monospace',
                    fontWeight: "400",
                    lineHeight: "1.6",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >{infoText}<span className="animate-blink ml-1">_</span></pre>
                <pre
                  ref={textRef}
                  className="text-l md:hidden pt-9"
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontFamily: '"VT323", monospace',
                    fontWeight: "400",
                    lineHeight: "1.6",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >{isXsScreen ? infoText3 : infoText2}<span className="animate-blink ml-1">_</span></pre>
              </div>
            </div>
          </div>
        )}

        {/* AL Logo Watermark - Same as Bio page */}
        {animationState === "content" && (
          <div
            ref={logoRef}
            className={`fixed bottom-4 right-4 hidden min-[630px]:block md:hidden transition-opacity duration-300 ${
              !isOverlapping ? "opacity-70" : "opacity-0"
            }`}
          >
            <img
              src="/images/AL.png"
              alt="AL Logo"
              className="w-28 h-auto min-[870px]:w-36"
            />
          </div>
        )}
      </div>
    </div>
  );
}