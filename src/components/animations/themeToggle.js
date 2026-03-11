import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

export const ThemeToggle = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  minWidth: '1.95rem',
  width: '1.95rem',
  height: '1.95rem',
  borderRadius: '5px',
  border: `1px solid ${theme.palette.divider}`,
  padding: 0,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'none',
  '& .toggle-thumb': {
    position: 'absolute',
    inset: '2px',
    borderRadius: '999px',
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: 'transparent',
    transform: 'scale(1)',
    transformOrigin: 'center',
    transition:
      'transform 140ms cubic-bezier(0.22, 1, 0.36, 1), border-color 120ms ease',
    willChange: 'transform',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '22%',
      borderRadius: '999px',
      backgroundColor: theme.palette.text.primary,
      transform: 'scale(1)',
      transformOrigin: 'center',
      transition: 'transform 140ms cubic-bezier(0.22, 1, 0.36, 1), opacity 120ms ease',
      opacity: 0.95,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '5px',
    borderRadius: '999px',
    border: `1px solid ${theme.palette.divider}`,
    opacity: 0.75,
    pointerEvents: 'none',
    transition: 'opacity 120ms ease, border-color 120ms ease',
  },
  '&[data-mode="dark"] .toggle-thumb': {
    transform: 'scale(0.42)',
  },
  '&[data-mode="dark"] .toggle-thumb::after': {
    transform: 'scale(0.62)',
    opacity: 0.9,
  },
  '&[data-mode="dark"]::before': {
    opacity: 0.5,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&:focus-visible': {
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '1.95rem',
    width: '1.95rem',
    height: '1.95rem',
  },
}));
