"use client";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { PageAnimation } from "@/components/utils/animation"; // Import animation
import { Icon } from '@iconify/react';

const LuxAbout = () => {
  const { fadeIn } = PageAnimation(); // Use the same animation logic

  // List of technologies used
  const technologies = [
    "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript",
    "Node.js", "FastAPI", "PostgreSQL", "AWS", "Vercel"
  ];

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-full overflow-y-scroll no-scrollbar py-6">
       
        {/* Main Header */}
        <h2 className={`md:block sm:hidden font-bold text-cyan-200 text-4xl mb-8 underline px-14 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            Let&apos;s Face It Website
        </h2>

        
        {/* Description */}
        <div className={`px-[75px] transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <div className="mb-7"> 
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">Description</h3>
              <div className={`pl-[25px] text-gray-300 text-xl transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                I’m a tech enthusiast with a knack for unraveling how things work. My journey began with a degree in Computer Science from the University of Wisconsin-Milwaukee,
                where I delved into topics like artificial intelligence and large language models, graduating in 2022.
                <span className="animate-blink">_</span>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="mb-7"> 
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
            <Link href="/projects">
              <div className="cursor-pointer w-20 h-80 md:relative md:justify-end md:-bottom-2 md:items-end md:-ml-[85px] sm:fixed sm:-bottom-[230px] sm:-ml-[85px] text-[#0ccbed]  duration-300 hover:opacity-50">
                <Icon icon="lucide:chevron-left" width="80" height="80" />
              </div> 
            </Link>

        </div>
      </div>
    </section>
  );
};

export default LuxAbout;
