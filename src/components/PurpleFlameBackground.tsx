"use client";
import React from "react";

export default function PurpleFlameBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ top: 0, left: 0 }}
    >
      <div className="mesh-bg-global" />
      <style jsx>{`
        .mesh-bg-global {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          z-index: -1;
        }
        .mesh-bg-global::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 20%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          pointer-events: none;
          background: radial-gradient(circle, #a78bfa 0%, #7c3aed 40%, transparent 80%);
          opacity: 0.55;
          filter: blur(80px);
          z-index: -1;
          animation: bulbPulse 4s ease-in-out infinite;
        }
        @keyframes bulbPulse {
          0% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.85;
          }
          100% {
            opacity: 0.55;
          }
        }
      `}</style>
    </div>
  );
}
