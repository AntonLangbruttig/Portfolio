"use client";

import React from "react";
import Image from "next/image";
import { useAboutPageAnimation } from "@/components/utils/aboutAnimation"; // Import animation

const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1.",
    link: "/project1",
    image: "/images/logo.png",
  },
  {
    title: "Project 2",
    description: "A brief description of project 2.",
    link: "/project2",
    image: "/images/background1.png",
  },
  {
    title: "Project 3",
    description: "A brief description of project 3.",
    link: "/project3",
    image: "/images/background1.png",
  },
  {
    title: "Project 4",
    description: "A brief description of project 4.",
    link: "/project4",
    image: "/images/background.jpg",
  },
];

export default function ProjectsPage() {
  const { fadeIn } = useAboutPageAnimation(); // Use shared animation logic

  return (
    <div className={`p-0 h-screen flex flex-col w-screen ml-10 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="overflow-y-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white mb-10 shadow-lg rounded-lg w-full max-w-md p-4 mt-10 transition-all duration-500 transform hover:scale-105"
          >
            <a href={project.link}>
              <Image
                src={project.image}
                alt={project.title}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </a>
            <h3 className="mt-4 text-lg font-bold text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
