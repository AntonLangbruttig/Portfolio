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
    <div className="p-[0px]  h-screen flex flex-col w-screen ml-10">
    <div className="overflow-y-auto ">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white mb-10 shadow-lg rounded-lg w-full max-w-md p-4 mt-10"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="rounded-lg"
          />
          <h3 className="mt-4 text-lg font-bold">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  </div>
  );
}

