import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { CursorTip } from '../global/cursorTip';

// Light/dark switch: a square button with a half-filled circle (the contrast symbol) that turns
// 180° when the theme flips, plus a "Switch to … mode" label that follows the cursor (CursorTip).
export const ThemeToggle = ({ mode, onClick }) => {
  const label = `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`;

  return (
    <CursorTip label={label}>
      <ToggleButton onClick={onClick} aria-label={label} data-mode={mode}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="8.25" />
          <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" />
        </svg>
      </ToggleButton>
    </CursorTip>
  );
};

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
