import { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';

// Dark mode only: a field of small twinkling stars for the surfaces that don't have the halftone (the sidebar, the
// home feed around its tiles, the phone bar and menu). One canvas, redrawn ~30 times a second while on screen;
// static with reduced motion. Like the halftone, its parent needs `position: relative` and content above it at
// `zIndex: 1`.

const FRAME_MS = 1000 / 30;
const MAX_STARS = 500;

const rand = (min, max) => Math.random() * (max - min) + min;

const Starfield = ({ density = 1, className }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const dark = theme.palette.mode === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let visible = true;

    // Stars per 10,000 px², scaled by `density`.
    const seed = () => {
      const count = Math.min(Math.round(((width * height) / 10000) * 1.6 * density), MAX_STARS);
      stars = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(0.35, 1.1),
        min: rand(0.08, 0.3),
        max: rand(0.45, 0.95),
        speed: rand(0.4, 1.4), // twinkles per ~5s
        phase: rand(0, Math.PI * 2),
      }));
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = theme.palette.text.primary;
      for (const s of stars) {
        const t = reduceMotion ? 0.5 : (Math.sin(time * 0.00125 * s.speed + s.phase) + 1) / 2;
        ctx.globalAlpha = s.min + (s.max - s.min) * t;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (time - last >= FRAME_MS) {
        last = time;
        draw(time);
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion) {
        draw(0);
      } else if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now());
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Only animate while the canvas is on screen and the tab is visible.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersectionObserver.observe(canvas);
    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, dark, theme.palette.text.primary]);

  if (!dark) return null;
  return <StarCanvas ref={canvasRef} className={className} aria-hidden="true" data-starfield />;
};

const StarCanvas = styled('canvas')(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
}));

export default Starfield;
