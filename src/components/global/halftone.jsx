import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';

// Halftone cloud background: a grid of small squares whose opacity follows a
// slowly drifting, domain-warped value-noise field, stepped into a few levels.
// Moving the mouse over it sends out water-like ripples.

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

// Peak square opacity per theme.
const MAX_ALPHA = { light: 0.11, dark: 0.16 };

// Mouse ripples behave like water: a short train of waves spreads out from the cursor and fades.
// Crests push squares outward, grow them and light them up; troughs shrink them. No color, just light.
const RIPPLE_LIGHT = { light: '#000000', dark: '#FFFFFF' };
const RIPPLE_MS = 1600;
const RIPPLE_RADIUS = 220; // CSS px the wave front travels
const WAVELENGTH = 26; // CSS px between crests
const WAVE_TRAIN = 70; // CSS px of waves behind the front
const WAVE_PUSH = 2.5; // max outward shift of a square, CSS px
const WAVE_GROW = 1.6; // max size change of a square, CSS px
const RIPPLE_ALPHA = { light: 0.32, dark: 0.55 };
const RIPPLE_LEVELS = 5;
const RIPPLE_SPACING = 60; // spawn a ripple every this many px of mouse travel...
const RIPPLE_EVERY_MS = 220; // ...or this often while the mouse keeps moving
const MAX_RIPPLES = 10;

