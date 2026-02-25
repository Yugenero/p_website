import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

export const ThemeToggle = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  minWidth: '3.25rem',
  width: '3.25rem',
  height: '2rem',
  borderRadius: '5px',
  border: `1px solid ${theme.palette.divider}`,
  padding: '3px',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  transition: 'border-color 120ms ease, color 120ms ease',
  '& .toggle-thumb': {
    width: '1.05rem',
    height: '100%',
    borderRadius: '3px',
    backgroundColor: theme.palette.text.primary,
    transform: 'translateX(0)',
    transition: 'transform 140ms cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'transform',
  },
  '&::before, &::after': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '0.56rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    lineHeight: 1,
    pointerEvents: 'none',
    transition: 'opacity 120ms ease',
  },
  '&::before': {
    content: '"L"',
    left: '8px',
    opacity: 0.25,
  },
  '&::after': {
    content: '"D"',
    right: '8px',
    opacity: 0.55,
  },
  '&[data-mode="dark"] .toggle-thumb': {
    transform: 'translateX(calc(100% - 1.05rem - 6px))',
  },
  '&[data-mode="dark"]::before': {
    opacity: 0.55,
  },
  '&[data-mode="dark"]::after': {
    opacity: 0.25,
  },
  '&:hover': {
    borderColor: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
  '&:focus-visible': {
    borderColor: theme.palette.text.primary,
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '3.25rem',
    width: '3.25rem',
    height: '2rem',
  },
}));
