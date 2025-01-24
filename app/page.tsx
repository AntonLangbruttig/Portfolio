"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/components/animation";

export default function HomePage() {
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

  }, []);


  return (
    
    <div>
      {/* other pages content here  */}
      <div
        className={`sm:flex sm:flex-col wrap relative w-full md:h-full aspect-video rounded-lg overflow-hidden shadow-lg  sm:h-screen sm:overflow-y-scroll flex-wrap`}
      >

      {animationState === "content" && (
          <div className="flex smflex-col h-full animate-fade-in flex-wrap ">
            <div className="sm:w-screen md:w-1/2 p-3 flex items-center justify-center flex-shrink-0 ">
            
              <div className="relative w-full h-full "              
              >
                <Image
                  src="/images/me2.png"
                  alt="Anton Langbruttig"
                  layout="fill"
                  objectFit="contain"
                  style={{
                    clipPath: `inset(0 0 ${100 - imageLines * 3}% 0)`,
                    transition: "clip-path 0.2s ease-out",
                    filter: "brightness(150%)", // Add this line to make the image brighter
                    zIndex: 50,
                  }}
                />
              </div>
            </div>

            <div className="sm:w-screen md:w-[50%] p-4 flex items-center sm:justify-center flex-shrink-0 mt-5">
              <div className="w-full h-full p-4 rounded-lg  items-top md:justify-left sm:justify-center">
                <pre
                  className="text-lg"
                  style={{
                    color: "#ffffff",
                    fontFamily: '"VT323", monospace',
                    fontWeight: "400",
                    letterSpacing: "0.05em",
                    lineHeight: "1.6",
                    textAlign: "left",
                    whiteSpace: "pre-wrap", // This allows wrapping
                    wordWrap: "break-word", // Breaks long words if necessary
                    wordBreak: "break-word", // Ensure long words break properly
                    margin: 0, // Remove extra margins that could cause gaps
                    padding: 0, // Remove any extra padding
                    width: "100%", // Ensure the width fits the container
                    overflow: "hidden", // Prevent overflow
                  }}
                >
                  {infoText}
                  <span className="animate-blink">_</span>
                </pre>
              </div>
            </div>
          </div>
        )}

</div>
    </div>
  );

}
