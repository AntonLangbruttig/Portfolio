"use client";

import React from "react";
import { PageAnimation } from "@/utils/animation"; 

const skills = {
  "Used Often": ["React", "CSS", "HTML" ,"Tailwind", "Next.js", "GitHub"],
  "Secondary Skills": ["Python", "Django", "Java", "C", "JavaScript", "Framer Motion", "AWS", "SQL"],
  "Developing": [ "Numpy", "Pandas", "Matplotlib","TensorFlow","Lua"],
    

};

const Skills = () => {
  const { fadeIn } = PageAnimation(); 
  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-[96.5%] overflow-y-scroll no-scrollbar py-6"> 
        {/* Main Header */}
        <h2 className={`md:block sm:hidden font-bold text-cyan-200 text-4xl mb-8 underline px-14 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          Skills
        </h2>
        {/* Scrollable Content */}
        <div className={`px-[75px] transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-10">
              {/* Category Header */}
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
                {category}
              </h3>
              {/* Indented Skills List */}
              <div className="pl-6 flex flex-wrap gap-4">
                {items.map((skill) => (
                  <span key={skill} className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
