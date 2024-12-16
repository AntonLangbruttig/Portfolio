'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import SideNav from '@/components/side-nav'
import { animationSequence } from './animation'
import '../styles/globals.css'
import {ReactNode} from 'react'

export default function VeiwWindow({children}: {children: ReactNode}) {
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
    <div className="bg-transparent relative min-h-screen ml-2 w-full flex flex-row items-center justify-center " style={{ marginTop: '-55px' }}>
        <div 
            className={`relative w-full  aspect-video rounded-lg overflow-hidden shadow-lg
                ${showBackground ? 'old-tv-background' : ''}
                ${animationState === 'static' ? 'tv-static' : ''}
                ${animationState === 'screenOn' ? 'tv-flicker' : ''}
                ${animationState === 'content' ? 'screen-on' : ''}
            `} 
            style={{
                boxShadow: showBackground ? '0 0 20px #00ffff, 0 0 40px #00ffff' : 'none',
                transition: 'all 0.5s ease-out',
                borderRadius: '2px', // Add this line to round the corners
            }}>  
            
            {animationState !== 'initial' && animationState !== 'line' && <div className="crt-effect"></div>}
            {showLine && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect className="animate-draw" x="0" y="0" width="100" height="100" fill="none" stroke="#00ffff" strokeWidth="1.2" />
                </svg>
            )}
            {children}
        </div>
    </div>
)}
