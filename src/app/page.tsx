"use client";

import { useState, useEffect } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import ProjectsGrid from "../components/ProjectsGrid";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import SmoothScrollWrapper from "../components/SmoothScrollWrapper";
import PerformanceMonitor from "../components/PerformanceMonitor";
import SkillsSection from "../components/SkillsSection";
import { ShaderCanvas } from "@/components/ShaderCanvas";
import { ShaderSelector } from "@/components/ShaderSelector";
import { ScrollShaderBackground } from "@/components/ScrollShaderBackground";
import { SITE } from "../content/data";
import profileData from "../data/profile.json";

function useTypingEffect(text: string, speed: number = 60) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setIndex(0);
    if (!text) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, mounted]);

  if (!mounted) {
    return text;
  }
  
  return text.slice(0, index);
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedShader, setSelectedShader] = useState(1);
  const [profileImage, setProfileImage] = useState('/project-images/1758475845776.jpg');
  const prefersReducedMotion = useReducedMotion();
  
  // Call all hooks at the top level
  const typingText = useTypingEffect("Full-Stack Developer & AI Engineer", 80);
  
  useEffect(() => {
    setMounted(true);
    // Load shader preference from localStorage
    const savedShader = localStorage.getItem("selectedShader");
    if (savedShader) {
      setSelectedShader(parseInt(savedShader, 10));
    }
    
    // Load profile image from imported data
    if (profileData.profileImage) {
      setProfileImage(profileData.profileImage);
    }
  }, []);

  const handleSelectShader = (id: number) => {
    setSelectedShader(id);
    localStorage.setItem("selectedShader", id.toString());
  };

  // Optimized animation configuration
  const springConfig = { type: "spring" as const, stiffness: 260, damping: 20 };
  const smoothTransition = { duration: 0.6, ease: "easeOut" as const };
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative min-h-screen overflow-x-hidden text-white bg-black">
        <div className="container mx-auto px-6 pt-28">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-400">{SITE.name}</span>
          </h1>
        </div>
      </div>
    );
  }
  
  return (
    <SmoothScrollWrapper>
      <PerformanceMonitor />
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <div className="relative min-h-screen overflow-x-hidden text-white" style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
          {/* Scroll-Responsive Shader Background */}
          <ScrollShaderBackground selectedShader={selectedShader} />

          {/* Shader Selector - Fixed position */}
          <div className="fixed top-20 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/10"
            >
              <ShaderSelector
                selectedShader={selectedShader}
                onSelectShader={handleSelectShader}
              />
            </motion.div>
          </div>
          
          <main className="relative z-10">
            {/* Hero Section */}
            <section className="pt-28 pb-20 container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={smoothTransition}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                    >
                      Hi, I'm{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-400">
                        {SITE.name}
                      </span>
                    </motion.h1>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...smoothTransition, delay: 0.3 }}
                      className="text-2xl md:text-4xl lg:text-5xl font-bold mt-4"
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-400">
                        {typingText}
                        <span className="animate-pulse">|</span>
                      </span>
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...smoothTransition, delay: 0.5 }}
                    className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-xl"
                  >
                    I build innovative digital experiences that push the boundaries of technology. 
                    From AI-powered applications to full-stack solutions, I turn ideas into reality.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...smoothTransition, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.a 
                      href="#projects" 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springConfig}
                      className="group relative px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 smooth-transition border border-blue-500/50 hover:border-blue-400/70 overflow-hidden text-white font-medium glow-on-hover"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 smooth-transition" />
                      <span className="relative z-10">View Projects</span>
                    </motion.a>
                    <motion.a 
                      href="#contact" 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springConfig}
                      className="group relative px-6 py-3 rounded-lg border border-white/20 bg-black/40 backdrop-blur-lg hover:bg-black/50 hover:border-white/30 smooth-transition overflow-hidden text-white font-medium glow-on-hover"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-zinc-200/10 opacity-0 group-hover:opacity-100 smooth-transition" />
                      <span className="relative z-10">Get In Touch</span>
                    </motion.a>
                    <motion.a 
                      href="/resume.pdf" 
                      download="Ishwaq_Syed_Resume.pdf"
                      target="_blank"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springConfig}
                      className="group relative px-6 py-3 rounded-lg border border-zinc-500/20 bg-black/30 backdrop-blur-lg hover:bg-black/40 hover:border-zinc-400/30 smooth-transition overflow-hidden text-white font-medium glow-on-hover"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-400/10 to-zinc-600/10 opacity-0 group-hover:opacity-100 smooth-transition" />
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resume
                      </span>
                    </motion.a>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...smoothTransition, delay: 0.7 }}
                    className="flex gap-4"
                  >
                    <motion.a 
                      href="https://github.com/Ishwaqsyed03" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group p-3 rounded-lg border border-white/15 bg-black/30 backdrop-blur-md hover:bg-black/40 hover:border-white/25 transition-all duration-300 glow-on-hover"
                    >
                      <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://www.linkedin.com/in/ishwaq-syed-3a4368286" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group p-3 rounded-lg border border-white/15 bg-black/30 backdrop-blur-md hover:bg-black/40 hover:border-white/25 transition-all duration-300 glow-on-hover"
                    >
                      <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href={`mailto:${SITE.email}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group p-3 rounded-lg border border-white/15 bg-black/30 backdrop-blur-md hover:bg-black/40 hover:border-white/25 transition-all duration-300 glow-on-hover"
                    >
                      <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Right Column - Profile Photo */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="relative">
                    {/* Outer decorative rings */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-80 h-80 rounded-full border border-sky-500/20"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 w-76 h-76 rounded-full border border-fuchsia-500/20"
                    />
                    
                    {/* Main Photo Container */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="relative w-80 h-80 rounded-full border-4 border-white/20 overflow-hidden group"
                    >
                      {/* Profile Image */}
                      <img
                        src={profileImage}
                        alt={SITE.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/project-images/1758475845776.jpg'; // fallback
                        }}
                      />
                      
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Down Arrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 1 }}
                className="flex justify-center mt-16"
              >
                <motion.a
                  href="#about"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="group flex flex-col items-center text-zinc-400 hover:text-white transition-colors duration-300"
                >
                  <span className="text-sm font-medium mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">Learn More</span>
                  <div className="p-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md group-hover:border-white/30 group-hover:bg-black/40 transition-all duration-300 glow-on-hover">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </motion.a>
              </motion.div>
            </section>

          {/* About Me Section */}
          <section id="about" className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  Passionate about creating innovative solutions that make a difference in the world of technology
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Column - Journey & Mission */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-lg p-8 hover:border-white/25 transition-all duration-300 overflow-hidden glow-on-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-fuchsia-500 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white text-xl">🚀</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">My Journey</h3>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        My passion for technology started early, and I've been constantly learning and building projects that solve real-world problems. 
                        From developing Flutter apps to creating AI-powered platforms, I love pushing the boundaries of what's possible with code.
                      </p>
                    </div>
                  </div>

                  <div className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-lg p-8 hover:border-white/25 transition-all duration-300 overflow-hidden glow-on-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white text-xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Mission</h3>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        I aim to ship meaningful products at scale, especially in innovative startups where I can push boundaries and explore new possibilities. 
                        My goal is to combine creative design with powerful backend logic to build impactful applications.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Skills & Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-8"
                >
                  {/* Technical Skills with Interactive Tooltips */}
                  <SkillsSection />

                  {/* Fun Facts */}
                  <div className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-lg p-8 hover:border-white/25 transition-all duration-300 overflow-hidden glow-on-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <span className="text-2xl mr-3">⚡</span>
                        Quick Facts
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-zinc-300">
                          <span className="text-sky-400 mr-3">📍</span>
                          Based in Hyderabad, India
                        </div>
                        <div className="flex items-center text-zinc-300">
                          <span className="text-sky-400 mr-3">🎓</span>
                          Computer Science Undergraduate
                        </div>
                        <div className="flex items-center text-zinc-300">
                          <span className="text-sky-400 mr-3">💡</span>
                          Always learning new technologies
                        </div>
                        <div className="flex items-center text-zinc-300">
                          <span className="text-sky-400 mr-3">🌟</span>
                          Open to exciting opportunities
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  A collection of projects that showcase my skills in full-stack development, AI integration, and innovative problem-solving
                </p>
              </motion.div>
              <ProjectsGrid />
            </div>
          </section>

          {/* Skills Showcase */}
          <section id="skills" className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I Do</h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  From frontend to backend, from AI to deployment - I build complete solutions
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[{
                  icon: 'code',
                  title: 'Full-Stack Development',
                  items: ['Flutter with Firebase Authentication','Modern Gen Z-styled Websites','Node.js & FastAPI Backend','Python Development','Responsive UI/UX Design']
                },{
                  icon: 'robot',
                  title: 'AI Integration',
                  items: ['Mistral 7B & DeepSeek Models','Hugging Face Transformers','Llama Models on GPU','AI-powered Tools & Automation','Misinformation Detection Systems']
                },{
                  icon: 'share',
                  title: 'Platform Integrations',
                  items: ['OAuth Flows Implementation','Twitter & Instagram APIs','LinkedIn & Reddit Integration','Threads & Facebook APIs','Modular Backend Architecture']
                }].map((card, index) => (
                  <motion.div 
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-lg p-6 hover:border-white/25 transition-all duration-300 overflow-hidden glow-on-hover"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                        <span className="mr-2 text-sky-400 group-hover:text-sky-300 transition-colors duration-300">{card.icon === 'code' ? '🧩' : card.icon === 'robot' ? '🤖' : '🔗'}</span>
                        {card.title}
                      </h3>
                      <ul className="text-sm text-zinc-300 group-hover:text-zinc-200 space-y-1 list-disc pl-5 transition-colors duration-300">
                        {card.items.map(i => (<li key={i}>{i}</li>))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  My professional journey and the impact I've made
                </p>
              </motion.div>
              <Experience />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  Ready to turn your ideas into reality? Let's collaborate and create something extraordinary together.
                </p>
                <p className="mt-4 text-zinc-400">
                  Email me at{" "}
                  <a 
                    className="text-sky-400 hover:text-sky-300 transition-colors duration-200 underline" 
                    href={`mailto:${SITE.email}`}
                  >
                    {SITE.email}
                  </a>
                  {" "}or use the form below.
                </p>
              </motion.div>
              
              <div className="max-w-3xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </MotionConfig>
    </SmoothScrollWrapper>
  );
}
