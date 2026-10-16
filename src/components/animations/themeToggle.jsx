import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

// Light/dark switch: a square button with a half-filled circle (the contrast symbol) that turns
// 180° when the theme flips, plus a "Switch to … mode" label on hover / keyboard focus.
// `tipPlacement="top"` opens the label upward (for spots near the bottom of the screen).
export const ThemeToggle = ({ mode, onClick, tipPlacement = 'bottom' }) => {
  const label = `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`;

  return (
    <ToggleWrap>
      <ToggleButton onClick={onClick} aria-label={label} data-mode={mode}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="8.25" />
          <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" />
        </svg>
      </ToggleButton>
      <Tip data-tip data-placement={tipPlacement} aria-hidden="true">
        {label}
      </Tip>
    </ToggleWrap>
  );
};

const ToggleWrap = styled('span')(() => ({
  position: 'relative',
  display: 'inline-flex',
  // Hover labels only where hovering exists; touch screens rely on the obvious icon + aria-label.
  '@media (hover: hover)': {
    '&:hover > [data-tip]': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  // Keyboard focus only (MUI marks it .Mui-focusVisible), so a mouse click doesn't leave it showing.
  '&:has(.Mui-focusVisible) > [data-tip]': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

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
    transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  '& circle': {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
  },
  '& path': {
    fill: 'currentColor',
  },
  '&[data-mode="dark"] svg': {
    transform: 'rotate(180deg)',
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
    '& svg': {
      transition: 'none',
    },
  },
}));

// Right-aligned under the button so it never runs off the edge of the screen.
const Tip = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: `calc(100% + ${theme.spacing(1)})`,
  right: 0,
  '&[data-placement="top"]': {
    top: 'auto',
    bottom: `calc(100% + ${theme.spacing(1)})`,
    transform: 'translateY(4px)',
  },
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.75, 1.25),
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.8rem',
  fontWeight: 500,
  lineHeight: 1.2,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  opacity: 0,
  transform: 'translateY(-4px)',
  transition: 'opacity 0.15s ease, transform 0.15s ease',
  pointerEvents: 'none',
  zIndex: theme.zIndex.tooltip,
}));
