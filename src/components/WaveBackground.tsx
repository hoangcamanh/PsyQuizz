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

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);
  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;
  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  return baseColor;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);
  vec3 b = background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < 7; ++i) {
      float fi = float(i);
      vec3 lineCol = getLineColor(fi / 6.0, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 7; ++i) {
      float fi = float(i);
      vec3 lineCol = getLineColor(fi / 6.0, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < 7; ++i) {
      float fi = float(i);
      vec3 lineCol = getLineColor(fi / 6.0, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
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
      canvas.getContext('webgl', { antialias: true, alpha: false }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS background');
      return;
    }

    // Compile helper
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

    // Quad geometry: 2 triangles covering [-1, 1]
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
    const u_enableTop = gl.getUniformLocation(prog, 'enableTop');
    const u_enableMiddle = gl.getUniformLocation(prog, 'enableMiddle');
    const u_enableBottom = gl.getUniformLocation(prog, 'enableBottom');
    const u_topLineCount = gl.getUniformLocation(prog, 'topLineCount');
    const u_middleLineCount = gl.getUniformLocation(prog, 'middleLineCount');
    const u_bottomLineCount = gl.getUniformLocation(prog, 'bottomLineCount');
    const u_topLineDistance = gl.getUniformLocation(prog, 'topLineDistance');
    const u_middleLineDistance = gl.getUniformLocation(prog, 'middleLineDistance');
    const u_bottomLineDistance = gl.getUniformLocation(prog, 'bottomLineDistance');
    const u_topWavePosition = gl.getUniformLocation(prog, 'topWavePosition');
    const u_middleWavePosition = gl.getUniformLocation(prog, 'middleWavePosition');
    const u_bottomWavePosition = gl.getUniformLocation(prog, 'bottomWavePosition');
    const u_iMouse = gl.getUniformLocation(prog, 'iMouse');
    const u_interactive = gl.getUniformLocation(prog, 'interactive');
    const u_bendRadius = gl.getUniformLocation(prog, 'bendRadius');
    const u_bendStrength = gl.getUniformLocation(prog, 'bendStrength');
    const u_bendInfluence = gl.getUniformLocation(prog, 'bendInfluence');
    const u_parallax = gl.getUniformLocation(prog, 'parallax');
    const u_parallaxStrength = gl.getUniformLocation(prog, 'parallaxStrength');
    const u_parallaxOffset = gl.getUniformLocation(prog, 'parallaxOffset');

    // Static uniform values
    gl.uniform1f(u_animationSpeed, 1.0);
    gl.uniform1i(u_enableTop, 1);
    gl.uniform1i(u_enableMiddle, 1);
    gl.uniform1i(u_enableBottom, 1);
    gl.uniform1i(u_topLineCount, 7);
    gl.uniform1i(u_middleLineCount, 7);
    gl.uniform1i(u_bottomLineCount, 7);
    gl.uniform1f(u_topLineDistance, 0.04);
    gl.uniform1f(u_middleLineDistance, 0.05);
    gl.uniform1f(u_bottomLineDistance, 0.06);
    gl.uniform3f(u_topWavePosition, 10.0, 0.5, -0.4);
    gl.uniform3f(u_middleWavePosition, 5.0, 0.0, 0.2);
    gl.uniform3f(u_bottomWavePosition, 2.0, -0.7, -1.0);
    gl.uniform1i(u_interactive, 1);
    gl.uniform1f(u_bendRadius, 5.0);
    gl.uniform1f(u_bendStrength, -0.5);
    gl.uniform1i(u_parallax, 1);
    gl.uniform1f(u_parallaxStrength, 0.2);

    let animationFrameId: number;
    const startTime = performance.now();

    // Mouse tracking & damping
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let bendInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      targetMouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      bendInfluence = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform3f(u_iResolution, displayWidth, displayHeight, 1.0);
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
      bendInfluence *= 0.98; // gentle fade when mouse stops

      // Parallax offset
      const normX = (currentMouseX / (canvas.width || 1) - 0.5) * 0.15;
      const normY = (currentMouseY / (canvas.height || 1) - 0.5) * 0.15;

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
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}

