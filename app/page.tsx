'use client';

import ViewWindow from "@/components/view-window";
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { animationSequence } from '@/components/animation'


export default function HomePage() {
  const [infoText, setInfoText] = useState('')
  const [imageLines, setImageLines] = useState(0)
  const [animationState, setAnimationState] = useState('initial')
  const [showBackground, setShowBackground] = useState(false)
  const [showLine, setShowLine] = useState(false)

  useEffect(() => {
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText,
      setImageLines
    );
  }, [])
  
  
  return (
        <div className={`relative w-full  aspect-video rounded-lg overflow-hidden shadow-lg ${animationState === 'content' ? 'screen-on' : ''}`} >  
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
                                    textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
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
  );
};