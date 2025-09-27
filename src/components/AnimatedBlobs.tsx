import React from "react";

export default function AnimatedBlobs() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-20 w-full h-full overflow-hidden pointer-events-none"
      style={{ top: 0, left: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(-30)">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="blob3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(15)">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="50 30" dur="8s" repeatCount="indefinite" />
          <ellipse cx="400" cy="250" rx="320" ry="180" fill="url(#blob1)">
            <animate attributeName="rx" values="320;340;320" dur="7s" repeatCount="indefinite" />
            <animate attributeName="ry" values="180;200;180" dur="7s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="900" cy="350" rx="260" ry="140" fill="url(#blob2)">
            <animate attributeName="rx" values="260;280;260" dur="6s" repeatCount="indefinite" />
            <animate attributeName="ry" values="140;160;140" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="700" cy="120" rx="180" ry="100" fill="url(#blob3)">
            <animate attributeName="rx" values="180;200;180" dur="9s" repeatCount="indefinite" />
            <animate attributeName="ry" values="100;120;100" dur="9s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
}
