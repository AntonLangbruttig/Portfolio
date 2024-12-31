'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import SideNav from '@/components/side-nav'
import { animationSequence } from './animation'
import '../styles/globals.css'
import '/components/view-window.css'
import { ReactNode } from 'react'

export default function ViewWindow({ children }: { children: ReactNode }) {
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
    <div className="flex  items-start pt-3 -ml-[52px] justify-center min-h-screen w-full  bg-transparent lg:ml-1 lg:items-center lg:-mt-11">
      <div className="w-full -ml-[105px] lg:ml-2 ">
        <div 
          className={`relative w-full h-full aspect-video rounded-lg overflow-hidden shadow-lg sm:h-screen md:h-full lg:h-full
            ${showBackground ? 'old-tv-backgroun' : ''}
            ${animationState === 'static' ? 'tv-static' : ''}
            ${animationState === 'screenOn' ? 'tv-flicker' : ''}
            ${animationState === 'content' ? 'screen-on' : ''}
          `} 
          style={{
            boxShadow: showBackground ? '0 0 20px #00ffff, 0 0 40px #00ffff' : 'none',
            transition: 'all 0.5s ease-out',
            borderRadius: '2px',
          }}
        >  
          {animationState !== 'initial' && animationState !== 'line' && <div className="crt-effect"></div>}
          {showLine && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect className="animate-draw" x="0" y="0" width="100" height="100" fill="none" stroke="#00ffff" strokeWidth="1.2" />
            </svg>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

