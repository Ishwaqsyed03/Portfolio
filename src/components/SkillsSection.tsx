"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  description: string;
}

const skillsData: Skill[] = [
  { name: "React/Next.js", level: 95, description: "Advanced React patterns, SSR, and modern web development" },
  { name: "Python/FastAPI", level: 90, description: "Backend development, APIs, and data processing" },
  { name: "Flutter/Firebase", level: 85, description: "Cross-platform mobile development and cloud integration" },
  { name: "AI/ML Integration", level: 80, description: "Machine learning models, AI APIs, and intelligent features" },
  { name: "Node.js/Express", level: 88, description: "Server-side JavaScript, REST APIs, and microservices" },
  { name: "Cloud Solutions", level: 82, description: "AWS, Azure, deployment, and scalable infrastructure" }
];

interface ChartTooltipProps {
  skill: Skill;
  position: { x: number; y: number };
  isVisible: boolean;
}

function ChartTooltip({ skill, position, isVisible }: ChartTooltipProps) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y - 80}px`,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 shadow-xl">
          <div className="text-white font-semibold text-sm">{skill.name}</div>
          <div className="text-sky-400 text-lg font-bold">{skill.level}%</div>
          <div className="text-zinc-300 text-xs max-w-48 mt-1">{skill.description}</div>
          {/* Tooltip Arrow */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/20 rotate-45"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (skill: Skill, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setHoveredSkill(skill);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-lg p-8 hover:border-white/25 transition-all duration-300 overflow-hidden glow-on-hover"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        
        <div className="relative z-10">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl font-semibold text-white mb-6 flex items-center"
          >
            <span className="text-2xl mr-3">💻</span>
            My Skillset
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-sky-400 font-semibold">{skill.level}%</span>
                </div>
                
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="w-full bg-zinc-700/50 rounded-full h-3 overflow-hidden">
                    {/* Animated Progress Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.6 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="relative h-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 rounded-full cursor-pointer hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300 glow-on-hover"
                      onMouseEnter={(e) => handleMouseEnter(skill, e)}
                      onMouseLeave={handleMouseLeave}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)"
                      }}
                    >
                      {/* Progress Bar Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 animate-pulse" />
                      
                      {/* Skill Level Indicator Dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.8 + index * 0.1 }}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tooltip Component */}
      <ChartTooltip
        skill={hoveredSkill!}
        position={tooltipPosition}
        isVisible={!!hoveredSkill}
      />
    </>
  );
}