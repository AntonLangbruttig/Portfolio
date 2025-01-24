import React from "react";

// Example data: Replace with your résumé/website skills
const skills = {
  "Used Often": ["JavaScript", "React", "CSS", "HTML", "Tailwind CSS", "Node.js"],
  "Secondary Skills": ["Python", "Express", "MongoDB", "Prisma", "Vue"],
  "Developing": ["Rust", "Svelte", "Next.js", "GraphQL", "Django"],
};

const Skills = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      {/* Main Header */}
      <h2 className="font-bold text-cyan-200 text-4xl mb-8 underline">Skills</h2>

      {/* Categories */}
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-8">
          {/* Category Header */}
          <h3 className="text-red-50 md:text-xl  text-2xl font-bold mb-4">{category}</h3>

          {/* Horizontal Skills List */}
          <p className="text-contactColor text-base font-medium text-white">
            {items.map((skill, index) => (
              <span key={skill}>
                {skill}
                {index < items.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Skills;
