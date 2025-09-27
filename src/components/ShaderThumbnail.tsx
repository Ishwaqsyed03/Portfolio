"use client";

import { useEffect, useRef, useState } from "react";
import { shaders } from "./utils/shaders";

interface ShaderThumbnailProps {
  shaderId: number;
  size?: number;
  isSelected?: boolean;
  isHovered?: boolean;
}

const vertexShaderSource = `
attribute vec2 aPosition;
varying vec2 vTextureCoord;

void main() {
  vTextureCoord = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const ShaderThumbnail = ({ 
  shaderId, 
  size = 48, 
  isSelected = false, 
  isHovered = false 
}: ShaderThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const programInfoRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const shader = shaders.find(s => s.id === shaderId);
    if (!shader) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    gl.viewport(0, 0, size, size);

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(shader.fragmentShader, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    // Set up buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    
    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const mouseLocation = gl.getUniformLocation(program, 'iMouse');

    programInfoRef.current = {
      program,
      positionLocation,
      timeLocation,
      resolutionLocation,
      mouseLocation,
      positionBuffer
    };

    // Animation loop
    let startTime = Date.now();
    
    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001;
      
      if (!programInfoRef.current) return;
      
      const { 
        program, 
        positionLocation, 
        timeLocation, 
        resolutionLocation, 
        mouseLocation,
        positionBuffer 
      } = programInfoRef.current;

      gl.useProgram(program);
      
      // Set uniforms
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, size, size);
      gl.uniform2f(mouseLocation, 0, 0); // No mouse interaction for thumbnails
      
      // Set up position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shaderId, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`
        rounded-full border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-white scale-110 shadow-lg' 
          : 'border-gray-600 hover:border-gray-400 hover:scale-105'
        }
        ${!isSelected && isHovered ? 'opacity-60' : 'opacity-100'}
      `}
      style={{ 
        boxShadow: isSelected 
          ? `0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)` 
          : 'none'
      }}
    />
  );
};