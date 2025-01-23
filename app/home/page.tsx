'use client'

import { animationSequence } from "@/components/animation"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [infoText, setInfoText] = useState("")
  const [imageLines, setImageLines] = useState(0)

  useEffect(() => {
    // You can add any home page specific animations or effects here
    animationSequence(
    setInfoText,
    setImageLines,
    );
  }, [])

  return (
    <div className="flex sm:flex-col h-full animate-fade-in flex-wrap ">
      <div className="sm:w-full md:w-1/2 p-3 flex items-center justify-center flex-shrink-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/me.png"
            alt="Anton Langbruttig"
            layout="fill"
            objectFit="contain"
            style={{
              clipPath: `inset(0 0 ${100 - imageLines * 3}% 0)`,
              transition: "clip-path 0.2s ease-out",
            }}
          />
        </div>
      </div>

      <div className="sm:w-full md:w-1/3 lg:w-1/3 p-4 flex items-center sm:justify-center flex-shrink-0 mt-5">
        <div className="w-full h-full p-4 rounded-lg flex items-top md:justify-left sm:justify-center">
          <pre
            className="text-xl"
            style={{
              color: "#ffffff",
              fontFamily: '"VT323", monospace',
              fontWeight: "400",
              letterSpacing: "0.05em",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "left",
            }}
          >
            {infoText}
            <span className="animate-blink">_</span>
          </pre>
        </div>
        <div className="absolute bottom-0 right-0 p-2 hidden lg:block">
          <Image
            src="/images/AL.png"
            alt="AL"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

