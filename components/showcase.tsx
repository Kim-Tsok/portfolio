"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"


export interface Project {
  id: string
  title: string
  description: string
  image_url?: string
  tech_stack: string[]
  link?: string
  github_url?: string
  custom_links?: { label: string; url: string }[]
}

interface ShowcaseProps {
  projects: Project[]
}

export default function Showcase({ projects = [] }: ShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="bg-[#eadfd8]/80 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">Featured Projects</h2>
          <p className="text-center text-[#bfa18e]">No projects added yet. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#eadfd8] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 animate-in fade-in duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">Featured Projects</h2>
          <p className="text-center text-[#634836] max-w-2xl mx-auto">
            A selection of recent work showcasing design and development expertise
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${
                  index === currentIndex ? "opacity-100 translate-x-0" : "hidden opacity-0 translate-x-full"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center animate-in fade-in duration-500">
                  {/* Project Image */}
                  <div className="flex-1 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                    <div className="rounded-2xl overflow-hidden bg-[#d4cfc5] aspect-video flex items-center justify-center relative group">
                      {project.image_url ? (
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-[#bfa18e]">No image</div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                    <h3 className="text-3xl font-bold text-black mb-4 group-hover:text-[#634836] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#634836] text-lg mb-6 leading-relaxed">{project.description}</p>

                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech_stack.map((tech: string, i: number) => (
                          <span
                            key={tech}
                            className="bg-[#ab8164] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#634836] transition-colors duration-300 animate-in fade-in duration-500"
                            style={{
                              animationDelay: `${300 + i * 50}ms`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#634836] text-white rounded-full font-semibold hover:bg-[#4a3628] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          View Project <ExternalLink size={16} />
                        </a>
                      )}

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <Github size={18} /> GitHub
                        </a>
                      )}

                      {project.custom_links?.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ab8164] text-white rounded-full font-semibold hover:bg-[#9b8b7e] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          {link.label} <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-12 animate-in fade-in duration-700 delay-300">
            <button
              onClick={prevSlide}
              className="bg-[#634836] hover:bg-[#4a3628] text-white rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex justify-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-[#634836] w-8 h-2" : "bg-[#ab8164] w-2 h-2 hover:bg-[#9b8b7e]"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-[#634836] hover:bg-[#4a3628] text-white rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
