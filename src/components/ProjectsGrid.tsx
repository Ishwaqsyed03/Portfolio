"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import CaseStudyModal from "./CaseStudyModal";
import { PROJECTS } from "@/content/data";

interface Project {
  title: string;
  type: string;
  status: string;
  description: string;
  detailedDescription: string;
  features: string[];
  tech: string[];
  stats: any; // Allow flexible stats structure
  tags: string[];
  links: { label: string; href: string; }[];
}

export default function ProjectsGrid() {
  const [open, setOpen] = useState<null | number>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects] = useState<Project[]>(PROJECTS);
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredProject(idx)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative cursor-pointer"
          >
            <div className="relative rounded-2xl modern-card overflow-hidden transition-all duration-300 glow-on-hover group-hover:modern-card">
              <button 
                className="absolute inset-0 z-10" 
                aria-label={`Open ${project.title} case study`} 
                onClick={() => setOpen(idx)} 
              />
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 p-6">
                {/* Project Preview Image */}
                <div className="h-32 rounded-lg glass-effect mb-4 relative overflow-hidden group-hover:backdrop-blur-strong transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-cyan-400/30 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-2 right-2 text-xs font-medium glass-effect px-2 py-1 rounded backdrop-blur-medium">
                    {project.status}
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="text-sky-400 text-sm font-semibold group-hover:text-sky-300 transition-colors duration-300">
                      {project.type}
                    </div>
                  </div>
                  <span className="rounded-md text-xs px-2 py-1 glass-effect backdrop-blur-medium">
                    Active
                  </span>
                </div>

                {/* Basic Description */}
                <p className="text-zinc-300 text-sm mb-3 group-hover:text-zinc-200 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-xs rounded-md glass-effect backdrop-blur-light px-2 py-1 text-zinc-300 hover:backdrop-blur-medium transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs rounded-md glass-effect backdrop-blur-light px-2 py-1 text-zinc-400">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Expanded Content */}
                {hoveredProject === idx && (
                  <div className="border-t border-white/10 pt-4 mt-4 animate-in fade-in duration-300">
                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech: string) => (
                          <span key={tech} className="text-xs bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-sky-500/30 px-2 py-1 rounded text-zinc-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Status */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Status:</h4>
                      <div className="text-sm text-green-400">{project.status}</div>
                    </div>
                  </div>
                )}

                {/* Links - Always Visible */}
                <div className="flex gap-3 mt-auto">
                  {project.links.map((link, linkIdx) => (
                    <a 
                      key={linkIdx}
                      href={link.href} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm text-sky-400 hover:text-sky-300 transition-colors duration-200 font-medium"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <CaseStudyModal
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open !== null ? projects[open]?.title || "" : ""}
        description={open !== null ? projects[open]?.description || "" : ""}
        media={open !== null && projects[open] ? [{ src: "/nebula.jpg", alt: projects[open].title }] : []}
      />
    </>
  );
}
