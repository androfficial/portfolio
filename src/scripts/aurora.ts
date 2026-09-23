import { isMotionPaused } from './motion-toggle';

const vertexSource = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 pointer;

float hash(vec2 point) {
  point = fract(point * vec2(123.34, 456.21));
  point += dot(point, point + 45.32);
  return fract(point.x * point.y);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  vec2 blend = local * local * (3.0 - 2.0 * local);
  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, blend.x), mix(c, d, blend.x), blend.y);
}

float fbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(1.6, 1.2, -1.2, 1.6);
  for (int octave = 0; octave < 5; octave++) {
    value += amplitude * noise(point);
    point = rotation * point;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 point = (gl_FragCoord.xy - 0.5 * resolution) / min(resolution.x, resolution.y);
  float t = time * 0.045;
  vec2 drift = (pointer - 0.5) * 0.4;

  vec2 warpA = vec2(fbm(point * 1.3 + vec2(0.0, t)), fbm(point * 1.3 + vec2(5.2, -t)));
  vec2 warpB = vec2(
    fbm(point * 1.7 + 2.1 * warpA + vec2(1.7, 9.2) + t),
    fbm(point * 1.7 + 2.1 * warpA + vec2(8.3, 2.8) - t)
  );
  float field = fbm(point * 1.1 + 1.9 * warpB + drift);

  vec3 navy = vec3(0.039, 0.071, 0.141);
  vec3 deep = vec3(0.075, 0.125, 0.235);
  vec3 teal = vec3(0.227, 0.839, 0.765);
  vec3 coral = vec3(1.0, 0.478, 0.361);

  vec3 color = mix(navy, deep, smoothstep(0.2, 0.85, field));
  float tealGlow = smoothstep(0.5, 0.95, field) * (1.0 - smoothstep(0.15, 1.35, length(point - vec2(-0.55, 0.3) - drift)));
  float coralGlow = smoothstep(0.45, 0.9, warpB.y) * (1.0 - smoothstep(0.1, 1.25, length(point - vec2(0.7, -0.15) + drift * 0.6)));
  color += teal * tealGlow * 0.6;
  color += coral * coralGlow * 0.36;
  color = mix(navy, color, smoothstep(0.0, 0.45, uv.y));
  color += (hash(gl_FragCoord.xy) - 0.5) / 160.0;

  gl_FragColor = vec4(color, 1.0);
}
`;

const renderScale = 0.5;
const frameInterval = 1000 / 30;
const restingTime = 18;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function linkProgram(gl: WebGLRenderingContext): Promise<WebGLProgram | null> {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return Promise.resolve(null);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  const parallelCompile = gl.getExtension('KHR_parallel_shader_compile');
  return new Promise((resolve) => {
    const settle = () => {
      if (parallelCompile && !gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR)) {
        requestAnimationFrame(settle);
        return;
      }
      resolve(gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null);
    };
    settle();
  });
}

export async function startAurora(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return;

  const program = await linkProgram(gl);
  if (!program) return;

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolutionUniform = gl.getUniformLocation(program, 'resolution');
  const timeUniform = gl.getUniformLocation(program, 'time');
  const pointerUniform = gl.getUniformLocation(program, 'pointer');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  let clock = restingTime;
  let frame = 0;
  let lastFrameAt = 0;
  let onScreen = true;
  let contextLost = false;

  const draw = (seconds: number) => {
    if (contextLost) return;
    gl.uniform1f(timeUniform, seconds);
    gl.uniform2f(pointerUniform, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.dataset.ready = 'true';
  };

  const resize = () => {
    const width = Math.max(1, Math.round(canvas.clientWidth * renderScale));
    const height = Math.max(1, Math.round(canvas.clientHeight * renderScale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(resolutionUniform, width, height);
  };

  const step = (now: number) => {
    frame = requestAnimationFrame(step);
    if (lastFrameAt && now - lastFrameAt < frameInterval) return;
    clock += lastFrameAt ? Math.min(now - lastFrameAt, 100) / 1000 : 0;
    lastFrameAt = now;
    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;
    draw(clock);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrameAt = 0;
  };

  const play = () => {
    pause();
    if (reducedMotion.matches || isMotionPaused()) {
      draw(reducedMotion.matches ? restingTime : clock);
      return;
    }
    if (onScreen && !document.hidden) frame = requestAnimationFrame(step);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!finePointer.matches) return;
    pointer.targetX = event.clientX / window.innerWidth;
    pointer.targetY = 1 - event.clientY / window.innerHeight;
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    pause();
    canvas.dataset.ready = 'false';
  };

  const visibilityObserver = new IntersectionObserver((entries) => {
    onScreen = entries.some((entry) => entry.isIntersecting);
    play();
  });

  const sizeObserver = new ResizeObserver(() => {
    resize();
    if (!frame) draw(clock);
  });

  resize();
  play();
  visibilityObserver.observe(canvas);
  sizeObserver.observe(canvas);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', play);
  document.addEventListener('motion:toggle', play);
  reducedMotion.addEventListener('change', play);
  canvas.addEventListener('webglcontextlost', onContextLost);
}
