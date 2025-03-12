

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import "/styles/globals.css";
import { PageAnimation } from "@/utils/animation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Portfolio Website",
    description: "A brief description of project 1.",
    link: "/projects/portfolioAbout/",
    image: "/images/portfolioLG.png",
    mobileImage: "/images/portfolioSM.png",
    moreInfoLink: "/projects/portfolioAbout/",
    goto: "/",
  },
  {
    title: "Lets Face it Website",
    description: "A brief description of project 2.",
    link: "/projects/luxAbout/",
    image: "/images/letsFaceItLG.jpg",
    mobileImage: "/images/letsFaceItSM.png",
    moreInfoLink: "/projects/luxAbout/",
  },
];

export default function ProjectsPage() {
  const { fadeIn } = PageAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
      className={`h-screen flex flex-col md:w-[1000px] sm:justify-center sm:items-center md:[align-items:unset] sm:w-full md:h-max md:pl-[15px] md:pr-10 mr-64 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2
        className={`sm:hidden md:block font-bold text-cyan-200 pt-5 text-4xl underline pl-6 transition-opacity sm:overflow-y-scroll duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        Projects
      </h2>
      <div className="relative w-full group">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="hide-scrollbar sm:-mt-[90px] md:mt-auto overflow-x-auto lg:py-8 md:py-10 flex sm:max-h-[calc(100vh-58px)] items-center justify-center md:justify-start sm:justify-center sm:items-center sm:w-auto md:-ml-3"
        >
          <div
            className="group flex md:pl-7 sm:flex-col sm:items-center sm:justify-start mt-10 sm:mt-0 sm:my-auto sm:w-[327px] md:md:[width:unset] 
                        sm:space-x-0 md:flex-row md:space-x-6 md:space-y-0 px-6"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative bg-black outline outline-4 outline-transparent outline-offset-[3.5px]
                rounded-none w-[600px] transition-transform duration-500 transform cursor-pointer
                hover:outline-[#2bbfec] sm:mt-10 sm:w-[95%] sm:max-w-80 sm:h-[505px]
                md:mt-0 md:w-[600px] md:max-w-none md:h-[350px] lg:h-80 md:mb-0"
              >
                <Link href={project.link} className="block mb-4 md:h-full sm:h-[600px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={350}
                    height={250}
                    className="hidden sm:hidden md:block rounded-none lg:object-center w-full h-full object-center min-h-[150px]"
                  />
                  <Image
                    src={project.mobileImage}
                    alt={project.title}
                    width={350}
                    height={100}
                    className="hidden sm:block md:hidden lg:hidden rounded-none w-full h-[470px] object-contain"
                  />
                </Link>
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 p-2 sm:pt-1 md:h-[60px] ${
                    project.title === "Portfolio Website"
                      ? "sm:h-[105px]"
                      : project.title === "Let's Face It"
                      ? "sm:h-[72px]"
                      : "sm:h-[72px]"
                  }`}
                >
                  <h3 className="md:text-3xl sm:text-xl font-bold text-white md:mt-3">
                    {project.title}
                  </h3>
                  <div className="md:absolute bottom-3 right-2 flex md:space-x-2 sm:ml-[1px] sm:justify-center md:flex-row sm:flex-col">
                    <Link
                      href={project.moreInfoLink}
                      className="bg-[#059ec9] text-white text-sm font-medium py-[6px] md:px-3 sm:mr-1 sm:px-[20px] sm:mt-1 md:mt-0 sm:py-1 rounded-none hover:bg-cyan-700 transition sm:text-center md:w-auto sm:w-[250px]"
                    >
                      More Info
                    </Link>
                    {project.title === "Portfolio Website" && (
                      <a
                        href={project.goto}
                        className="bg-[#059ec9] text-white text-sm font-medium py-[6px] md:px-3 sm:mr-1 sm:px-[20px] sm:py-1 md:mt-0 sm:mt-1 rounded-none hover:bg-cyan-700 transition sm:text-center md:w-auto sm:w-[250px]"
                      >
                        Go to Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollToLeft}
          className={`hidden md:block lg:block absolute left-0 top-1/2 transform -translate-y-1/2  text-white text-opacity-0 p-3 -ml-7
                     group-hover:text-opacity-100 transition-all duration-300 z-10 text-2xl
                     ${showLeftArrow ? 'group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft className="w-14 h-14" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollToRight}
          className={`hidden md:block lg:block absolute right-0 top-1/2 transform -translate-y-1/2  text-white text-opacity-0 p-3 -mr-4
                     group-hover:text-opacity-100 transition-all duration-300 z-10 text-2xl
                     ${showRightArrow ? 'group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight className="w-14 h-14" />
        </button>
      </div>
    </div>
  );
}