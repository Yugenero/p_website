import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

export const ThemeToggle = styled(ButtonBase)(({ theme }) => ({
  minWidth: '2.5rem',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '5px',
  border: `1px solid transparent`,
  padding: 0,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease',
  '& svg': {
    fontSize: '1.1rem',
  },
  '&:hover': {
    borderColor: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
  '&:focus-visible': {
    borderColor: theme.palette.text.primary,
    backgroundColor: 'transparent',
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '2.9rem',
    width: '2.9rem',
    height: '2.9rem',
    '& svg': {
      fontSize: '1.25rem',
    },
  },
}));
