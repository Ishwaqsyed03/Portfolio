"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Points, PointMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// Optimized floating particles with reduced count
function FloatingParticles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 400; // Reduced from 800 for better performance
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80; // Reduced range
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Optimized gentle rotation
      mesh.current.rotation.x += delta * 0.05;
      mesh.current.rotation.y += delta * 0.025;
      
      // Reduced animation calculations for better performance
      const time = state.clock.elapsedTime;
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i += 4) { // Process every 4th particle
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.005;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.2} // Slightly smaller
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// Enhanced animated stars with color shifting
function AnimatedStars() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      // Subtle rotation and pulsing
      group.current.rotation.x += delta * 0.02;
      group.current.rotation.y += delta * 0.01;
      group.current.rotation.z += delta * 0.005;
    }
  });
  
  return (
    <group ref={group}>
      <Stars 
        radius={120} 
        depth={80} 
        count={8000} 
        factor={6} 
        saturation={0.3} 
        fade 
        speed={0.5}
      />
    </group>
  );
}

function StaticStars() {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    // Static: no rotation when prefers-reduced-motion or global static mode
    // Intentionally empty to keep background still
  });
  return (
    <group ref={group}>
      <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={0} />
    </group>
  );
}

export default function StarsCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 gpu-accelerated">
      <Canvas 
        gl={{ 
          antialias: false, // Disable for better performance
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }} 
        camera={{ fov: 75, position: [0, 0, 5] }}
        dpr={[1, 1.5]} // Limit DPR for performance
        performance={{ min: 0.5 }} // Auto-adjust quality
      >
        <color attach="background" args={["#000008"]} />
        <fog attach="fog" args={["#000008", 50, 200]} />
        
        <Suspense fallback={null}>
          <AnimatedStars />
          <FloatingParticles />
        </Suspense>
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.3} color="#4f46e5" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#7c3aed" />
      </Canvas>
      
      {/* Premium gradient overlays with hardware acceleration */}
      <div className="absolute inset-0 bg-[radial-gradient(1400px_900px_at_30%_-20%,rgba(56,189,248,0.12),transparent_70%)] animate-pulse gpu-accelerated" style={{animationDuration: '4s'}} />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_80%_120%,rgba(217,70,239,0.10),transparent_70%)] animate-pulse gpu-accelerated" style={{animationDuration: '6s', animationDelay: '2s'}} />
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)] animate-pulse gpu-accelerated" style={{animationDuration: '8s', animationDelay: '1s'}} />
      
      {/* Subtle animated vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
