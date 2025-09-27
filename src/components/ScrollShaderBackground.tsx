"use client";

import { useState, useEffect, useMemo } from "react";
import { ShaderCanvas } from "./ShaderCanvas";

interface ScrollShaderBackgroundProps {
  selectedShader: number;
}

export const ScrollShaderBackground = ({ selectedShader }: ScrollShaderBackgroundProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const canvasSize = useMemo(() => 
    Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / Math.max(docHeight, 1), 1);
      setScrollProgress(progress);
      
      // Determine current section based on scroll
      const sections = 5; // hero, projects, skills, experience, contact
      const sectionProgress = progress * sections;
      setCurrentSection(Math.floor(sectionProgress));
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate shader parameters based on scroll
  const getShaderIntensity = () => {
    return 0.25 + (Math.sin(scrollProgress * Math.PI * 2) * 0.05);
  };

  const shaderIntensity = getShaderIntensity();
  const scaleTransform = 1.1 + scrollProgress * 0.1;

  return (
    <>
      {/* Main background shader with blur effect */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 backdrop-blur-[0.5px]">
          <ShaderCanvas 
            size={canvasSize}
            shaderId={selectedShader}
            interactive={false}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000`}
            style={{
              opacity: shaderIntensity,
              transform: `scale(${scaleTransform})`,
              filter: 'brightness(1.2) contrast(1.1)',
            }}
          />
        </div>
      </div>
      
      {/* Subtle section-based intensity variations only */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient overlay for subtle section differentiation */}
        <div 
          className="absolute inset-0 transition-all duration-2000 backdrop-blur-[0.5px]"
          style={{
            background: currentSection === 1 ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 60%)' :
                       currentSection === 2 ? 'radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, transparent 60%)' :
                       currentSection === 3 ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)' :
                       'transparent',
          }}
        />
      </div>
      
      {/* Scroll-responsive gradient overlays - Reduced opacity */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Top gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent transition-opacity duration-500"
          style={{
            opacity: scrollProgress > 0.1 ? 1 : 0,
          }}
        />
        
        {/* Bottom gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500"
          style={{
            opacity: scrollProgress < 0.9 ? 1 : 0,
          }}
        />
      </div>
    </>
  );
};