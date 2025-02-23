"use client";

import React from "react";
import Image from "next/image";
import { useAboutPageAnimation } from "@/components/utils/aboutAnimation"; // Import animation

const projects = [
  {
    title: "Portfolio Website",
    description: "A brief description of project 1.",
    link: "/project1",
    image: "/images/portfolio_1.png",
    mobileImage1: "/images/portfolio_1.png",
    mobileImage2: "/images/portfolio_mobil.png",
    moreInfoLink: "/project1-details"
  },
  {
    title: "Lets Face it Website",
    description: "A brief description of project 2.",
    link: "/project2",
    image: "/images/LetsFaceIt1.jpg",
    mobileImage1: "/images/portfolio_1.png",
    mobileImage2: "/images/portfolio_mobil.png",
    moreInfoLink: "/project2-details"
  },
  {
    title: "Project 3",
    description: "A brief description of project 3.",
    link: "/project3",
    image: "/images/background.jpg",
    mobileImage1: "/images/portfolio_1.png",
    mobileImage2: "/images/portfolio_mobil.png",
    moreInfoLink: "/project3-details"
  },
];

export default function ProjectsPage() {
  const { fadeIn } = useAboutPageAnimation(); // Use shared animation logic

  return (
    <div className={`h-screen flex flex-col md:w-[1000px] sm:justify-center sm:items-center md:[align-items:unset] sm:w-full md:h-max pl-[15px] pr-10 mr-64 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <h2 className={`sm:hidden md:block font-bold text-cyan-200 pt-5 text-4xl underline pl-6 transition-opacity sm:overflow-y-scroll duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        Projects
      </h2>
      <div className="hide-scrollbar overflow-x-auto lg:py-8 md:py-10 flex items-center justify-center sm:justify-start sm:w-auto -ml-3">
        <div className="flex pl-7 sm:flex-col sm:items-center sm:my-auto sm:w-screen md:md:[width:unset] sm:justify-center sm:space-y-6 sm:space-x-0 md:flex-row md:space-x-6 md:space-y-0 px-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-white shadow-[0_6px_30px_rgba(0,0,0,0)] outline outline-4 outline-transparent outline-offset-[3.5px] rounded-none w-[600px] sm:w-[95%] sm:max-w-80 md:max-w-none md:w-[600px] lg:h-80 md:h-[350px] sm:h-[480px] transition-transform duration-500 transform hover:outline-[#2bbfec] hover:outline-rounded-none cursor-pointer"
            >
              <a href={project.link} className="block mb-4 h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={350}
                  height={250}
                  className="hidden sm:hidden md:block rounded-none lg:object-center w-full h-full object-center min-h-[150px]"
                />
                <Image
                  src={project.mobileImage1}
                  alt={project.title}
                  width={350}
                  height={250}
                  className="hidden sm:hidden md:hidden lg:hidden rounded-none  w-full h-full object-contain "
                />
              <Image
                  src={project.mobileImage2}
                  alt={project.title}
                  width={350}
                  height={250}
                  className="hidden sm:block md:hidden lg:hidden rounded-none  w-full h-full object-contain"
                />
              </a>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-2 h-[60px]">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-white line-clamp-2">{project.description}</p>
                <div className="absolute bottom-3 right-2 flex space-x-2">
                  <a href={project.moreInfoLink} className="bg-[#059ec9] text-white text-sm font-medium py-1 px-3 rounded-none hover:bg-cyan-700 transition">
                    More Info
                  </a>
                  <a href={project.link} className="bg-[#059ec9] text-white text-sm font-medium py-1 px-3 rounded-none hover:bg-cyan-700 transition">
                    Go to Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
