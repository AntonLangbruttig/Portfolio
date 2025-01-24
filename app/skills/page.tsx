"use client";

import React from "react";
import Image from "next/image";


const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1.",
    link: "/project1",
    image: "/images/project1.png",
  },
  {
    title: "Project 2",
    description: "A brief description of project 2.",
    link: "/project2",
    image: "/images/project2.png",
  },
  {
    title: "Project 3",
    description: "A brief description of project 3.",
    link: "/project3",
    image: "/images/project3.png",
  },
  {
    title: "Project 4",
    description: "A brief description of project 4.",
    link: "/project4",
    image: "/images/project4.png",
  },
];

export default function HomePage() {
  return (
    
    <div>
      {/* other pages content here  */}
      <div
        className={`sm:flex sm:flex-col wrap relative w-full md:h-full aspect-video rounded-lg overflow-hidden shadow-lg  sm:h-screen sm:overflow-y-scroll flex-wrap`}
      >
      {/* {animationState === "content" && ( */}
          <div className="flex smflex-col h-full animate-fade-in flex-wrap ">
            <div className="sm:w-screen md:w-1/2 p-3 flex items-center justify-center flex-shrink-0 ">
              </div>
            </div>

            <div className="sm:w-screen md:w-[100%] p-4 flex items-center sm:justify-center flex-shrink-0 mt-5">
              
            <span className=" text-red-50 md:text-xl sm:text-base block space-y-2 ml-4 sm:space-y-0">
         Skills
          </span>
        </div>
          </div>
        {/* )} */}

</div>
  );
}

