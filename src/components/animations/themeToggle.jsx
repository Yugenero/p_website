import ButtonBase from '@mui/material/ButtonBase';
import { alpha, styled } from '@mui/material/styles';
import { CursorTip } from '../global/cursorTip';

// Light/dark switch: a square button whose icon is a star in dark mode and a sun in light mode, plus a
// "Switch to … mode" label that follows the cursor (CursorTip).
// The star is two stacked diamonds (one diamond at rest) stretched apart, one tall and one wide, so the diamond
// sharpens into a four-point star. For the sun, the points pull back into a plain diamond at the center and eight
// spikes fan out around it one after another. Transforms only (no path morphing), so it animates in every browser.
const DIAMOND = 'M12 7 L17 12 L12 17 L7 12 Z';
// A spike pointing up from just outside the diamond's top corner; each spike is this, rotated around the center.
// Its base is a V notch parallel to the diamond's edges (which meet at y 7.75 in the sun's 85% diamond), so it
// wraps the corner with an even gap.
const SPIKE = 'M12 1.5 L13 7.35 L12 6.35 L11 7.35 Z';
// Shorter spikes on the diagonals, off the middle of each diamond edge (3 units out), with a flat base parallel to
// that edge and the same one-unit gap.
const DIAGONAL_SPIKE = 'M12 4.5 L12.8 8 L11.2 8 Z';
// Clockwise from the top, alternating corner and diagonal spikes.
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => ({
  angle,
  d: angle % 90 === 0 ? SPIKE : DIAGONAL_SPIKE,
}));

export const ThemeToggle = ({ mode, onClick }) => {
  const label = `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`;

  return (
    <CursorTip label={label}>
      <ToggleButton onClick={onClick} aria-label={label} data-mode={mode}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <g className="star">
            <path className="point-v" d={DIAMOND} />
            <path className="point-h" d={DIAMOND} />
          </g>
          <g className="rays">
            {RAYS.map(({ angle, d }, i) => (
              <path
                key={angle}
                d={d}
                transform={`rotate(${angle} 12 12)`}
                style={{ transitionDelay: `${i * 35}ms` }}
              />
            ))}
          </g>
        </svg>
      </ToggleButton>
    </CursorTip>
  );
};

// Springy, so the star's points overshoot a little as they sharpen.
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const ToggleButton = styled(ButtonBase)(({ theme }) => ({
  width: '2.35rem',
  height: '2.35rem',
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  transition: 'border-color 0.2s ease',
  '& svg': {
    width: '1.3rem',
    height: '1.3rem',
    overflow: 'visible',
  },
  '& .star, & .star path, & .rays': {
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
  '& .star path, & .rays path': {
    fill: 'currentColor',
  },

  // Dark mode: the star, glowing softly like the nav's diamond.
  '& .star': {
    filter: `drop-shadow(0 0 2px ${alpha(theme.palette.text.primary, 0.55)})`,
    transition: `transform 0.6s ${EASE}, opacity 0.3s ease`,
  },
  '& .star path': {
    transition: `transform 0.6s ${SPRING}`,
  },
  '& .point-v': { transform: 'scale(0.32, 1.8)' },
  '& .point-h': { transform: 'scale(1.8, 0.32)' },
  '& .rays': {
    transform: 'rotate(-45deg) scale(0.6)',
    transition: `transform 0.5s ${EASE}`,
  },
  '& .rays path': {
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },

  // Light mode: the sun. The points pull back into a plain diamond at the center, ringed by spikes, with a faint
  // glow around the whole sun (monochrome, like the star's).
  '&[data-mode="light"]': {
    '& svg': {
      filter: `drop-shadow(0 0 1.5px ${alpha(theme.palette.text.primary, 0.3)})`,
    },
    '& .star': {
      transform: 'scale(0.85)',
      filter: 'none',
    },
    '& .point-v, & .point-h': {
      transform: 'scale(1)',
    },
    '& .rays': {
      transform: 'rotate(0deg) scale(1)',
    },
    '& .rays path': {
      opacity: 1,
    },
  },

  '&:hover, &:focus-visible': {
    borderColor: theme.palette.text.primary,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.text.primary}`,
    outlineOffset: 2,
  },
  [theme.breakpoints.up('lg')]: {
    width: '2.6rem',
    height: '2.6rem',
    '& svg': {
      width: '1.45rem',
      height: '1.45rem',
    },
  },
  // Big, obvious tap target on phones.
  [theme.breakpoints.down('md')]: {
    width: 44,
    height: 44,
    '& svg': {
      width: 24,
      height: 24,
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& .star, & .star path, & .rays, & .rays path': {
      transition: 'none !important',
      transitionDelay: '0s !important',
    },
  },
}));
