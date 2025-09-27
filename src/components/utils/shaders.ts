// Collection of shader programs for the portfolio

// Shader 1: Flowing Waves - Portfolio themed
export const flowingWavesShader = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
varying vec2 vTextureCoord;

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);

  for(float i = 1.0; i < 10.0; i += 1.0){
    uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime);
    uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
  }
  
  // Portfolio theme: purple to black gradient
  vec3 color1 = vec3(0.5, 0.2, 0.8); // Purple
  vec3 color2 = vec3(0.0, 0.0, 0.0); // Black
  
  // Create a smooth gradient between purple and black
  float t = sin(iTime - uv.y - uv.x) * 0.5 + 0.5;
  vec3 finalColor = mix(color1, color2, t);
  
  // Add mouse interaction
  if(iMouse.x > 0.0 || iMouse.y > 0.0) {
    vec2 mousePos = (iMouse.xy * 2.0 - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
    float mouseDist = length(uv - mousePos);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
    finalColor += vec3(0.8, 0.4, 1.0) * mouseInfluence * 0.4; // Purple-white glow
  }
  
  gl_FragColor = vec4(finalColor / abs(sin(iTime - uv.y - uv.x)), 1.0);
}
`;

// Shader 2: Ether - Portfolio themed
export const etherShader = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
varying vec2 vTextureCoord;

#define t iTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
    p.xz*= m(t*0.4);p.xy*= m(t*0.3);
    vec3 q = p*2.+t;
    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void main() {
    vec2 p = gl_FragCoord.xy/min(iResolution.x, iResolution.y) - vec2(.9, .5);
    p.x += 0.4;
    
    vec3 cl = vec3(0.);
    float d = 2.5;
    
    for(int i=0; i<=5; i++) {
        vec3 p3d = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p3d);
        float f = clamp((rz - map(p3d+.1))*0.5, -.1, 1.);
        
        // Portfolio color scheme with enhanced brightness
        vec3 baseColor = vec3(1.0, 0.5, 0.15) + vec3(3.5, 2.5, 6.0)*f;
        
        cl = cl*baseColor + smoothstep(2.5, .0, rz)*.8*baseColor;
        d += min(rz, 1.);
    }
    
    // Add mouse interaction
    if(iMouse.x > 0.0 || iMouse.y > 0.0) {
        vec2 mousePos = (iMouse.xy * 2.0 - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
        float mouseDist = length(p - mousePos * 0.5);
        float mouseInfluence = smoothstep(0.6, 0.0, mouseDist);
        cl += vec3(1.2, 0.6, 0.3) * mouseInfluence * 0.4;
    }
    
    gl_FragColor = vec4(cl * 1.2, 1.0);
}
`;

// Common vertex shader for all shaders
export const vertexShader = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
void main() {
  gl_Position = aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

// Shader type definition
export interface Shader {
  id: number;
  name: string;
  fragmentShader: string;
  color: string;
}

// Shader collection for easy access
export const shaders: Shader[] = [
  {
    id: 1,
    name: "Flowing Waves",
    fragmentShader: flowingWavesShader,
    color: "#8b5cf6" // Purple to match new theme
  },
  {
    id: 2,
    name: "Ether",
    fragmentShader: etherShader,
    color: "#8b5cf6" // Purple
  }
];