"use client";

import React from "react";
import { PageAnimation } from "@/utils/animation"; // Import animation
import Image from "next/legacy/image";

export default function Bio() {
  const { fadeIn, isFirstLoad } = PageAnimation(); // Keeps the animation logic
  // const { hasAboutAnimationRun } = useAnimationContext(); // Checks global flag

  return (
    <section className="h-[calc(100vh-40px)] overflow-hidden md:mt-0 sm:-mt-7">
      <div className="h-[95%] overflow-y-scroll no-scrollbar py-6 md:mt-0 sm:mt-7">
        {/* Main Header */}
        <h2
          className={`font-bold text-cyan-200  text-4xl lg:mb-5 md:mb-7 underline px-14 transition-opacity duration-1000 sm:hidden md:block ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          Bio
        </h2>

        {/* Scrollable Content */}
        <div
          className={`px-[75px] text-gray-300 text-xl transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>
            From concept to launch, I transform ideas into intuitive and
            visually striking digital experiences. I’m Anton Langbruttig, a
            software developer passionate about creative problem-solving and
            user-centered design. To me, great design should feel
            effortless—seamlessly blending aesthetics and functionality.
          </p>

          <p className="md:mt-6 sm:mt-10">
            I’ve worked with clients and companies to craft custom solutions
            that are as elegant as they are effective. Currently, I’m developing
            a custom makeup platform where users can book appointments and
            explore products. Beyond development, I mentor young learners in
            computer science, helping foster the next generation of
            problem-solvers.
          </p>

          <p className="md:mt-7 sm:mt-10">
            Outside of coding, I’m always exploring—whether reading, playing
            music, or getting lost in nature. If you’re passionate about
            building elegant, user-friendly software, let’s connect and create
            something remarkable together.
          <span className="animate-blink">_</span>

          </p>
        </div>
      </div>
    </section>
  );
}
