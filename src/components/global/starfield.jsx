import React, { useEffect, useMemo, useRef, useState } from 'react';
import { keyframes, styled } from '@mui/material/styles';

const twinkle = keyframes`
  0% {
    opacity: var(--opacity-min);
  }
  50% {
    opacity: var(--opacity-max);
  }
  100% {
    opacity: var(--opacity-min);
  }
`;

const drift = keyframes`
  0% {
    transform: translate(0, 0) scale(var(--scale-min));
  }
  50% {
    transform: translate(var(--drift-x), var(--drift-y)) scale(var(--scale-max));
  }
  100% {
    transform: translate(0, 0) scale(var(--scale-min));
  }
`;

const StarfieldRoot = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
}));

const StarDot = styled('span')(() => ({
  position: 'absolute',
  borderRadius: 999,
  animation: `${twinkle} var(--twinkle-duration) ease-in-out var(--delay) infinite, ${drift} var(--drift-duration) ease-in-out var(--delay) infinite`,
  opacity: 'var(--opacity-min)',
  willChange: 'transform, opacity',
}));

const rand = (min, max) => Math.random() * (max - min) + min;

const tinyTint = (hex, factor) => {
  const n = (i) => parseInt(hex.slice(i, i + 2), 16);
  const r = n(1);
  const g = n(3);
  const b = n(5);
  const mix = (c) => Math.round(c + (255 - c) * factor);
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
};

const useElementSize = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update);
      observer.observe(node);
    } else {
      window.addEventListener('resize', update);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener('resize', update);
      }
    };
  }, []);

  return [ref, size];
};

const Starfield = ({
  density = 2,
  color = '#FFFFFF',
  backgroundStops = ['#CCD8E4', '#EAF1F8', '#FFFFFF'],
  twinkleMs = [1200, 2600],
  maxDrift = 0.8,
  style,
  ultraSubtle = false,
  className,
  forceWhite = true,
}) => {
  const [rootRef, { width, height }] = useElementSize();
  const area = width * height;

  const starCount = useMemo(() => {
    if (!width || !height) return 0;
    const count = Math.round((area / 8000) * density);
    const capped = Math.min(count, 420);
    return ultraSubtle ? Math.floor(capped * 0.6) : capped;
  }, [area, density, ultraSubtle, width, height]);

  const stars = useMemo(() => {
    if (!width || !height) return [];
    const arr = [];
    for (let i = 0; i < starCount; i += 1) {
      const size = rand(0.7, 2.2) * (ultraSubtle ? 0.85 : 1);
      const minOpacity = ultraSubtle ? 0.5 : 0.25;
      const maxOpacity = ultraSubtle ? 0.9 : 1.0;
      const driftAmp = maxDrift * (ultraSubtle ? 0.6 : 1);
      arr.push({
        x: rand(0, width),
        y: rand(0, height),
        size,
        tint: forceWhite ? '#FFFFFF' : tinyTint(color, rand(0.2, 0.6)),
        twinkle: rand(twinkleMs[0] * 0.8, twinkleMs[1] * 1.1) * (ultraSubtle ? 1.25 : 1),
        drift: rand(3000, 6000),
        delay: rand(0, 1200),
        driftX: rand(-driftAmp, driftAmp),
        driftY: rand(-driftAmp, driftAmp),
        minOpacity,
        maxOpacity,
        scaleMin: ultraSubtle ? 0.95 : 0.92,
        scaleMax: ultraSubtle ? 1.05 : 1.12,
      });
    }
    return arr;
  }, [width, height, starCount, color, twinkleMs, maxDrift, ultraSubtle]);

  const background = backgroundStops.length
    ? `linear-gradient(180deg, ${backgroundStops.join(', ')})`
    : 'transparent';

  return (
    <StarfieldRoot ref={rootRef} className={className} style={{ background, ...style }}>
      {stars.map((s, i) => (
        <StarDot
          key={i}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.tint,
            boxShadow: `0 0 ${Math.max(2, s.size * 3)}px ${s.tint}`,
            '--twinkle-duration': `${s.twinkle}ms`,
            '--drift-duration': `${s.drift}ms`,
            '--delay': `${s.delay}ms`,
            '--drift-x': `${s.driftX}px`,
            '--drift-y': `${s.driftY}px`,
            '--opacity-min': `${s.minOpacity}`,
            '--opacity-max': `${s.maxOpacity}`,
            '--scale-min': `${s.scaleMin}`,
            '--scale-max': `${s.scaleMax}`,
          }}
        />
      ))}
    </StarfieldRoot>
  );
};

export default Starfield;
