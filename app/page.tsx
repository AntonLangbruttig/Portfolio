"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/utils/animation";


export default function HomePage() {
  const [infoText, setInfoText] = useState(""); // For md+ screens
  const [infoText2, setInfoText2] = useState(""); // For sm screens
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  useEffect(() => {
    // Text for md+ screens (more spacing)
    const textForMd =
      "I'm passionate about building elegant, intuitive software\nthat is visually stunning." +
      "\n\n          Anton Langbruttig";
    // Text for sm screens (less spacing)
    const textForSm =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n         Anton Langbruttig";

    // Run animation for md+ text
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText, // Set md+ text
      setImageLines,
      500, // initialDelay
      2000, // lineAnimationDuration
      1000, // staticDuration
      500, // flickerDuration
      200, // contentDelay
      textForMd,
      50 // totalImageLines
    );

    // Run animation for sm text (same timing, different text)
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText2, // Set sm text
      setImageLines,
      500, // initialDelay
      2000, // lineAnimationDuration
      1000, // staticDuration
      500, // flickerDuration
      200, // contentDelay
      textForSm,
      50 // totalImageLines
    );
  }, []);

  return (
    <div>
      {/* other pages content here  */}
      <div className={`sm:flex sm:flex-col  md:overflow-hidden  wrap relative w-full md:h-full aspect-video rounded-lg sm:overflow-hidden shadow-lg sm:h-screen sm:overflow-y-scroll flex-wrap`}>
        {animationState === "content" && (
          <div className="flex h-full animate-fade-in flex-wrap w-full">
            <div className="flex items-center p-3 sm:h-[50%] sm:p-3  sm:w-screen md:h-auto md:w-1/2 md:mb-12 md:-ml-8 lg:mb-12 lg:-ml-8">
              <div className="relative w-full h-full sm:mt-4 md:h-[507px] sm:mr-1 md:mr-0 md:ml-2 md:mt-0">
                <Image
                  src="/images/me.png"
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
            <div className="sm:w-screen md:w-[50%] md:p-4 flex items-center md:justify-center sm:justify-center flex-shrink-0 md:mt-32 md:-ml-0 sm:-mt-28">
              <div className="md:w-[101vh] sm:full h-full p-4 rounded-lg items-top md:justify-left sm:justify-center md:block md:mb-0 sm:pt-7 md:max-w-none sm:max-w-[400px] ">
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
                  {infoText} {/* Text for md and lg screens */}
                  <span className="animate-blink -ml-2">_</span>
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
                  {infoText2} {/* Text for sm screens */}
                  <span className="animate-blink -ml-2">_</span>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
