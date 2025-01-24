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
              <div className="w-full h-full p-4 rounded-lg  items-top md:justify-left sm:justify-center"  style={{
    color: "#ffffff",
    fontFamily: '"VT323", monospace',
    fontWeight: "400",
    letterSpacing: "0.05em",
    lineHeight: "1.6",
    textAlign: "left",

  }}>
                About
                <br />
              <pre
  className="text-lg"
  style={{
    color: "#ffffff",
    fontFamily: '"VT323", monospace',
    fontWeight: "400",
    letterSpacing: "0.05em",
    lineHeight: "1.6",
    textAlign: "left",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    wordBreak: "break-word",
    margin: 0,
    padding: 0,
    width: "100%",
    overflow: "hidden",
  }}
>



I’m am a tech enthusiast with a knack for unraveling how things work. My journey began with a degree in Computer Science from the University of Wisconsin-Milwaukee, where I delved into topics like artificial intelligence and large language models, graduating in 2022.

I launched my career at Infosys, mastering automated testing and deepening my knowledge in machine learning and data science. While industry-wide layoffs presented a hurdle, I’ve used the opportunity to refocus and grow.

Now, I’m channeling my skills into building impactful solutions. I’ve developed this portfolio site, taken on freelance web development projects, and kept up with the latest tech trends. I’m driven by a passion for problem-solving and eager to take on new challenges that make a difference.
<span className="animate-blink">_</span>
</pre>


              </div>
            </div>
          </div>
        {/* )} */}

</div>
  );
}

