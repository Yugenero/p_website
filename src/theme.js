import { createTheme } from '@mui/material/styles';

export const colors = {
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
    },
    secondary: {
      main: colors.grayDark,
    },
    text: {
      primary: colors.nearBlack,
      secondary: colors.gray,
    },
    background: {
      default: colors.offWhite,
      paper: colors.white,
    },
    divider: colors.grayLight,
  },
  shape: {
    borderRadius: 0,
  },
  spacing: 8,
  typography: {
    fontFamily: '"Geist", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.9rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.35rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
    },
    overline: {
      fontSize: '0.72rem',
      letterSpacing: '0.2em',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [
          {
            fontFamily: 'Geist',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: '100 900',
            src: "url('/fonts/geist-sans/Geist-Variable.woff2') format('woff2')",
          },
        ],
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
        },
        body: {
          margin: 0,
          minHeight: '100%',
          backgroundColor: colors.offWhite,
          color: colors.nearBlack,
          fontFamily: '"Geist", "Helvetica Neue", Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          minHeight: '100%',
        },
        a: {
          color: 'inherit',
          textDecorationColor: colors.grayDark,
          textUnderlineOffset: '4px',
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        '::selection': {
          backgroundColor: colors.black,
          color: colors.white,
        },
        '::-webkit-scrollbar': {
          width: '10px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: colors.offWhite,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: colors.nearBlack,
        },
        '*:focus-visible': {
          outline: `2px solid ${colors.black}`,
          outlineOffset: '3px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          padding: '12px 20px',
          border: `1px solid ${colors.black}`,
        },
        contained: {
          backgroundColor: colors.black,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.white,
            color: colors.black,
          },
        },
        outlined: {
          borderColor: colors.black,
          color: colors.black,
          '&:hover': {
            backgroundColor: colors.black,
            color: colors.white,
          },
        },
        text: {
          border: '1px solid transparent',
          color: colors.nearBlack,
          '&:hover': {
            backgroundColor: colors.grayLight,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.offWhite,
          color: colors.nearBlack,
          boxShadow: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 72,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.black,
          color: colors.white,
          borderRadius: 0,
          border: `1px solid ${colors.grayDark}`,
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecorationThickness: '2px',
        },
      },
    },
  },
});

export default theme;
