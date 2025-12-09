"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "/styles/globals.css";
import { PageAnimation } from "@/utils/animation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Lets Face it Website",
    link: "/projects/luxAbout/",
    video: "/images/Lets_face_rec.mov",
    mobileVideo: "/images/Lets_face_rec_long.mov",
    moreInfoLink: "/projects/luxAbout/",
    goto: "https://letsfaceitcosmetics.com/",
  },
  {
    title: "Portfolio Website",
    link: "/projects/portfolioAbout/",
    image: "/images/portfoliolg.webp",
    mobileImage: "/images/portfoliosm.webp",
    moreInfoLink: "/projects/portfolioAbout/",
    goto: "/",
    github: "https://github.com/yourusername/portfolio",
  },
    {
    title: "Lets Face it Website",
    link: "/projects/luxAbout/",
    video: "/images/Lets_face_rec.mov",
    mobileVideo: "/images/Lets_face_rec_long.mov",
    moreInfoLink: "/projects/luxAbout/",
    goto: "https://letsfaceitcosmetics.com/",
  },
    {
    title: "Lets Face it Website",
    link: "/projects/luxAbout/",
    video: "/images/Lets_face_rec.mov",
    mobileVideo: "/images/Lets_face_rec_long.mov",
    moreInfoLink: "/projects/luxAbout/",
    goto: "https://letsfaceitcosmetics.com/",
  },
];

export default function ProjectsPage() {
  const { fadeIn } = PageAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);

  const clampHeight = () => {
    if (typeof window === 'undefined') return 0;

    const viewportHeight = window.innerHeight;

    // Define your desired heights at specific viewport sizes
    const smallViewport = 500;  // Viewport height at small screen
    const smallHeight = 427;    // Container height you want at 500px viewport
    const largeViewport = 970;  // Viewport height at large screen
    const largeHeight = 893.5;    // Container height you want at 968px viewport

    // Calculate the slope between the two points
    const slope = (largeHeight - smallHeight) / (largeViewport - smallViewport);

    // Linear interpolation: y = mx + b
    const interpolatedHeight = smallHeight + slope * (viewportHeight - smallViewport);

    // Clamp to stay within reasonable bounds
    const clampedValue = Math.max(smallHeight, Math.min(interpolatedHeight, largeHeight));

    return clampedValue;
  };

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(clampHeight());
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setShowLeftArrow(false);
      setShowRightArrow(true);
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
      setShowLeftArrow(true);
      setShowRightArrow(false);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  return (
    <div
      className={`h-screen flex flex-col md:w-[1000px] sm:justify-start sm:items-start md:[align-items:unset] sm:pl-6
        sm:w-full md:h-max md:pl-[15px] md:pr-10 mr-64 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Fixed heading for md and lg screens */}
      <h2 className={`hidden md:block font-bold text-cyan-200 md:-mt-[9.5px] md:pt-5 text-4xl underline md:pl-6
          transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >Projects</h2>

      <div className="relative w-full group">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="hide-scrollbar  md:mt-8 overflow-x-auto md:py-5 flex md:max-h-[400px]
          items-center justify-center md:justify-start sm:items-center sm:w-auto md:-ml-3"
          style={{ height: `${containerHeight}px` }}
        >
          <div
            className="group flex md:pl-7 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-[60px] md:gap-0 mt-10 sm:mt-0 sm:my-auto
            sm:w-full md:w-auto md:flex-nowrap sm:space-x-0 md:flex-row md:space-x-6 md:space-y-0 sm:px-0 md:px-6"
          >
            {/* Scrollable heading for small screens */}
            <h2 className={`md:hidden font-bold text-cyan-200 text-4xl underline sm:mt-4 sm:mb-2 w-full text-start
                transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            >Projects</h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative bg-black outline outline-4 outline-transparent outline-offset-[3.5px]
                rounded-none w-[600px] transition-transform duration-500 transform cursor-pointer
                hover:outline-[#2bbfec] sm:-mt-7 sm:w-[275px]  sm:max-w-80 sm:h-[450px]
                md:mt-0 md:w-[600px] md:min-w-[600px] md:max-w-none md:h-[350px] md:mb-0"
              >
                <Link href={project.link} className="block mb-4 md:h-full sm:h-[500px]">
                  {project.video ? (
                    <>
                      {/* Desktop Video */}
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hidden md:block rounded-none w-full h-full object-contain min-h-[150px] -translate-y-4"
                      />
                      {/* Mobile Video */}
                      <video
                        src={project.mobileVideo || project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="block md:hidden rounded-none w-full h-[430px] object-cover object-top translate-y-0 min-h-[120px]"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={project.image!}
                        alt={project.title}
                        width={350}
                        height={250}
                        priority={true}
                        className="hidden sm:hidden md:block rounded-none lg:object-center w-full h-full object-center min-h-[150px]"
                      />
                      <Image
                        src={project.mobileImage!}
                        alt={project.title}
                        width={350}
                        height={100}
                        priority={true}
                        className="hidden sm:block md:hidden lg:hidden rounded-none w-full h-[430px] object-cover object-top"
                      />
                    </>
                  )}
                </Link>
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 p-2 sm:pt-1  md:h-[50px] ${
                    project.title === "Portfolio Website"
                      ? "sm:h-[110px]"
                      : project.title === "Lets Face it Website"
                      ? "sm:h-[110px]"
                      : "sm:h-[110px]"
                  }`}
                >
                  <h3 className="md:text-3xl sm:text-xl font-bold text-white md:mt-1">
                    {project.title}
                  </h3>
                  <div className="md:absolute bottom-3 right-2 flex md:space-x-2 sm:ml-[1px] sm:justify-center
                   md:flex-row sm:flex-row sm:flex-wrap sm:gap-1 md:flex-nowrap">
                    {/* Go to Website Button */}
                    {(project.title === "Portfolio Website" ||
                      project.title === "Lets Face it Website") && (
                      <a
                        href={project.goto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#059ec9] text-white text-sm font-medium py-[6px] md:px-3 
                        sm:mr-0 sm:px-[10px] sm:py-1 md:mt-0 sm:mt-1 rounded-none hover:bg-cyan-700 
                        transition sm:text-center md:w-auto sm:w-[calc(50%-2px)]"
                      >
                        Go to Website
                      </a>
                    )}

                    {/* GitHub Button */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#059ec9] text-white text-sm font-medium py-[6px] md:px-3 
                        sm:mr-0 sm:px-[10px] sm:py-1 md:mt-0 sm:mt-1 rounded-none hover:bg-cyan-700 
                        transition sm:text-center md:w-auto sm:w-[calc(50%-2px)] flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}

                    {/* More Info Button */}
                    <Link
                      href={project.moreInfoLink}
                      className="bg-[#059ec9] text-white text-sm font-medium py-[6px] 
                      md:px-3 sm:mr-0 sm:px-[10px] sm:mt-1 md:mt-0 sm:py-1 rounded-none hover:bg-cyan-700 
                      transition sm:text-center md:w-auto sm:w-[calc(50%-2px)]"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollToLeft}
          className={`hidden md:block lg:block absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-opacity-0 p-3 -ml-7
                     group-hover:text-opacity-100 transition-all duration-300 z-10 text-2xl
                     ${showLeftArrow ? "group-hover:opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="w-14 h-14" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollToRight}
          className={`hidden md:block lg:block absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-opacity-0 p-3 -mr-4
                     group-hover:text-opacity-100 transition-all duration-300 z-10 text-2xl
                     ${showRightArrow ? "group-hover:opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronRight className="w-14 h-14" />
        </button>
      </div>
    </div>
  );
}