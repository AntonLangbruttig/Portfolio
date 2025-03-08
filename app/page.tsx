"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/components/utils/animation";

export default function HomePage() {
  const [infoText, setInfoText] = useState(""); // For md+ screens
  const [infoText2, setInfoText2] = useState(""); // For sm screens
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    const textForMd =
      "I'm passionate about building elegant, intuitive software\nthat is visually stunning." +
      "\n\n          Anton Langbruttig";
    const textForSm =
      "I'm passionate about building elegant, intuitive software that is visually stunning." +
      "\n\n         Anton Langbruttig";

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
  }, []);

  return (
    <div>
      <div className="sm:flex sm:flex-col md:overflow-hidden relative w-full md:h-full aspect-video rounded-lg sm:overflow-hidden shadow-lg sm:h-screen sm:overflow-y-scroll flex-wrap">
        {animationState === "content" && (
          <div className="flex h-full animate-fade-in flex-wrap w-full">
            <div className="flex items-center p-3 sm:h-[50%] sm:p-3 sm:w-screen md:h-auto md:w-1/2 md:mb-12 md:-ml-8 lg:mb-12 lg:-ml-8">
              <div className="relative w-full h-full sm:mt-4 md:h-[507px] sm:mr-1 md:mr-0 md:ml-4 md:mt-1">
                <Image
                  src="/images/me.png"
                  alt="Anton Langbruttig"
                  layout="fill"
                  objectFit="contain"
                  className={`clip-path-${Math.floor(imageLines)} brightness-150 transition-all duration-200 ease-out`}
                />
              </div>
            </div>
            <div className="sm:w-screen md:w-[50%] md:p-4 flex items-center md:justify-center sm:justify-center flex-shrink-0 md:mt-32 md:-ml-0 sm:-mt-28">
              <div className="md:w-[101vh] sm:w-full h-full p-4 rounded-lg items-top md:justify-left sm:justify-center md:block md:mb-0 sm:pt-7 md:max-w-none sm:max-w-[400px]">
                <pre
                  className="text-xl sm:hidden md:block font-vt323 text-white text-[22px] leading-[1.6] text-left whitespace-pre-wrap break-words m-0 p-0 w-full overflow-hidden"
                >
                  {infoText}
                  <span className="animate-blink -ml-2">_</span>
                </pre>
                <pre
                  className="text-lg md:hidden pt-10 font-vt323 text-white text-[20px] leading-[1.6] text-left whitespace-pre-wrap break-words m-0 p-0 w-full overflow-hidden"
                >
                  {infoText2}
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