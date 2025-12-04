"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PageAnimation } from "@/utils/animation"; 

export default function Bio() {
  const { fadeIn, isFirstLoad } = PageAnimation(); 
  const lastParagraphRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Dynamic height calculation to stop at border
  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 42;
      const borderBottomOffset = 14; // adjust this to match your border position
      
      setContainerHeight(viewportHeight - headerHeight - borderBottomOffset);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  useEffect(() => {
    const checkOverlap = () => {
      if (lastParagraphRef.current && logoRef.current) {
        const textRect = lastParagraphRef.current.getBoundingClientRect();
        const logoRect = logoRef.current.getBoundingClientRect();
        
        // Check if they overlap
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

    checkOverlap();
    window.addEventListener('resize', checkOverlap);
    scrollContainer?.addEventListener('scroll', checkOverlap);
    
    return () => {
      window.removeEventListener('resize', checkOverlap);
      scrollContainer?.removeEventListener('scroll', checkOverlap);
    };
  }, [fadeIn]);

  return (
    <section className="h-[calc(100vh-7px)] overflow-hidden md:mt-0">
      <div 
        ref={scrollContainerRef}
        style={{ height: containerHeight ? `${containerHeight}px` : undefined }}
        className="overflow-y-scroll no-scrollbar py-6 relative pb-0"
      >
        {/* Main Header - hidden below md */}
        <h2
          className={`font-bold text-cyan-200 text-4xl lg:mb-5 md:mb-7 underline px-14 lg:-translate-x-2 transition-opacity duration-1000 hidden md:block ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          Bio
        </h2>

        {/* Scrollable Content */}
        <div
          className={`md:px-[75px] px-[30px] text-gray-300 text-xl transition-opacity duration-1000 mt-5 max-[630px]:mt-0
            max-w-[685px] mx-auto md:max-w-none md:mx-0 md:mr-auto 
            translate-x-0 lg:-translate-x-2 md:translate-x-0 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile/Tablet Bio header */}
          <h2 className="font-bold text-cyan-200 text-4xl md:text-3xl underline mb-5 md:hidden">
            Bio
          </h2>

          <p className="lg:-mt-1 md:-mt-2 text-[22px] md:text-xl mt-6">
            I&apos;m Anton Langbruttig, a software developer who transforms ideas into intuitive,
            visually striking digital experiences. I build solutions where aesthetics and functionality
            work seamlessly together—from full-stack platforms with serverless backends to interactive
            dashboards and bespoke web applications.
          </p>

          <p className="mt-5 md:mt-4 text-[23px] md:text-xl">
            Currently, I&apos;m developing a luxury custom makeup platform
            where clients can explore services and request personalized
            consultations. The platform features a serverless architecture
            using AWS Lambda, API Gateway, and SES for seamless client communication.
          </p>

          <p className="mt-5 md:mt-4 text-[23px] md:text-xl">
            Beyond development, I mentor young learners in computer science, 
            helping foster the next generation of problem-solvers. 
            I believe great design should feel effortless, and I bring that philosophy to every project I take on.
          </p>

          <p
            ref={lastParagraphRef}
            className="mt-5 md:mt-4 text-[23px] md:text-xl lg:max-w-[800px]"
          >
            I&apos;m always open to new opportunities and collaborations.
            If you&apos;re building something that demands both creativity and precision, let&apos;s connect.
            <span className="animate-blink">&nbsp;_</span>
          </p>

          {/* Bottom spacer */}
          <div className="h-[60px] md:hidden"></div>
        </div>

        {/* Logo watermark - hidden below 630px and on md+ */}
        <div
          ref={logoRef}
          className={`fixed bottom-4 right-4 hidden min-[630px]:block md:hidden transition-opacity duration-300 ${
            fadeIn && !isOverlapping ? "opacity-70" : "opacity-0"
          } pointer-events-none`}
        >
          <Image
            src="/images/AL.png"
            alt="AL Logo"
            width={112}
            height={112}
            className="w-28 h-auto min-[870px]:w-36"
            priority
          />
        </div>
      </div>
    </section>
  );
}