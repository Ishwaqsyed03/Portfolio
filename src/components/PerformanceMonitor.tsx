"use client";
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance optimizations
    if (typeof window !== 'undefined') {
      // Reduce motion for better performance on low-end devices
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }

      // Memory management for animations
      let animationFrameId: number;
      const handleScroll = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          // Debounced scroll handling for smooth performance
        });
      };

      // Optimize intersection observer for animations
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      // Observe all animatable elements
      document.querySelectorAll('[data-animate]').forEach((el) => {
        intersectionObserver.observe(el);
      });

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        intersectionObserver.disconnect();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return null;
}
