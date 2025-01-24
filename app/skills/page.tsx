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
<section id="skills" className="section">
  <div className="container">
    <h2 className="section-title">Skills</h2>
    <div className="skills-content">
      <div className="skills-category">
        <h3>Use Often</h3>
        <p>• Python • JavaScript • React.js • Django • Git/GitHub • PostgreSQL • HTML/CSS • Agile/Scrum</p>
      </div>
      <div className="skills-category">
        <h3>Secondary Skills</h3>
        <p>• NumPy • Pandas • TensorFlow • Docker • Jenkins • Automated Testing (Selenium) • Data Visualization</p>
      </div>
      <div className="skills-category">
        <h3>Developing</h3>
        <p>• Lua • Angular.js • AWS • Firebase • Probability & Statistics • Linear Algebra</p>
      </div>
    </div>
  </div>
</section>

  
  );
}

