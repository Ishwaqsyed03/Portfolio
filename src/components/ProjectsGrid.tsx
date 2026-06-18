"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CaseStudyModal from "./CaseStudyModal";
import ProjectPreview from "./ProjectPreview";
import ProjectPreviewPopup from "./ProjectPreviewPopup";
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
  tags?: string[];
  github?: string;
  video?: string;
  previewUrl?: string;
  previewImage?: string;
  gallery?: string[];
  links?: { label: string; href: string; }[];
}

// Locally-hosted screenshots (no third-party service at runtime), base-path aware.
function screenshotsFor(p: Project, basePath: string): string[] {
  const raw = p.gallery ?? (p.previewImage ? [p.previewImage] : []);
  return raw.map((s) => (s.startsWith("http") ? s : `${basePath}${s}`));
}

export default function ProjectsGrid() {
  const [open, setOpen] = useState<null | number>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [popupAlign, setPopupAlign] = useState<"left" | "center" | "right">("center");
  const [projects] = useState<Project[]>(PROJECTS);
  const [loading] = useState(false);
  const basePath = process.env.NODE_ENV === "production" ? "/Portfolio" : "";

  // Pick a popup anchor that keeps the (wider-than-card) window inside the viewport.
  const handleEnter = (idx: number, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vw = window.innerWidth;
    const center = rect.left + rect.width / 2;
    const half = Math.min(640, vw * 0.92) / 2;
    if (center - half < 12) setPopupAlign("left");
    else if (center + half > vw - 12) setPopupAlign("right");
    else setPopupAlign("center");
    setHoveredProject(idx);
  };

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
        {projects.map((project, idx) => {
          const shots = screenshotsFor(project, basePath);
          const primaryHref = project.links?.[0]?.href ?? project.github ?? "#";
          const visitLabel = project.previewUrl ? "Visit Website" : "View on GitHub";
          return (
          <motion.div
            key={idx}
            onMouseEnter={(e) => handleEnter(idx, e)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative cursor-pointer"
          >
            {/* Hover pop-up window with screenshot gallery + overview + link */}
            <AnimatePresence>
              {hoveredProject === idx && (
                <ProjectPreviewPopup
                  title={project.title}
                  type={project.type}
                  overview={project.detailedDescription}
                  tech={project.tech}
                  href={primaryHref}
                  visitLabel={visitLabel}
                  shots={shots}
                  video={project.video ? `${basePath}${project.video}` : undefined}
                  align={popupAlign}
                />
              )}
            </AnimatePresence>

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
                {/* Project Preview - compact thumbnail (popup appears on hover) */}
                <ProjectPreview
                  title={project.title}
                  status={project.status}
                  href={primaryHref}
                  image={shots[0]}
                  video={project.video ? `${basePath}${project.video}` : undefined}
                />

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
                  {(project.links ?? (project.github ? [{ label: "GitHub", href: project.github }] : [])).map((link, linkIdx) => (
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
          );
        })}
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
