import ButtonBase from '@mui/material/ButtonBase';
import { alpha, styled } from '@mui/material/styles';
import { CursorTip } from '../global/cursorTip';

// Light/dark switch: a square button whose icon is a star in dark mode and a sun in light mode, plus a
// "Switch to … mode" label that follows the cursor (CursorTip).
// The star is two stacked diamonds (one diamond at rest) stretched apart, one tall and one wide, so the diamond
// sharpens into a four-point star. For the sun, the diamonds turn and shrink behind a growing disc and the rays
// fan out one after another. Transforms only (no path morphing), so it animates in every browser.
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];
const DIAMOND = 'M12 7 L17 12 L12 17 L7 12 Z';

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
          <circle className="disc" cx="12" cy="12" r="4.25" />
          <g className="rays">
            {RAYS.map((angle, i) => (
              <line
                key={angle}
                x1="12"
                y1="4.5"
                x2="12"
                y2="2.25"
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
  '& .star, & .star path, & .disc, & .rays': {
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
  '& .star path, & .disc': {
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
  '& .point-v': { transform: 'scale(0.4, 1.8)' },
  '& .point-h': { transform: 'scale(1.8, 0.4)' },
  '& .disc': {
    opacity: 0,
    transform: 'scale(0.4)',
    transition: `transform 0.45s ${EASE}, opacity 0.25s ease`,
  },
  '& .rays': {
    transform: 'rotate(-45deg) scale(0.6)',
    transition: `transform 0.5s ${EASE}`,
  },
  '& .rays line': {
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'square',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },

  // Light mode: the sun. The points pull back into the diamond, which turns and fades behind the disc.
  '&[data-mode="light"]': {
    '& .star': {
      opacity: 0,
      transform: 'rotate(45deg) scale(0.7)',
      filter: 'none',
    },
    '& .point-v, & .point-h': {
      transform: 'scale(1)',
      transition: `transform 0.35s ${EASE}`,
    },
    '& .disc': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '& .rays': {
      transform: 'rotate(0deg) scale(1)',
    },
    '& .rays line': {
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
    '& .star, & .star path, & .disc, & .rays, & .rays line': {
      transition: 'none !important',
      transitionDelay: '0s !important',
    },
  },
}));
