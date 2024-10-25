'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function VeiwWindow() {
  const [infoText, setInfoText] = useState('')
  const [imageLines, setImageLines] = useState(0)
  const [animationState, setAnimationState] = useState('initial')
  const [showBackground, setShowBackground] = useState(false)
  const [showLine, setShowLine] = useState(false)
  
  const fullInfoText = "Anton Langbruttig\n\nFull Stack\nWeb Developer\n\nSpecializing in:\n- React\n- Node.js\n- TypeScript\n- NextJS"

  useEffect(() => {
    const initialDelay = 1000; // 1 second delay before line appears
    const lineAnimationDuration = 3000; // 3 seconds
    const staticDuration = 2000; // 2 seconds
    const flickerDuration = 1000; // 1 second
    const contentDelay = 500; // 0.5 seconds

    const animationSequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, initialDelay));

      // Show and animate line
      setShowLine(true)
      setAnimationState('line')
      await new Promise(resolve => setTimeout(resolve, lineAnimationDuration));

      // Show background and static
      setShowBackground(true)
      setAnimationState('static')
      await new Promise(resolve => setTimeout(resolve, staticDuration));

      // Screen on and flicker
      setAnimationState('screenOn')
      await new Promise(resolve => setTimeout(resolve, flickerDuration));

      // Content
      setAnimationState('content')
      await new Promise(resolve => setTimeout(resolve, contentDelay));

      let infoIndex = 0
      let currentImageLines = 0
      const totalImageLines = 50 // Adjust this value based on your image height

      const infoIntervalId = setInterval(() => {
        if (infoIndex < fullInfoText.length) {
          infoIndex++
          setInfoText(fullInfoText.slice(0, infoIndex))
        } else {
          clearInterval(infoIntervalId)
        }
      }, 50)

      const imageIntervalId = setInterval(() => {
        if (currentImageLines < totalImageLines) {
          currentImageLines++
          setImageLines(currentImageLines)
        } else {
          clearInterval(imageIntervalId)
        }
      }, 100)
    }

    animationSequence();
  }, [])

  return (
    <div className="bg-transparent relative min-h-screen w-full flex flex-row items-center justify-center p-10" style={{ marginLeft: '80px' }}>
      <div 
        className={`relative z-10 w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg
          ${showBackground ? 'old-tv-background' : ''}
          ${animationState === 'static' ? 'tv-static' : ''}
          ${animationState === 'screenOn' ? 'tv-flicker' : ''}
          ${animationState === 'content' ? 'screen-on' : ''}
        `} 
        style={{
          boxShadow: showBackground ? '0 0 20px rgba(32, 227, 178, 0.5), 0 0 40px rgba(123, 255, 42, 0.3)' : 'none',
          transition: 'all 0.5s ease-out',
        }}
      >
        {animationState !== 'initial' && animationState !== 'line' && <div className="crt-effect"></div>}
        {showLine && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect className="animate-draw" x="0" y="0" width="100" height="100" fill="none" stroke="#20e3b2" strokeWidth="1" />
          </svg>
        )}
        {animationState === 'content' && (
          <div className="flex h-full animate-fade-in">
            <div className="w-1/2 p-3 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/me.png"
                  alt="Anton Langbruttig"
                  layout="fill"
                  objectFit="contain"
                  style={{
                    clipPath: `inset(0 0 ${100 - (imageLines * 3)}% 0)`,
                    transition: 'clip-path 0.2s ease-out'
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 p-4 flex items-center justify-center">
              <div className="w-full h-full p-4 rounded-lg flex items-top justify-left">
                <pre 
                  className="text-100 md:text-lg lg:text-xl"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 20px rgba(32, 227, 178, 0.7), 0 0 40px rgba(123, 255, 42, 0.3)',
                    fontFamily: '"VT323", monospace',
                    fontWeight: '400',
                    letterSpacing: '0.05em',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                  }}
                >
                  {infoText}<span className="animate-blink">_</span>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        body {
          background-color: #000;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .animate-blink {
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .old-tv-background {
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .old-tv-background::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 30%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .crt-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%);
          pointer-events: none;
          z-index: 10;
        }
        .tv-static {
          animation: tvStatic 0.2s steps(10) infinite;
        }
        @keyframes tvStatic {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        .tv-flicker::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          opacity: 0;
          z-index: 3;
          animation: tvFlicker 0.2s steps(4) 5;
          pointer-events: none;
        }
        .screen-on::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3));
          opacity: 0;
          animation: screenOn 0.5s forwards;
          z-index: 1;
        }
        @keyframes screenOn {
          0% { opacity: 0; }
          100% { opacity: 0.5; }
        }
        @keyframes draw {
          0% {
            stroke-dasharray: 0 400;
          }
          100% {
            stroke-dasharray: 400 400;
          }
        }
        .animate-draw {
          animation: draw 3s linear forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

