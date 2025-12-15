"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageAnimation } from "@/utils/animation";
import { Icon } from '@iconify/react';

const LuxAbout = () => {
  const { fadeIn } = PageAnimation();
  const lastListItemRef = useRef<HTMLLIElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const clampHeight = () => {
    if (typeof window === 'undefined') return 0;

    const viewportHeight = window.innerHeight;

    // Define your desired heights at specific viewport sizes
    const smallViewport = 500;  // Viewport height at small screen
    const smallHeight = 429;    // Container height you want at 500px viewport
    const largeViewport = 970;  // Viewport height at large screen
    const largeHeight = 894.5;    // Container height you want at 968px viewport

    // Calculate the slope between the two points
    const slope = (largeHeight - smallHeight) / (largeViewport - smallViewport);

    // Linear interpolation: y = mx + b
    const interpolatedHeight = smallHeight + slope * (viewportHeight - smallViewport);

    // Clamp to stay within reasonable bounds
    const clampedValue = Math.max(smallHeight, Math.min(interpolatedHeight, largeHeight));

    return clampedValue;
  };

  // Update container height and mobile state
  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(clampHeight());
      setIsMobile(window.innerWidth < 768);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
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
     "AWS SES", "Yarn",
  ];

  return (
    // Changed from 100vh to 100dvh for better mobile support
    <section className="h-[100dvh] max-h-[calc(100vh-43px)] md:h-full overflow-hidden md:mt-0 flex flex-col relative">
      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        style={{ height: isMobile ? `${containerHeight}px` : undefined }}
        className="md:flex-1 overflow-y-scroll no-scrollbar pt-6 md:ml-1 scrollbar-hide"
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
            Let&apos;s Face It Website
          </h2>
          
          <div 
            className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            style={{ paddingLeft: isSmallScreen ? '46px' : '68px', paddingRight: isSmallScreen ? '30px' : '75px' , marginTop: isSmallScreen ? '-8px' : undefined }}
          >
              <p 
                className="text-gray-300 text-lg mb-6 sm:pt-3 md:pt-0"
                style={{ paddingLeft: isSmallScreen ? '0' : '45px' }}
              >
                Complete business website for a luxury makeup studio in Atlanta.</p>
              <div className="mb-6">
              <div className="mb-6">
                <h3 className="text-red-50 md:text-xl text-2xl font-bold -mt-3 mb-4">Description</h3>
                <ul 
                  className={`text-gray-300 text-lg space-y-3 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
                  style={{ paddingLeft: isSmallScreen ? '0' : '45px' }}
                >
                  <li>{">"} Services page with 6 service categories and individual CTAs</li>
                  <li>{">"} Booking concierge system with detailed request form</li>
                  <li>{">"} Google Business email integration for appointment requests</li>
                  <li>{">"} Portfolio gallery with image carousel</li>
                  <li>{">"} Expandable FAQ section with multiple categories</li>
                  <li>{">"} Complete legal pages (Privacy, Terms, Copyright & Credits)</li>
                  <li>{">"} Our Story page with brand narrative</li>
                  <li>{">"} Click-to-call functionality for direct booking</li>
                  <li ref={lastListItemRef}>{">"} Mobile-first responsive design with elegant typography<span className="animate-blink"> __</span></li>
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
                          <span key={index} className="px-4 py-2 border rounded-none border-gray-300
                           text-gray-300 text-base font-medium transition-all duration-300">
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
      </div>

      {/* Logo watermark - hidden below 630px and on md+ */}
      <div
        ref={logoRef}
        className={`fixed bottom-2 right-0 hidden min-[630px]:block md:hidden transition-opacity duration-300 ${
          fadeIn && !isOverlapping ? "opacity-70" : "opacity-0"
        } pointer-events-none`}
      >
        <Image
          src="/images/al.png"
          alt="AL Logo"
          width={112}
          height={112}
          className="w-28 h-auto min-[870px]:w-36"
          priority
        />
      </div>
    </section>
  );
};

export default LuxAbout;