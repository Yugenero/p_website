import ButtonBase from '@mui/material/ButtonBase';
import { colors } from '../../theme';
import { styled } from '@mui/material/styles';

export const ThemeToggle = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: 56,
  height: 30,
  borderRadius: '5px',
  border: `1px solid ${theme.palette.text.primary}`,
  padding: 0,
  backgroundColor: theme.palette.mode === 'light' ? colors.offWhite : '#000',
  display: 'inline-flex',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  '& .toggle-thumb': {
    position: 'absolute',
    left: 4,
    top: '50%',
    width: 16,
    height: 16,
    borderRadius: '5px',
    backgroundColor: theme.palette.text.primary,
    transform: 'translateY(-50%)',
    transition: 'left 0.22s ease',
  },
  '&[data-mode="light"] .toggle-thumb': {
    left: 4,
  },
  '&[data-mode="dark"] .toggle-thumb': {
    left: 'calc(100% - 20px)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.text.primary}`,
    outlineOffset: 3,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& .toggle-thumb': {
      transition: 'none',
    },
  },
}));
