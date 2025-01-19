'use client'

import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { animationSequence } from './animation'
import '../styles/globals.css'
import MenuItem from './Menu-Item'
import { SIDENAV_ITEMS } from '@/constants'

export default function ViewWindow() {
  const [isOpen, setIsOpen] = useState(false)
  const [infoText, setInfoText] = useState('')
  const [imageLines, setImageLines] = useState(0)
  const [animationState, setAnimationState] = useState('initial')
  const [showBackground, setShowBackground] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [navOpacity, setNavOpacity] = useState(0)

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
      200, // contentDelay
    )

    // Delay the nav display by 5 seconds
    const navTimeout = setTimeout(() => {
      setShowNav(true)
      // Animate nav opacity
      const opacityInterval = setInterval(() => {
        setNavOpacity((prevOpacity) => {
          if (prevOpacity < 1) {
            return Math.min(prevOpacity + 0.1, 1)
          }
          clearInterval(opacityInterval)
          return prevOpacity
        })
      }, 100) // 0.1 opacity every 100ms
    }, 5000) // 5 seconds

    return () => {
      clearTimeout(navTimeout) // Cleanup timeout
    }
  }, [])

  return (

    <div className="bg-transparent  relatixve w-full flex-row items-center justify-center max-lg:block hidden ">
      <div
        className={`relative w-full md:h-20 sm:h-16 aspect-v ${
          showBackground ? 'old-tv-background' : ''
        } ${animationState === 'static' ? 'tv-static' : ''} ${
          animationState === 'screenOn' ? 'tv-flicker' : ''
        } ${animationState === 'content' ? 'screen-on' : ''}`}
        style={{
          boxShadow: showBackground ? '0 0 20px #00ffff, 0 0 40px #00ffff' : 'none',
          transition: 'all 0.5s ease-out',
          borderRadius: '0px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {showLine && (
          <svg
            className="absolute inset-0 w-full h-20 md:mt-0 sm:-mt-3"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ pointerEvents: 'none' }}
          >
            <rect
              className="animate-draw"
              x="0"
              y="100"
              width="100"
              height="1"
              fill="none"
              stroke="#00ffff"
              strokeWidth="2"
            />
          </svg>
        )}
       {showNav && (
  <div
    className={`absolute inset-x-0 top-0  flex justify-left ${showNav ? 'visible' : 'invisible'}`}
    style={{
      opacity: navOpacity,
      pointerEvents: navOpacity === 1 ? 'auto' : 'none',
      transition: 'opacity 0.5s ease-out',
      zIndex: 2,
    }}
  >
    {/* Overlay effect */}
    <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%]"></div>

    {/* Navigation content */}
    <div className="relative z-0 flex ">
      <Link href="/" className="text-2xl font-bold text-[#00ffff] mr-3 ml-0">
        <img src="/images/AL.png" alt="AL Logo" className="md:w-[77px] md:h-[77px] md:mt-[1px] sm:w-[50px] sm:h-[50px] sm:mt-2" />
      </Link>
      <nav className="flex container py-10 px-0">
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-[#00ffff] text-2xl"
            style={{
              color: '#B19CD9',
              fontFamily: '"VT323", monospace',
              fontWeight: '400',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.5rem',
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[#00ffff] text-2xl"
            style={{
              color: '#B19CD9',
              fontFamily: '"VT323", monospace',
              fontWeight: '400',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.5rem',
            }}
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-[#00ffff] text-2xl"
            style={{
              color: '#B19CD9',
              fontFamily: '"VT323", monospace',
              fontWeight: '400',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.5rem',
            }}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-[#00ffff] text-2xl"
            style={{
              color: '#B19CD9',
              fontFamily: '"VT323", monospace',
              fontWeight: '400',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.5rem',
            }}
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  </div>
)}

        {animationState !== 'initial' && animationState !== 'line' && (
          <div className="crt-effect absolute inset-0" style={{ pointerEvents: 'none' }}></div>
        )}
      </div>
    </div>
  )
}

