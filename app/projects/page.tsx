import React from 'react';


const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://example.com/ecommerce"
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application using OpenWeatherMap API",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["JavaScript", "API Integration", "CSS3"],
    link: "https://example.com/weather-app"
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Collaborative task manager with real-time updates",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Firebase", "Material-UI"],
    link: "https://example.com/task-manager"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["HTML5", "CSS3", "JavaScript"],
    link: "https://example.com/portfolio"
  }
]

export default function Portfolio() {
  return (
    <div className="min">
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Web Development Portfolio</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <img className="h-48 w-full object-cover" src={project.image} alt={project.title} />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}