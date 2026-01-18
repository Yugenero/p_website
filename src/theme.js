import { createTheme } from '@mui/material/styles';

const colors = {
  black: '#000000',
  nearBlack: '#111111',
  grayDark: '#222222',
  gray: '#888888',
  grayLight: '#E0E0E0',
  offWhite: '#F6F6F6',
  white: '#FFFFFF',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.black,
      contrastText: colors.white,
    },
    background: {
      default: colors.offWhite,
      paper: colors.white,
    },
    text: {
      primary: colors.nearBlack,
      secondary: colors.grayDark,
    },
    grey: {
      100: colors.offWhite,
      200: colors.grayLight,
      600: colors.gray,
      900: colors.grayDark,
    },
  },
  typography: {
    fontFamily: '"Geist", "Geist Sans", "Inter", system-ui, sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 4vw, 3rem)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: 'clamp(1.75rem, 3vw, 2rem)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.375rem)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.8rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: Array(25).fill('none'),
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        body: {
          backgroundColor: colors.offWhite,
          color: colors.nearBlack,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        'a:focus-visible, button:focus-visible': {
          outline: `2px solid ${colors.black}`,
          outlineOffset: '2px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: colors.black,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.nearBlack,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
