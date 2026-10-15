import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';

// Halftone cloud background: a grid of small squares whose opacity follows a
// slowly drifting, domain-warped value-noise field, stepped into a few levels.

const CELL = 7; // grid pitch, CSS px
const DOT = 4; // square size, CSS px
const LATTICE = 24; // noise is sampled every LATTICE px, then interpolated
const LEVELS = 6;
const TICK_MS = 100; // ~10fps is plenty for slow drift
const MAX_PIXELS = 1.8e6; // cap backing-store size on big screens

const HalftoneCanvas = styled('canvas')(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
}));

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

const hash = (x, y) => {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ 1831565813;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const valueNoise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = smooth(x - xi);
  const ty = smooth(y - yi);
  return lerp(
    lerp(hash(xi, yi), hash(xi + 1, yi), tx),
    lerp(hash(xi, yi + 1), hash(xi + 1, yi + 1), tx),
    ty,
  );
};

// Cloud density in [0, 1] at noise coordinates (x, y) and time t (seconds).
const cloud = (x, y, t) => {
  const drift = t * 0.032;
  const wx = valueNoise(x * 0.6 + 17 + drift * 0.3, y * 0.6 - 4) - 0.5;
  const wy = valueNoise(x * 0.6 - 9, y * 0.6 + 21 - drift * 0.25) - 0.5;
  const px = x + wx * 1.6 + drift;
  const py = y + wy * 1.6 - drift * 0.4;
  const n = valueNoise(px, py) * 0.65 + valueNoise(px * 2.1 + 5, py * 2.1 - 3) * 0.35;
  const v = Math.min(1, Math.max(0, (n - 0.42) / 0.4));
  return smooth(v);
};

// Peak square opacity per theme; `subtle` tones it down behind small text (header, footer).
const MAX_ALPHA = { light: 0.11, dark: 0.16 };
const SUBTLE_SCALE = 0.7;

const Halftone = ({ subtle = false, className, style }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const color = theme.palette.text.primary;
  const maxAlpha = (MAX_ALPHA[theme.palette.mode] ?? MAX_ALPHA.light) * (subtle ? SUBTLE_SCALE : 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let time = Math.random() * 1000;
    let timer;
    let visible = true;
    let lattice = new Float32Array(0);

    const draw = () => {
      if (!width || !height) return;
      const cols = Math.ceil(width / LATTICE) + 2;
      const rows = Math.ceil(height / LATTICE) + 2;
      if (lattice.length !== cols * rows) lattice = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          lattice[r * cols + c] = cloud(c * LATTICE * 0.0038, r * LATTICE * 0.0038, time);
        }
      }

      // One path per opacity level keeps fill calls to a handful per frame.
      const paths = Array.from({ length: LEVELS }, () => new Path2D());
      for (let y = 1; y + DOT < height; y += CELL) {
        const gy = y / LATTICE;
        const r = Math.floor(gy);
        const ty = gy - r;
        for (let x = 1; x + DOT < width; x += CELL) {
          const gx = x / LATTICE;
          const c = Math.floor(gx);
          const i = r * cols + c;
          const v =
            lerp(
              lerp(lattice[i], lattice[i + 1], gx - c),
              lerp(lattice[i + cols], lattice[i + cols + 1], gx - c),
              ty,
            ) *
            (0.8 + hash(x, y) * 0.2);
          const level = Math.floor(v * LEVELS);
          if (level > 0) paths[Math.min(level, LEVELS) - 1].rect(x, y, DOT, DOT);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      paths.forEach((path, i) => {
        ctx.globalAlpha = ((i + 1) / LEVELS) * maxAlpha;
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (width * height)));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const shouldAnimate = () => visible && !document.hidden && !reduceMotion.matches;

    const tick = () => {
      timer = undefined;
      if (!shouldAnimate()) return;
      time += TICK_MS / 1000;
      draw();
      timer = setTimeout(tick, TICK_MS);
    };

    const restart = () => {
      clearTimeout(timer);
      timer = undefined;
      if (shouldAnimate()) timer = setTimeout(tick, TICK_MS);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    intersectionObserver.observe(canvas);

    document.addEventListener('visibilitychange', restart);
    reduceMotion.addEventListener('change', restart);

    resize();
    restart();

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', restart);
      reduceMotion.removeEventListener('change', restart);
    };
  }, [color, maxAlpha]);

  return <HalftoneCanvas ref={canvasRef} className={className} style={style} aria-hidden="true" />;
};

export default Halftone;
