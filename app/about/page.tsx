"use client";

import React from "react";
import { useAboutPageAnimation } from "@/components/utils/aboutAnimation"; // Import animation
import Image from "next/image";

export default function HomePage() {
  const { fadeIn, isFirstLoad } = useAboutPageAnimation();

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-full overflow-y-scroll no-scrollbar py-6">
        {/* Main Header */}
        <h2 
          className={`font-bold text-cyan-200  text-4xl mb-8 underline px-14 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
        >
          About
        </h2>

        {/* Scrollable Content */}
        <div 
          className={`px-[75px] text-gray-300 text-xl transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
        >
          I’m a tech enthusiast with a knack for unraveling how things work. My journey began with a degree in Computer Science from the University of Wisconsin-Milwaukee, where I delved into topics like artificial intelligence and large language models, graduating in 2022.

          I launched my career at Infosys, mastering automated testing and deepening my knowledge in machine learning and data science. While industry-wide layoffs presented a hurdle, I’ve used the opportunity to refocus and grow.

          Now, I’m channeling my skills into building impactful solutions. I’ve developed this portfolio site, taken on freelance web development projects, and kept up with the latest tech trends. I’m driven by a passion for problem-solving and eager to take on new challenges that make a difference.

          <span className="animate-blink">_</span>
        </div>
      </div>
    </section>
  );
}
