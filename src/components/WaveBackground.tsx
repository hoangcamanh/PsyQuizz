'use client';

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER_SRC = `
precision highp float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;
uniform vec2 parallaxOffset;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

// Wave calculation
float calcWave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_movement = time * 0.12;
  float amp = sin(offset + time * 0.22) * 0.28 + 0.04;
  float y = sin(uv.x + offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  // Silky ribbon line intensity
  return 0.016 / (max(abs(m), 0.003) + 0.006);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  baseUv += parallaxOffset;

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  vec3 col = vec3(0.0);

  // 1. Bottom Wave Stream (Vibrant Violet to Pink)
  for (int i = 0; i < 7; ++i) {
    float fi = float(i);
    float t = fi / 6.0;
    vec3 lineCol = mix(vec3(0.45, 0.22, 0.95), vec3(0.92, 0.25, 0.72), t);
    
    float angle = -0.85 * log(length(baseUv) + 1.0);
    vec2 ruv = baseUv * rotate(angle);
    float w = calcWave(
      ruv + vec2(0.05 * fi + 2.0, -0.65),
      1.5 + 0.18 * fi,
      baseUv,
      mouseUv,
      interactive
    );
    col += lineCol * w * 0.38;
  }

  // 2. Middle Wave Stream (Hot Pink to Cyan/Blue)
  for (int i = 0; i < 7; ++i) {
    float fi = float(i);
    float t = fi / 6.0;
    vec3 lineCol = mix(vec3(0.95, 0.18, 0.65), vec3(0.20, 0.55, 0.98), t);
    
    float angle = 0.25 * log(length(baseUv) + 1.0);
    vec2 ruv = baseUv * rotate(angle);
    float w = calcWave(
      ruv + vec2(0.045 * fi + 5.0, 0.05),
      2.0 + 0.14 * fi,
      baseUv,
      mouseUv,
      interactive
    );
    col += lineCol * w * 0.45;
  }

  // 3. Top Wave Stream (Electric Blue to Soft Purple)
  for (int i = 0; i < 7; ++i) {
    float fi = float(i);
    float t = fi / 6.0;
    vec3 lineCol = mix(vec3(0.15, 0.72, 0.95), vec3(0.72, 0.35, 0.95), t);
    
    float angle = -0.35 * log(length(baseUv) + 1.0);
    vec2 ruv = baseUv * rotate(angle);
    ruv.x *= -1.0;
    float w = calcWave(
      ruv + vec2(0.04 * fi + 8.0, 0.55),
      1.0 + 0.16 * fi,
      baseUv,
      mouseUv,
      interactive
    );
    col += lineCol * w * 0.32;
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { antialias: true, alpha: true }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vert = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const frag = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    // Full screen quad geometry
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    const verts = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const u_iTime = gl.getUniformLocation(prog, 'iTime');
    const u_iResolution = gl.getUniformLocation(prog, 'iResolution');
    const u_animationSpeed = gl.getUniformLocation(prog, 'animationSpeed');
    const u_iMouse = gl.getUniformLocation(prog, 'iMouse');
    const u_interactive = gl.getUniformLocation(prog, 'interactive');
    const u_bendRadius = gl.getUniformLocation(prog, 'bendRadius');
    const u_bendStrength = gl.getUniformLocation(prog, 'bendStrength');
    const u_bendInfluence = gl.getUniformLocation(prog, 'bendInfluence');
    const u_parallaxOffset = gl.getUniformLocation(prog, 'parallaxOffset');

    gl.uniform1f(u_animationSpeed, 1.0);
    gl.uniform1i(u_interactive, 1);
    gl.uniform1f(u_bendRadius, 4.5);
    gl.uniform1f(u_bendStrength, -0.45);

    let animationFrameId: number;
    const startTime = performance.now();

    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let bendInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * (canvas.width / (rect.width || 1));
      targetMouseY = (e.clientY - rect.top) * (canvas.height / (rect.height || 1));
      bendInfluence = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(rect.width || window.innerWidth, 320);
      const height = Math.max(rect.height || window.innerHeight, 320);
      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;
      bendInfluence *= 0.985;

      const normX = (currentMouseX / (canvas.width || 1) - 0.5) * 0.12;
      const normY = (currentMouseY / (canvas.height || 1) - 0.5) * 0.12;

      gl.useProgram(prog);
      gl.uniform3f(u_iResolution, canvas.width, canvas.height, 1.0);
      gl.uniform1f(u_iTime, elapsed);
      gl.uniform2f(u_iMouse, currentMouseX, currentMouseY);
      gl.uniform1f(u_bendInfluence, bendInfluence);
      gl.uniform2f(u_parallaxOffset, normX, normY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(posBuffer);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ mixBlendMode: 'screen', opacity: 0.95 }}
      />
    </div>
  );
}
