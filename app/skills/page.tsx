import React from "react";

// Example data: Replace with your résumé/website skills
const skills = {
  "Used Often": ["JavaScript", "React", "CSS", "HTML", "Tailwind CSS", "Node.js"],
  "Secondary Skills": ["Python", "Express", "MongoDB", "Prisma", "Vue"],
  "Developing": ["Rust", "Svelte", "Next.js", "GraphQL", "Django"],
};

const Skills = () => {
  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-full overflow-y-scroll no-scrollbar py-6">
        {/* Main Header */}
        <h2 className="font-bold text-cyan-200 text-4xl mb-8 underline px-14">Skills</h2>

        {/* Scrollable Content */}
        <div className="px-[75px]">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-10">
              {/* Category Header */}
              <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">{category}</h3>

              {/* Indented Skills List */}
              <div className="pl-6 flex flex-wrap gap-4">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium"
                  >
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
