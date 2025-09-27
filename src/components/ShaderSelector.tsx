"use client";

import { useState } from "react";
import { shaders, type Shader } from "./utils/shaders";
import { ShaderThumbnail } from "./ShaderThumbnail";

interface ShaderSelectorProps {
  selectedShader: number;
  onSelectShader: (id: number) => void;
  className?: string;
}

export const ShaderSelector = ({ selectedShader, onSelectShader, className = "" }: ShaderSelectorProps) => {
  const [hoveredShader, setHoveredShader] = useState<number | null>(null);

  return (
    <div className={`flex gap-3 ${className}`}>
      {shaders.map((shader) => (
        <div
          key={shader.id}
          className="relative group"
          onMouseEnter={() => setHoveredShader(shader.id)}
          onMouseLeave={() => setHoveredShader(null)}
          onClick={() => onSelectShader(shader.id)}
          title={shader.name}
        >
          <ShaderThumbnail
            shaderId={shader.id}
            size={48}
            isSelected={selectedShader === shader.id}
            isHovered={hoveredShader !== null && hoveredShader !== shader.id}
          />
        </div>
      ))}
    </div>
  );
};