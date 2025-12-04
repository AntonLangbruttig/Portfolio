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
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXsScreen(window.innerWidth <= 348);
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
      "\n\n              Anton Langbruttig";
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
      <div className="overflow-y-auto md:overflow-hidden relative w-full h-screen md:h-full">
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
      </div>
    </div>
  );
}