"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PageAnimation } from "@/utils/animation";
import { Icon } from '@iconify/react';

const PortfolioAbout = () => {
  const { fadeIn } = PageAnimation();
  const lastListItemRef = useRef<HTMLLIElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Dynamic height calculation - FIXED for real mobile browsers
  useEffect(() => {
    const calculateHeight = () => {
      // Use visualViewport API if available (more accurate on mobile)
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const headerHeight = 42;
      // Increased bottom offset to account for mobile browser chrome
      const borderBottomOffset = 14;
      
      // On mobile, be more conservative with height to ensure scrollability
      const isMobile = window.innerWidth <= 768;
      const mobileExtraBuffer = isMobile ? 0 : 0; // Extra buffer for mobile browser UI
      
      setContainerHeight(viewportHeight - headerHeight - borderBottomOffset - mobileExtraBuffer);
    };

    calculateHeight();
    
    // Listen to both resize and visualViewport resize (for mobile keyboard, etc.)
    window.addEventListener('resize', calculateHeight);
    window.visualViewport?.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
      window.visualViewport?.removeEventListener('resize', calculateHeight);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 630);
    };

    const checkOverlap = () => {
      if (lastListItemRef.current && logoRef.current) {
        const textRect = lastListItemRef.current.getBoundingClientRect();
        const logoRect = logoRef.current.getBoundingClientRect();
        
        const overlap = !(
          textRect.right < logoRect.left ||
          textRect.left > logoRect.right ||
          textRect.bottom < logoRect.top ||
          textRect.top > logoRect.bottom
        );
        
        setIsOverlapping(overlap);
      }
    };

    const scrollContainer = scrollContainerRef.current;

    checkScreenSize();
    checkOverlap();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('resize', checkOverlap);
    scrollContainer?.addEventListener('scroll', checkOverlap);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('resize', checkOverlap);
      scrollContainer?.removeEventListener('scroll', checkOverlap);
    };
  }, [fadeIn]);

  const technologies = [
    "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript",
     "AWS SES", "Yarn","JavaScript","HTML"
  ];

  return (
    // Changed from 100vh to 100dvh for better mobile support
    <section className="h-[100dvh] max-h-[calc(100vh-43px)] overflow-hidden md:mt-0 flex flex-col relative">
      {/* Scrollable Content */}
      <div 
        ref={scrollContainerRef}
        style={{ height: containerHeight ? `${containerHeight}px` : undefined }}
        className="flex-1 overflow-y-scroll no-scrollbar py-6 md:ml-1 scrollbar-hide"
      >
        {/* Inner wrapper - increased height multiplier for more scroll room */}
        <div className="min-h-fit md:min-h-[calc(100%+120px)]">
          <h2 
            className={`sm:mt-2 md:mt-0 font-bold text-cyan-200 sm:text-4xl mb-3 underline px-14 transition-opacity 
              duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            style={{ 
            marginTop: isSmallScreen ? '-10px' : undefined,
            marginLeft: isSmallScreen ? '-31px': undefined,
            fontSize: isSmallScreen ? '28px' : undefined, 
            
          }}
          >
            Portfolio Website
          </h2>
          
          <div 
            className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            style={{ paddingLeft: isSmallScreen ? '46px' : '68px', paddingRight: isSmallScreen ? '30px' : '75px' , marginTop: isSmallScreen ? '-8px' : undefined }}
          >
              <p 
                className="text-gray-300 text-lg mb-6 sm:pt-3 md:pt-0"
                style={{ paddingLeft: isSmallScreen ? '0' : '45px' }}
              >
                Personal portfolio built from scratch, featuring synchronized boot animations and vintage CRT visual effects.</p>
              <div className="mb-6">
              <div className="mb-6">
                <h3 className="text-red-50 md:text-xl text-2xl font-bold -mt-3 mb-4">Description</h3>
                <ul 
                  className={`text-gray-300 text-lg space-y-3 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
                  style={{ paddingLeft: isSmallScreen ? '0' : '45px' }}
                >
                  <li>{">"} Custom animation system using requestAnimationFrame for frame-precise timing</li>
                  <li>{">"} CRT effects (scanlines, RGB shift, screen glow) built with CSS</li>
                  <li>{">"} SVG line-draw animations synchronized with boot sequence</li>
                  <li>{">"} Typewriter text effect with blinking cursor</li>
                  <li>{">"} Fully responsive with separate mobile/desktop experiences</li>
                  <li>{">"} Serverless contact form via AWS SES</li>
                  <li ref={lastListItemRef}>{">"} Auto-deploy pipeline via GitHub to AWS<span className="animate-blink"> __</span></li>
                </ul>
              </div>
              </div>

              <div className="mb-6"> 
                  <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">Technologies Used</h3>
                  <div 
                    className="flex flex-wrap gap-4"
                    style={{ paddingLeft: isSmallScreen ? '0' : '24px' }}
                  >
                      {technologies.map((tech, index) => (
                          <span key={index} className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300">
                              {tech}
                          </span>
                      ))}
                  </div>
              </div>

              {/* Chevron - now inside the content like Lux */}
              <div className="w-5 lg:-mt-7 md:-mt-9 block md:hidden">
                <Link href="/projects">
                  <div className="cursor-pointer w-20 h-80 md:relative md:justify-end md:-bottom-2
                   md:items-end md:-ml-[85px] sm:fixed sm:-bottom-[230px] sm:-ml-[85px] text-[#0ccbed] duration-300 hover:opacity-50"
                   style={{ marginLeft: isSmallScreen ? '-63px' : undefined }}>
                    <Icon icon="lucide:chevron-left" width="80" height="80" />
                  </div>
                </Link>
              </div>
          </div>
        </div>
        
        {/* INCREASED spacer for mobile scroll - this ensures content can scroll fully */}
      
        <div className="hidden sm:block md:hidden h-10 w-full"></div>
      </div>

      {/* Logo watermark - hidden below 630px and on md+ */}
      <div 
        ref={logoRef}
        className={`fixed bottom-4 right-4 hidden min-[630px]:block md:hidden transition-opacity duration-300 ${
          fadeIn && !isOverlapping ? "opacity-70" : "opacity-0"
        }`}
      >
        <img 
          src="/images/AL.png" 
          alt="AL Logo" 
          className="w-28 h-auto min-[870px]:w-36"
        />
      </div>
    </section>
  );
};

export default PortfolioAbout;