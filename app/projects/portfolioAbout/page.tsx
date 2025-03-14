"use client";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { PageAnimation } from "@/utils/animation"; // Import animation
import { Icon } from '@iconify/react';

const PortfolioAbout = () => {
  const { fadeIn } = PageAnimation(); // Use the same animation logic

  // List of technologies used
  const technologies = [
    "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript",
     "AWS SES", "Yarn","JavaScript","HTML"
  ];

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-[96.5%] overflow-auto no-scrollbar py-6">
       
        {/* Main Header */}
        <h2 className={`md:block sm:hidden font-bold text-cyan-200 text-4xl mb-3 underline px-14 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          Portfolio Website
        </h2>
        
        {/* Description */}
        <div className={`px-[75px] transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <div className="mb-6"> 
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">Description</h3>
              <div className={`pl-[25px] text-gray-300 text-lg transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
              My portfolio is inspired by early web aesthetics, breaking away from today’s cookie-cutter designs while maintaining modern usability. It draws from the bold, 
              experimental spirit of early internet pages while integrating user-friendly features. The experience is designed to feel like discovering an old yet futuristic 
              computer—one that powers on with the nostalgic glow of a vintage TV. Carefully chosen colors and animations enhance this effect, creating a unique, immersive experience.
                <span className="animate-blink">_</span>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="-mb-1"> 
                <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">Technologies Used</h3>
                <div className="pl-6 flex flex-wrap gap-4">
                    {technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300">
                            {tech}
                        </span>
                    ))}
                </div>
            </div> 

            {/* Chevron Link to Projects Page */}
            <div className="w-5">
          <Link href="/projects">
            <div className="cursor-pointer w-20 h-80 md:relative md:justify-end md:-bottom-2 md:items-end md:-ml-[85px] sm:fixed sm:-bottom-[230px] sm:-ml-[85px] text-[#0ccbed] duration-300 hover:opacity-50">
              <Icon icon="lucide:chevron-left" width="80" height="80" />
            </div>
          </Link>
          </div>
        </div>
        <div className="sm:block hidden h-11 w-full"></div>
      </div>
    </section>
  );
};

export default PortfolioAbout;
