/**
 * Lightfall 极光背景 — vanilla JS port
 * 基于 CSS 交付2.txt 中的 Lightfall React 组件
 * 使用 OGL 和自定义 GLSL shader 创建极光光幕效果
 */
(function() {
  'use strict';

  if (typeof OGL === 'undefined') {
    console.warn('Lightfall: OGL library not loaded. Skipping background.');
    return;
  }

  var Renderer = OGL.Renderer,
      Program  = OGL.Program,
      Mesh     = OGL.Mesh,
      Triangle = OGL.Triangle;

  // ═══════════════════════════════════════════
  //  Utilities (from CSS 交付2.txt)
  // ═══════════════════════════════════════════

  var MAX_COLORS = 8;

  function hexToRGB(hex) {
    var c = hex.replace('#', '').padEnd(6, '0');
    var r = parseInt(c.slice(0, 2), 16) / 255;
    var g = parseInt(c.slice(2, 4), 16) / 255;
    var b = parseInt(c.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  function prepColors(input) {
    var base = (input && input.length ? input : ['#A6C8FF', '#5227FF', '#FF9FFC']).slice(0, MAX_COLORS);
    var count = base.length;
    var arr = [];
    for (var i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
    var avg = [0, 0, 0];
    for (var i = 0; i < count; i++) {
      avg[0] += arr[i][0];
      avg[1] += arr[i][1];
      avg[2] += arr[i][2];
    }
    avg[0] /= count;
    avg[1] /= count;
    avg[2] /= count;
    return { arr: arr, count: count, avg: avg };
  }

  // ═══════════════════════════════════════════
  //  GLSL Shaders (from CSS 交付2.txt)
  // ═══════════════════════════════════════════

  var vertex = /* glsl */'\n\
attribute vec2 position;\n\
attribute vec2 uv;\n\
varying vec2 vUv;\n\
void main() {\n\
  vUv = uv;\n\
  gl_Position = vec4(position, 0.0, 1.0);\n\
}\n\
';

  var fragment = /* glsl */'\n\
precision highp float;\n\
\n\
uniform vec3  iResolution;\n\
uniform vec2  iMouse;\n\
uniform float iTime;\n\
\n\
uniform vec3  uColor0;\n\
uniform vec3  uColor1;\n\
uniform vec3  uColor2;\n\
uniform vec3  uColor3;\n\
uniform vec3  uColor4;\n\
uniform vec3  uColor5;\n\
uniform vec3  uColor6;\n\
uniform vec3  uColor7;\n\
uniform int   uColorCount;\n\
\n\
uniform vec3  uBgColor;\n\
uniform vec3  uMouseColor;\n\
uniform float uSpeed;\n\
uniform int   uStreakCount;\n\
uniform float uStreakWidth;\n\
uniform float uStreakLength;\n\
uniform float uGlow;\n\
uniform float uDensity;\n\
uniform float uTwinkle;\n\
uniform float uZoom;\n\
uniform float uBgGlow;\n\
uniform float uOpacity;\n\
uniform float uMouseEnabled;\n\
uniform float uMouseStrength;\n\
uniform float uMouseRadius;\n\
\n\
varying vec2 vUv;\n\
\n\
vec3 palette(float h) {\n\
  int count = uColorCount;\n\
  if (count < 1) count = 1;\n\
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));\n\
  if (idx <= 0) return uColor0;\n\
  if (idx == 1) return uColor1;\n\
  if (idx == 2) return uColor2;\n\
  if (idx == 3) return uColor3;\n\
  if (idx == 4) return uColor4;\n\
  if (idx == 5) return uColor5;\n\
  if (idx == 6) return uColor6;\n\
  return uColor7;\n\
}\n\
\n\
vec3 tanhv(vec3 x) {\n\
  vec3 e = exp(-2.0 * x);\n\
  return (1.0 - e) / (1.0 + e);\n\
}\n\
\n\
vec2 sceneC(vec2 frag, vec2 r) {\n\
  vec2 P = (frag + frag - r) / r.x;\n\
  float z = 0.0;\n\
  float d = 1e3;\n\
  vec4 O = vec4(0.0);\n\
  for (int k = 0; k < 39; k++) {\n\
    if (d <= 1e-4) break;\n\
    O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;\n\
    d = 1.0 - sqrt(length(O * O));\n\
    z += d;\n\
  }\n\
  return vec2(O.x, atan(O.z, O.y));\n\
}\n\
\n\
void mainImage(out vec4 o, vec2 C) {\n\
  vec2 r = iResolution.xy;\n\
  vec2 uv0 = (C + C - r) / r.x;\n\
  float T = 0.1 * iTime * uSpeed + 9.0;\n\
  float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));\n\
  vec2 Y = vec2(5e-3, 6.28318530718 / angRings);\n\
\n\
  vec2 c0 = sceneC(C, r);\n\
  vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);\n\
  vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);\n\
  vec2 dCx = cdx - c0;\n\
  vec2 dCy = cdy - c0;\n\
  dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);\n\
  dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);\n\
  vec2 fw = abs(dCx) + abs(dCy);\n\
  C = c0;\n\
\n\
  vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);\n\
  vec4 O = vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);\n\
\n\
  float mGlow = 0.0;\n\
  if (uMouseEnabled > 0.5) {\n\
    vec2 mN = (iMouse + iMouse - r) / r.x;\n\
    float md = length(uv0 - mN);\n\
    mGlow = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;\n\
    O.rgb += uMouseColor * mGlow * 0.25;\n\
  }\n\
\n\
  float zr = 5e-4 * uStreakWidth;\n\
  vec2 rr = vec2(max(length(fw), 1e-5));\n\
  float tail = 19.0 / max(uStreakLength, 0.05);\n\
\n\
  for (int m = 0; m < 16; m++) {\n\
    if (m >= uStreakCount) break;\n\
    float jf = float(m) + 1.0;\n\
    float ic = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));\n\
    vec2 Pp = C - (T + T * ic) * vec2(0.0, 1.0);\n\
    Pp -= floor(Pp / Y + 0.5) * Y;\n\
    float h = fract(8663.0 * ic);\n\
    vec3 col = palette(h);\n\
    float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);\n\
    weight *= (1.0 + mGlow * 2.0);\n\
    vec2 inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;\n\
    vec2 sm = vec2(1.0) - smoothstep(-rr, rr, inner);\n\
    O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;\n\
    C.x += Y.x / 8.0;\n\
  }\n\
\n\
  vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));\n\
  o = vec4(colr, uOpacity);\n\
}\n\
\n\
void main() {\n\
  vec4 color;\n\
  mainImage(color, vUv * iResolution.xy);\n\
  gl_FragColor = color;\n\
}\n\
';

  // ═══════════════════════════════════════════
  //  Configuration
  // ═══════════════════════════════════════════

  var CONFIG = {
    // Colors: matching the site's violet theme, with blue for depth
    colors: ['#A6C8FF', '#a78bfa', '#FF9FFC'],
    backgroundColor: '#0D0B2E',  // deep indigo (lighter than #020617)
    speed: 0.45,
    streakCount: 3,
    streakWidth: 1.0,
    streakLength: 1.2,
    glow: 1.3,
    density: 0.65,
    twinkle: 1.0,
    zoom: 3.0,
    backgroundGlow: 0.7,
    opacity: 0.85,
    mouseInteraction: true,
    mouseStrength: 0.6,
    mouseRadius: 0.9,
    mouseDampening: 0.15
  };

  // ═══════════════════════════════════════════
  //  OGL Renderer (creates its own canvas)
  // ═══════════════════════════════════════════

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var renderer = new Renderer({ dpr: dpr, alpha: true, antialias: true });
  var gl = renderer.gl;
  var canvas = gl.canvas;
  canvas.id = 'lightfall-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;';
  document.body.insertBefore(canvas, document.body.firstChild);

  // ═══════════════════════════════════════════
  //  Colors & Uniforms
  // ═══════════════════════════════════════════

  var prep = prepColors(CONFIG.colors);

  var uniforms = {
    iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
    iMouse: { value: [0, 0] },
    iTime: { value: 0 },
    uColor0: { value: prep.arr[0] },
    uColor1: { value: prep.arr[1] },
    uColor2: { value: prep.arr[2] },
    uColor3: { value: prep.arr[3] },
    uColor4: { value: prep.arr[4] },
    uColor5: { value: prep.arr[5] },
    uColor6: { value: prep.arr[6] },
    uColor7: { value: prep.arr[7] },
    uColorCount: { value: prep.count },
    uBgColor: { value: hexToRGB(CONFIG.backgroundColor) },
    uMouseColor: { value: prep.avg },
    uSpeed: { value: CONFIG.speed },
    uStreakCount: { value: Math.max(1, Math.min(16, Math.round(CONFIG.streakCount))) },
    uStreakWidth: { value: CONFIG.streakWidth },
    uStreakLength: { value: CONFIG.streakLength },
    uGlow: { value: CONFIG.glow },
    uDensity: { value: CONFIG.density },
    uTwinkle: { value: CONFIG.twinkle },
    uZoom: { value: CONFIG.zoom },
    uBgGlow: { value: CONFIG.backgroundGlow },
    uOpacity: { value: CONFIG.opacity },
    uMouseEnabled: { value: CONFIG.mouseInteraction ? 1 : 0 },
    uMouseStrength: { value: CONFIG.mouseStrength },
    uMouseRadius: { value: CONFIG.mouseRadius }
  };

  // ═══════════════════════════════════════════
  //  Program, Geometry, Mesh
  // ═══════════════════════════════════════════

  var program = new Program(gl, { vertex: vertex, fragment: fragment, uniforms: uniforms });
  var geometry = new Triangle(gl);
  var mesh = new Mesh(gl, { geometry: geometry, program: program });

  // ═══════════════════════════════════════════
  //  Resize
  // ═══════════════════════════════════════════

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    renderer.setSize(w, h);
    uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
  }

  resize();
  window.addEventListener('resize', resize);

  // ═══════════════════════════════════════════
  //  Mouse tracking with dampening
  // ═══════════════════════════════════════════

  var mouseTarget = [0, 0];
  var lastTime = 0;

  function onPointerMove(e) {
    var rect = canvas.getBoundingClientRect();
    var scale = dpr;
    var x = (e.clientX - rect.left) * scale;
    var y = (rect.height - (e.clientY - rect.top)) * scale;
    mouseTarget = [x, y];
    if (CONFIG.mouseDampening <= 0) {
      uniforms.iMouse.value = [x, y];
    }
  }

  if (CONFIG.mouseInteraction) {
    document.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  // ═══════════════════════════════════════════
  //  Animation loop
  // ═══════════════════════════════════════════

  var rafId = null;

  function loop(t) {
    rafId = requestAnimationFrame(loop);

    uniforms.iTime.value = t * 0.001;

    if (CONFIG.mouseDampening > 0) {
      if (!lastTime) lastTime = t;
      var dt = (t - lastTime) / 1000;
      lastTime = t;
      var tau = Math.max(1e-4, CONFIG.mouseDampening);
      var factor = 1 - Math.exp(-dt / tau);
      if (factor > 1) factor = 1;
      var cur = uniforms.iMouse.value;
      cur[0] += (mouseTarget[0] - cur[0]) * factor;
      cur[1] += (mouseTarget[1] - cur[1]) * factor;
    } else {
      lastTime = t;
    }

    if (program && mesh) {
      try {
        renderer.render({ scene: mesh });
      } catch (e) {
        console.error('Lightfall render error:', e);
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  // ═══════════════════════════════════════════
  //  Cleanup
  // ═══════════════════════════════════════════

  window.addEventListener('beforeunload', function() {
    if (rafId) cancelAnimationFrame(rafId);
    if (CONFIG.mouseInteraction) {
      document.removeEventListener('pointermove', onPointerMove);
    }
    window.removeEventListener('resize', resize);
    if (canvas.parentElement === document.body) {
      document.body.removeChild(canvas);
    }
    try {
      if (program && typeof program.remove === 'function') program.remove();
      if (geometry && typeof geometry.remove === 'function') geometry.remove();
      if (mesh && typeof mesh.remove === 'function') mesh.remove();
      if (renderer && typeof renderer.destroy === 'function') renderer.destroy();
    } catch (e) {
      // silent
    }
  });
})();
