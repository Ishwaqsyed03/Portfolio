"use client";

import { useEffect, useRef, useState } from "react";
import { shaders, vertexShader } from "./utils/shaders";

interface ShaderCanvasProps {
  size?: number;
  className?: string;
  shaderId?: number;
  interactive?: boolean;
  style?: React.CSSProperties;
}

export const ShaderCanvas = ({ 
  size = 800, 
  className = "",
  shaderId = 1,
  interactive = true,
  style = {}
}: ShaderCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mousePositionRef = useRef<[number, number]>([0.5, 0.5]);
  const programInfoRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: size, height: size });

  // Get the selected shader
  const selectedShader = shaders.find(s => s.id === shaderId) || shaders[0];

  // Handle window resize for full-screen canvas
  useEffect(() => {
    const handleResize = () => {
      if (size > 1000) { // Full screen mode
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      } else {
        setCanvasSize({ width: size, height: size });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  // Track mouse position relative to the canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !interactive) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePositionRef.current = [x, y];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Use the vertex shader and selected fragment shader
    const vsSource = vertexShader;
    const fsSource = selectedShader.fragmentShader;

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    programInfoRef.current = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        iResolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        iTime: gl.getUniformLocation(shaderProgram, 'iTime'),
        iMouse: gl.getUniformLocation(shaderProgram, 'iMouse'),
      },
    };

    // Create buffers
    const buffers = initBuffers(gl);
    let startTime = Date.now();

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Render function
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      
      // Get the current mouse position from ref
      const mousePos = mousePositionRef.current;
      
      drawScene(
        gl!, 
        programInfoRef.current, 
        buffers, 
        currentTime, 
        canvas.width, 
        canvas.height, 
        mousePos
      );
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      // Clean up WebGL resources
      if (gl && shaderProgram) {
        gl.deleteProgram(shaderProgram);
      }
    };
  }, [canvasSize.width, canvasSize.height, shaderId, selectedShader.fragmentShader]);

  // Initialize shader program
  function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return null;

    // Create the shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return null;

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Check if it linked successfully
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  // Load shader
  function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Check if compilation succeeded
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Initialize buffers
  function initBuffers(gl: WebGLRenderingContext) {
    // Create a buffer for positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
       1.0,  1.0,
      -1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a buffer for texture coordinates
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    const textureCoordinates = [
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    // Create a buffer for indices
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const indices = [
      0, 1, 2,
      0, 2, 3,
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }

  // Draw the scene
  function drawScene(
    gl: WebGLRenderingContext, 
    programInfo: any, 
    buffers: any, 
    currentTime: number, 
    width: number, 
    height: number,
    mousePos: [number, number]
  ) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set shader uniforms
    gl.uniform2f(programInfo.uniformLocations.iResolution, width, height);
    gl.uniform1f(programInfo.uniformLocations.iTime, currentTime);
    gl.uniform2f(programInfo.uniformLocations.iMouse, mousePos[0], mousePos[1]);

    // Set vertex position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      2,        // 2 components per vertex
      gl.FLOAT, // the data is 32-bit floats
      false,    // don't normalize
      0,        // stride
      0         // offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    // Set texture coordinate attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      2,        // 2 components per vertex
      gl.FLOAT, // the data is 32-bit floats
      false,    // don't normalize
      0,        // stride
      0         // offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

    // Draw
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.drawElements(
      gl.TRIANGLES,
      6,                // vertex count
      gl.UNSIGNED_SHORT,// type
      0                 // offset
    );
  }

  // Handle mouse leave - reset mouse position to center when cursor leaves canvas
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (interactive) {
      mousePositionRef.current = [0.5, 0.5]; // Reset to center
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      className={`transition-transform duration-300 ${className}`} 
      style={{ 
        width: canvasSize.width, 
        height: canvasSize.height,
        transform: isHovered && interactive ? 'scale(1.02)' : 'scale(1)',
        ...style
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    />
  );
};