"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PageAnimation } from "@/utils/animation";

const skills = {
  "Used Often": ["React", "CSS", "HTML", "Tailwind", "Next.js", "GitHub"],
  "Secondary Skills": ["Python", "Django", "Java", "C", "JavaScript", "Framer Motion", "AWS", "SQL"],
  "Developing": ["Numpy", "Pandas", "Matplotlib", "TensorFlow", "Lua"],
};

const Skills = () => {
  const { fadeIn } = PageAnimation();
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const skillRefsArray = useRef<(HTMLSpanElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const clampHeight = () => {
    if (typeof window === 'undefined') return 0;

    const viewportHeight = window.innerHeight;

    // Define your desired heights at specific viewport sizes
    const smallViewport = 500;  // Viewport height at small screen
    const smallHeight = 428;    // Container height you want at 500px viewport
    const largeViewport = 970;  // Viewport height at large screen
    const largeHeight = 893;    // Container height you want at 968px viewport

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
    const checkOverlap = () => {
      if (!logoRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();

      // Find the first skill box that overlaps or has passed the logo
      let shouldHide = false;

      for (const skillRef of skillRefsArray.current) {
        if (!skillRef) continue;

        const skillRect = skillRef.getBoundingClientRect();

        // Check if this skill box overlaps with the logo
        const overlaps = !(
          skillRect.right < logoRect.left ||
          skillRect.left > logoRect.right ||
          skillRect.bottom < logoRect.top ||
          skillRect.top > logoRect.bottom
        );

        if (overlaps) {
          shouldHide = true;
          break;
        }

        // Check if we've scrolled past this skill (skill is above the logo)
        if (skillRect.bottom < logoRect.top) {
          shouldHide = true;
        } else {
          // If we find a skill that hasn't passed the logo yet, stop checking
          break;
        }
      }

      setIsOverlapping(shouldHide);
    };

    checkOverlap();

    window.addEventListener("resize", checkOverlap);
    scrollContainerRef.current?.addEventListener("scroll", checkOverlap);

    return () => {
      window.removeEventListener("resize", checkOverlap);
      scrollContainerRef.current?.removeEventListener("scroll", checkOverlap);
    };
  }, [fadeIn]);

  return (
    <section className="md:h-[calc(100vh-50px)] overflow-hidden relative">
      <div
        ref={scrollContainerRef}
        className="md:h-[96.5%] overflow-y-scroll no-scrollbar py-6"
        style={{ height: isMobile ? `${containerHeight}px` : undefined }}
      >
        {/* Main Header */}
        <h2
          className={`font-bold text-cyan-200 text-4xl mb-8 underline px-4 md:px-14 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          Skills
        </h2>

        {/* Scrollable Content */}
        <div
          className={`px-5 md:px-[75px] max-w-[685px] md:max-w-none mx-auto md:mx-0 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
                {category}
              </h3>
              <div className="pl-6 flex flex-wrap gap-4">
                {items.map((skill, index) => {
                  const globalIndex = Object.entries(skills)
                    .slice(0, Object.keys(skills).indexOf(category))
                    .reduce((acc, [_, categoryItems]) => acc + categoryItems.length, 0) + index;

                  return (
                    <span
                      key={skill}
                      ref={(el) => { skillRefsArray.current[globalIndex] = el; }}
                      className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AL Logo Watermark - Same as PortfolioAbout */}
      <div
        ref={logoRef}
        className={`fixed bottom-4 right-4 hidden min-[500px]:block md:hidden transition-opacity duration-300 ${
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

export default Skills;