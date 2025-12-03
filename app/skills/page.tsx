"use client";

import React, { useEffect, useState, useRef } from "react";
import { PageAnimation } from "@/utils/animation";

const skills = {
  "Used Often": ["React", "CSS", "HTML", "Tailwind", "Next.js", "GitHub"],
  "Secondary Skills": ["Python", "Django", "Java", "C", "JavaScript", "Framer Motion", "AWS", "SQL"],
  "Developing": ["Numpy", "Pandas", "Matplotlib", "TensorFlow", "Lua"],
};

const Skills = () => {
  const { fadeIn } = PageAnimation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOverlapping, setIsOverlapping] = useState(false);

  const lastSkillItemRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 721);
    };

    const checkOverlap = () => {
      if (!lastSkillItemRef.current || !logoRef.current) return;

      const textRect = lastSkillItemRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      const overlap = !(
        textRect.right < logoRect.left ||
        textRect.left > logoRect.right ||
        textRect.bottom < logoRect.top ||
        textRect.top > logoRect.bottom
      );

      setIsOverlapping(overlap);
    };

    const handleResizeAndScroll = () => {
      checkScreenSize();
      checkOverlap();
    };

    checkScreenSize();
    checkOverlap();

    window.addEventListener("resize", handleResizeAndScroll);
    scrollContainerRef.current?.addEventListener("scroll", checkOverlap);

    return () => {
      window.removeEventListener("resize", handleResizeAndScroll);
      scrollContainerRef.current?.removeEventListener("scroll", checkOverlap);
    };
  }, [fadeIn]);

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden relative">
      <div
        ref={scrollContainerRef}
        className="h-[96.5%] overflow-y-scroll no-scrollbar py-6"
      >
        {/* Main Header */}
        <h2
          className={`font-bold text-cyan-200 text-4xl mb-8 underline px-14 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            paddingLeft: isSmallScreen ? "16px" : undefined,
            paddingRight: isSmallScreen ? "16px" : undefined,
          }}
        >
          Skills
        </h2>

        {/* Scrollable Content */}
        <div
          className={`transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            paddingLeft: isSmallScreen ? "20px" : "75px",
            paddingRight: isSmallScreen ? "20px" : "75px",
          }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
                {category}
              </h3>
              <div className="pl-6 flex flex-wrap gap-4">
                {items.map((skill, index) => {
                  const isLastSkill =
                    category === "Developing" &&
                    skill === "Lua";

                  return (
                    <span
                      key={skill}
                      ref={isLastSkill ? lastSkillItemRef : null}
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
        <img
          src="/images/AL.png"
          alt="AL Logo"
          className="w-28 h-auto min-[870px]:w-36"
        />
      </div>
    </section>
  );
};

export default Skills;