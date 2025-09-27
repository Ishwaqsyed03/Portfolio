"use client";
import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  connections: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const isMouseOverRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: Particle[] = [];
    // Reduced particle count for better performance and subtlety
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    const baseSpeed = 0.2; // Slower movement

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * baseSpeed,
        vy: (Math.random() - 0.5) * baseSpeed,
        size: Math.random() * 1.5 + 0.5, // Smaller particles
        opacity: Math.random() * 0.4 + 0.1, // Lower opacity
        connections: 0
      });
    }

    particlesRef.current = particles;
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const maxDistance = 100; // Shorter connection distance
    const mouseInfluenceDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].connections = 0;
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          let opacity = (1 - distance / maxDistance) * 0.15; // Much lower base opacity
          
          // Enhanced opacity for mouse proximity
          if (isMouseOverRef.current) {
            const mouseDistanceI = Math.sqrt(
              Math.pow(particles[i].x - mouseRef.current.x, 2) + 
              Math.pow(particles[i].y - mouseRef.current.y, 2)
            );
            const mouseDistanceJ = Math.sqrt(
              Math.pow(particles[j].x - mouseRef.current.x, 2) + 
              Math.pow(particles[j].y - mouseRef.current.y, 2)
            );
            
            if (mouseDistanceI < mouseInfluenceDistance || mouseDistanceJ < mouseInfluenceDistance) {
              const influence = Math.min(
                1 - mouseDistanceI / mouseInfluenceDistance,
                1 - mouseDistanceJ / mouseInfluenceDistance
              );
              opacity += influence * 0.2; // Reduced mouse influence
            }
          }

          // Draw connection line
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 0.3; // Thinner lines
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          
          particles[i].connections++;
          particles[j].connections++;
        }
      }
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const mouseInfluenceDistance = 80;
    
    particles.forEach(particle => {
      let finalSize = particle.size;
      let finalOpacity = particle.opacity;
      
      // Mouse interaction - particles grow and brighten near cursor
      if (isMouseOverRef.current) {
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) + 
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        
        if (mouseDistance < mouseInfluenceDistance) {
          const influence = 1 - mouseDistance / mouseInfluenceDistance;
          finalSize += influence * 1.5; // Less dramatic size change
          finalOpacity += influence * 0.3;
        }
      }

      // Connection-based styling
      const connectionBonus = Math.min(particle.connections * 0.05, 0.15); // Reduced connection bonus
      finalOpacity += connectionBonus;
      
      // Draw particle with subtle glow effect
      ctx.shadowBlur = 6; // Reduced glow
      ctx.shadowColor = `rgba(139, 92, 246, ${finalOpacity * 0.5})`;
      
      // Main particle
      ctx.fillStyle = `rgba(139, 92, 246, ${Math.min(finalOpacity, 0.6)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Central bright dot (smaller)
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(199, 168, 255, ${Math.min(finalOpacity * 0.4, 0.4)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(finalSize * 0.4, 0.3), 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const updateParticles = useCallback((particles: Particle[], canvas: HTMLCanvasElement) => {
    const mouseAttraction = 0.008; // Reduced attraction
    const mouseRepulsion = 15; // Reduced repulsion
    
    particles.forEach(particle => {
      // Standard movement
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Mouse interaction
      if (isMouseOverRef.current) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 60) { // Reduced repulsion zone
          // Repulsion for very close particles
          particle.vx -= (dx / distance) * mouseRepulsion / distance;
          particle.vy -= (dy / distance) * mouseRepulsion / distance;
        } else if (distance < 150) { // Reduced attraction zone
          // Gentle attraction for medium distance
          particle.vx += dx * mouseAttraction / distance;
          particle.vy += dy * mouseAttraction / distance;
        }
      }

      // Boundary bouncing with edge buffer
      const buffer = 20; // Reduced buffer
      if (particle.x < -buffer || particle.x > canvas.width + buffer) {
        particle.vx *= -0.9;
        particle.x = Math.max(-buffer, Math.min(canvas.width + buffer, particle.x));
      }
      if (particle.y < -buffer || particle.y > canvas.height + buffer) {
        particle.vy *= -0.9;
        particle.y = Math.max(-buffer, Math.min(canvas.height + buffer, particle.y));
      }

      // Velocity damping to prevent infinite acceleration
      particle.vx *= 0.995; // More damping
      particle.vy *= 0.995;
      
      // Speed limiting
      const maxSpeed = 1; // Reduced max speed
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed;
        particle.vy = (particle.vy / speed) * maxSpeed;
      }
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with black background
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    
    // Update particle positions
    updateParticles(particles, canvas);
    
    // Draw connections first (behind particles)
    drawConnections(ctx, particles);
    
    // Draw particles on top
    drawParticles(ctx, particles);

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawConnections, drawParticles]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    isMouseOverRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isMouseOverRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup
    resizeCanvas();
    initializeParticles();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animate();

    return () => {
      // Cleanup
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, initializeParticles, animate, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{
        background: '#000000',
        zIndex: -1
      }}
    />
  );
}
