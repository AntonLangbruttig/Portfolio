"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/utils/animation";


export default function HomePage() {
  const [infoText, setInfoText] = useState(""); // For md+ screens
  const [infoText2, setInfoText2] = useState(""); // For sm screens
  const [infoText3, setInfoText3] = useState(""); // For xs screens (385px and below)
  const [isXsScreen, setIsXsScreen] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXsScreen(window.innerWidth <= 385);
      // Short screen AND small width (sm breakpoint is below 768px)
      setIsShortScreen(window.innerHeight <= 811 && window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Text for md+ screens (more spacing)
    const textForMd =
      "I'm passionate about building elegant, intuitive software\nthat is visually stunning." +
      "\n\n          Anton Langbruttig";
    // Text for sm screens (less spacing)
    const textForSm =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n           Anton Langbruttig";
    // Text for xs screens (385px and below) - fewer spaces
    const textForXs =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n     Anton Langbruttig";

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
      {/* FIX 1: Removed 'aspect-video' */}
      <div className={`sm:flex sm:flex-col  md:overflow-hidden  wrap relative w-full md:h-full rounded-lg sm:overflow-hidden shadow-lg sm:h-screen sm:overflow-y-scroll flex-wrap`}>
        {animationState === "content" && (
          <div className="flex h-full animate-fade-in flex-wrap w-full">
            {/* FIX 4: Image Container - Reduced negative left margin from -ml-8 to -ml-4 to shift image right. Removed md:mb-12 to center vertically. */}
            <div className="flex items-center p-3 sm:h-[50%] sm:p-3  sm:w-screen md:h-auto md:w-1/2 md:-ml-4 lg:-ml-4">
              <div 
                className="relative w-full h-full sm:mt-14 md:h-[507px] sm:mr-1 md:mr-0 md:ml-2 md:mt-[2px]"
                style={{ marginTop: isShortScreen ? '0' : undefined }}
              >
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
            {/* FIX 2 (Adjusted): Changed 'md:ml-8' to 'md:ml-4' to balance the smaller negative margin on the image. */}
            <div className="sm:w-screen md:w-[50%] md:p-4 flex items-center md:justify-center sm:justify-center flex-shrink-0 md:mt-32 md:ml-4 sm:-mt-28">
              {/* FIX 3: Removed 'md:w-[101vh]' and replaced with 'w-full'. */}
              <div className="w-full sm:full h-full p-4 rounded-lg items-top md:justify-left sm:justify-center md:block md:mb-0 sm:pt-7 md:max-w-none sm:max-w-[400px] ">
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
                >
                  {infoText}
                  <span className="animate-blink -ml-2"> _</span>
                </pre>
                <pre
                  className="text-l md:hidden pt-10"
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
                >
                  {isXsScreen ? infoText3 : infoText2} {/* Text for sm screens */}
                  <span className="animate-blink -ml-2"> _</span>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}