const Halftone = ({ className, style }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const { mode } = theme.palette;
  const color = theme.palette.text.primary;
  const maxAlpha = MAX_ALPHA[mode] ?? MAX_ALPHA.light;
  const rippleLight = RIPPLE_LIGHT[mode] ?? RIPPLE_LIGHT.light;
  const rippleAlpha = RIPPLE_ALPHA[mode] ?? RIPPLE_ALPHA.light;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let time = Math.random() * 1000;
    let timer;
    let frame;
    let lastFieldAt = 0;
    let visible = true;
    let lattice = new Float32Array(0);
    let field = new Float32Array(0); // cloud density per square
    let cols = 0;
    let rows = 0;
    let ripples = [];
    let lastSpawn = null;

    // Recompute the cloud density under every square for the current time.
    const computeField = () => {
      const lcols = Math.ceil(width / LATTICE) + 2;
      const lrows = Math.ceil(height / LATTICE) + 2;
      if (lattice.length !== lcols * lrows) lattice = new Float32Array(lcols * lrows);
      for (let r = 0; r < lrows; r += 1) {
        for (let c = 0; c < lcols; c += 1) {
          lattice[r * lcols + c] = cloud(c * LATTICE * 0.0038, r * LATTICE * 0.0038, time);
        }
      }

      cols = Math.max(0, Math.floor((width - 1 - DOT) / CELL) + 1);
      rows = Math.max(0, Math.floor((height - 1 - DOT) / CELL) + 1);
      if (field.length !== cols * rows) field = new Float32Array(cols * rows);
      for (let row = 0; row < rows; row += 1) {
        const y = 1 + row * CELL;
        const gy = y / LATTICE;
        const r = Math.floor(gy);
        const ty = gy - r;
        for (let col = 0; col < cols; col += 1) {
          const x = 1 + col * CELL;
          const gx = x / LATTICE;
          const c = Math.floor(gx);
          const i = r * lcols + c;
          field[row * cols + col] =
            lerp(
              lerp(lattice[i], lattice[i + 1], gx - c),
              lerp(lattice[i + lcols], lattice[i + lcols + 1], gx - c),
              ty,
            ) *
            (0.8 + hash(x, y) * 0.2);
        }
      }
    };

    const render = (now) => {
      if (!width || !height) return;
      ripples = ripples.filter((rp) => now - rp.start < RIPPLE_MS);

      // One path per opacity level keeps fill calls to a handful per frame.
      const paths = Array.from({ length: LEVELS }, () => new Path2D());
      const crests = Array.from({ length: RIPPLE_LEVELS }, () => new Path2D());

      const rings = ripples.map((rp) => {
        const t = (now - rp.start) / RIPPLE_MS;
        const radius = t * RIPPLE_RADIUS;
        return {
          ...rp,
          radius,
          fade: (1 - t) ** 1.6,
          inner: Math.max(0, radius - WAVE_TRAIN),
          minX: rp.x - radius,
          maxX: rp.x + radius,
          minY: rp.y - radius,
          maxY: rp.y + radius,
        };
      });

      for (let row = 0; row < rows; row += 1) {
        const y = 1 + row * CELL;
        for (let col = 0; col < cols; col += 1) {
          const x = 1 + col * CELL;
          const cx = x + DOT / 2;
          const cy = y + DOT / 2;
          let wave = 0;
          let pushX = 0;
          let pushY = 0;
          for (let k = 0; k < rings.length; k += 1) {
            const ring = rings[k];
            if (cx < ring.minX || cx > ring.maxX || cy < ring.minY || cy > ring.maxY) continue;
            const dx = cx - ring.x;
            const dy = cy - ring.y;
            const dist = Math.hypot(dx, dy);
            if (dist > ring.radius || dist < ring.inner) continue;
            const behind = ring.radius - dist; // 0 at the front, WAVE_TRAIN at the tail
            const envelope = Math.sin((Math.PI * behind) / WAVE_TRAIN);
            const w = Math.cos((2 * Math.PI * behind) / WAVELENGTH) * envelope * ring.fade;
            wave += w;
            if (dist > 0) {
              pushX += (dx / dist) * w;
              pushY += (dy / dist) * w;
            }
          }

          const base = field[row * cols + col];
          if (Math.abs(wave) < 0.04) {
            const level = Math.floor(base * LEVELS);
            if (level > 0) paths[Math.min(level, LEVELS) - 1].rect(x, y, DOT, DOT);
            continue;
          }

          wave = Math.max(-1, Math.min(1, wave));
          const size = DOT + wave * WAVE_GROW;
          const sx = x + pushX * WAVE_PUSH - (size - DOT) / 2;
          const sy = y + pushY * WAVE_PUSH - (size - DOT) / 2;
          if (wave > 0) {
            const level = Math.ceil(wave * RIPPLE_LEVELS);
            crests[Math.min(level, RIPPLE_LEVELS) - 1].rect(sx, sy, size, size);
          } else {
            // Troughs dim the cloud underneath instead of lighting it.
            const level = Math.floor(base * (1 + wave) * LEVELS);
            if (level > 0) paths[Math.min(level, LEVELS) - 1].rect(sx, sy, size, size);
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      const fillLevels = (levelPaths, fill, peak) => {
        ctx.fillStyle = fill;
        levelPaths.forEach((path, i) => {
          ctx.globalAlpha = ((i + 1) / levelPaths.length) * peak;
          ctx.fill(path);
        });
      };
      fillLevels(paths, color, maxAlpha);
      if (rings.length) fillLevels(crests, rippleLight, rippleAlpha);
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      if (!width || !height) return;
      computeField();
      lastFieldAt = performance.now();
      render(lastFieldAt);
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

    // While ripples are on screen, redraw every frame; the clouds still only move every TICK_MS.
    const animateRipples = (now) => {
      frame = undefined;
      if (!shouldAnimate()) {
        ripples = [];
        draw();
        return;
      }
      if (now - lastFieldAt >= TICK_MS) {
        time += (now - lastFieldAt) / 1000;
        computeField();
        lastFieldAt = now;
      }
      render(now);
      if (ripples.length) frame = requestAnimationFrame(animateRipples);
      else restart();
    };

    const tick = () => {
      timer = undefined;
      if (!shouldAnimate()) return;
      time += TICK_MS / 1000;
      draw();
      timer = setTimeout(tick, TICK_MS);
    };

    function restart() {
      clearTimeout(timer);
      timer = undefined;
      if (frame) return; // the ripple loop hands back to the tick when it's done
      if (shouldAnimate()) timer = setTimeout(tick, TICK_MS);
    }

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse' || !shouldAnimate()) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      const now = performance.now();
      if (
        lastSpawn &&
        Math.hypot(x - lastSpawn.x, y - lastSpawn.y) < RIPPLE_SPACING &&
        now - lastSpawn.at < RIPPLE_EVERY_MS
      ) {
        return;
      }
      lastSpawn = { x, y, at: now };
      ripples.push({ x, y, start: now });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      if (!frame) {
        clearTimeout(timer);
        timer = undefined;
        frame = requestAnimationFrame(animateRipples);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', restart);
    reduceMotion.addEventListener('change', restart);

    resize();
    restart();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', restart);
      reduceMotion.removeEventListener('change', restart);
    };
  }, [color, maxAlpha, rippleLight, rippleAlpha]);

  return <HalftoneCanvas ref={canvasRef} className={className} style={style} aria-hidden="true" />;
};

export default Halftone;
