"use client";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { PageAnimation } from "@/utils/animation"; // Import animation
import { Icon } from "@iconify/react";

const LuxAbout = () => {
  const { fadeIn } = PageAnimation(); // Use the same animation logic

  // List of technologies used
  const technologies = [
    "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript",
     "AWS SES", "Yarn","JavaScript","HTML"
  ];

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-[96.5%] overflow-y-scroll no-scrollbar py-6 ">
        {/* Main Header */}
        <h2
          className={`md:block sm:hidden font-bold text-cyan-200 text-4xl lg:mb-5 md:mb-7 underline px-14 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          Let&apos;s Face It Website
        </h2>

        {/* Description */}
        <div
          className={`px-[75px] transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-7">
            <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
              Description
            </h3>
            <div
              className={`pl-[25px] text-gray-300 text-lg transition-opacity duration-1000 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
            Let’s Face It is a boutique makeup service company specializing in event makeup. 
            Their website is designed to offer a seamless experience for booking appointments 
            and purchasing high-end beauty products. With a sleek, classic aesthetic, the design 
            reflects their commitment to luxury and timeless style. This project blends functionality 
            with elegance, ensuring an intuitive and visually stunning user experience. The website is 
            currently in development and will be launching soon.
              <span className="animate-blink">_</span>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-4">
            <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
              Technologies Used
            </h3>
            <div className="pl-6 flex flex-wrap gap-4">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-5 lg:-mt-7 md:-mt-9 ">
          <Link href="/projects">
            <div className="cursor-pointer w-20 h-80 md:relative md:justify-end md:-bottom-2 md:items-end md:-ml-[85px] sm:fixed sm:-bottom-[230px] sm:-ml-[85px] text-[#0ccbed] duration-300 hover:opacity-50">
              <Icon icon="lucide:chevron-left" width="80" height="80" />
            </div>
          </Link>
          </div>
        </div>
        <div className="sm:block hidden h-8 w-full"></div>

      </div>
    </section>
  );
};

export default LuxAbout;
