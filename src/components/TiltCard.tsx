"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useCallback } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: Props) {
  const prefersReducedMotion = useReducedMotion();

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.style.setProperty("--x", `-9999px`);
    el.style.setProperty("--y", `-9999px`);
  }, []);

  return (
    <motion.div
      onMouseMove={prefersReducedMotion ? undefined : onMove}
      onMouseLeave={prefersReducedMotion ? undefined : onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -3 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      className={`group relative rounded-xl border border-white/20 bg-white/10 optimized-blur p-5 overflow-hidden hover:border-white/30 smooth-transition gpu-accelerated ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: prefersReducedMotion ? undefined : "perspective(700px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0))",
        willChange: "transform"
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition bg-[radial-gradient(600px_circle_at_var(--x,50%)_var(--y,50%),rgba(56,189,248,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 smooth-transition" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
