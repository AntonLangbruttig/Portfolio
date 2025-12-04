"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/utils/animation";


export default function HomePage() {
  const [infoText, setInfoText] = useState("");
  const [infoText2, setInfoText2] = useState("");
  const [infoText3, setInfoText3] = useState("");
  const [isXsScreen, setIsXsScreen] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXsScreen(window.innerWidth <= 385);
      setIsShortScreen(window.innerHeight <= 711 && window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const textForMd =
      "I'm passionate about building elegant, intuitive software\nthat is visually stunning." +
      "\n\n          Anton Langbruttig";
    const textForSm =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n           Anton Langbruttig";
    const textForXs =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n     Anton Langbruttig";

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
    <div className="sm:h-101vh sm:overflow-y-auto md:h-auto md:overflow-visible">
      <div className="sm:flex sm:flex-col md:overflow-hidden wrap relative w-full md:h-full rounded-lg shadow-lg flex-wrap">
        {animationState === "content" && (
          <div className="flex md:h-full animate-fade-in flex-wrap w-full sm:flex-col md:flex-row">
            <div className="flex items-center p-3 sm:min-h-[300px] sm:h-auto sm:p-3 sm:w-full md:h-auto md:w-1/2 md:-ml-4 lg:-ml-4">
              <div 
                className="relative w-full sm:h-[300px] sm:mt-[40px] md:h-[507px] sm:mr-1 md:mr-0 md:ml-2 md:mt-[2px]"
                style={{ marginTop: isShortScreen ? '40px' : undefined }}
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
            <div className="sm:w-full md:w-[50%] md:p-4 flex items-center md:justify-center sm:justify-center flex-shrink-0 md:mt-32 md:ml-4 sm:mt-4 sm:pb-8">
              <div className="w-full h-full p-4 rounded-lg items-top md:justify-left sm:justify-center md:block md:mb-0 sm:pt-7 md:max-w-none sm:max-w-[400px]">
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
                >{isXsScreen ? infoText3 : infoText2}<span className="animate-blink ml-1">_</span></pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}