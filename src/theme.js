import { createTheme } from '@mui/material/styles';

// Main colors for the website
export const colors = {
  black: '#000000',
  nearBlack: '#111111',
  grayDark: '#222222',
  gray: '#888888',
  grayLight: '#E0E0E0',
  offWhite: '#F1F0EC',
  white: '#F1F0EC',
};

// TODO - figure out access toggle for colors in the future
export const accentColors = {
  crimsonPrimary: '#8B0000',
  crimson: '#B11226',
  crimsonMuted: '#9E2A2B',
  crimsonSoft: '#C73E3A',
  crimsonDark: '#5C0A0A',
  crimsonHighlight: '#E63946',
}

const titleFont = '"Crimson Pro", "Times New Roman", Times, serif';
const bodyFont =
  '"Voyager-Thin", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

const baseTypography = {
  fontFamily: bodyFont,
  h1: {
    fontSize: '2.9rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    fontFamily: titleFont,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    letterSpacing: '-0.015em',
    lineHeight: 1.2,
    fontFamily: titleFont,
  },
  h3: {
    fontSize: '1.35rem',
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily: titleFont,
  },
  h4: {
    fontFamily: titleFont,
  },
  h5: {
    fontFamily: titleFont,
  },
  h6: {
    fontFamily: titleFont,
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
};

const lightPalette = {
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
    paper: colors.offWhite,
  },
  divider: colors.grayLight,
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: colors.offWhite,
  },
  secondary: {
    main: colors.grayLight,
  },
  text: {
    primary: colors.offWhite,
    secondary: colors.grayLight,
  },
  background: {
    default: colors.black,
    paper: colors.nearBlack,
  },
  divider: colors.grayDark,
};

export const buildTheme = (mode = 'light') => {
  // TODO - figure out where this is coming from
  const baseTheme = createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    shape: {
      borderRadius: 0,
    },
    spacing: 8,
    typography: baseTypography,
  });

  return createTheme(baseTheme, {
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
            {
              fontFamily: 'Junicode',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 200,
              src: "url('/fonts/Junicode/Junicode.woff') format('woff')",
            },
            {
              fontFamily: 'Boska',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 300,
              src: "url('/fonts/Boska/Boska-Light.woff2') format('woff2')",
            },
            {
              fontFamily: 'Boska',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 700,
              src: "url('/fonts/Boska/Boska-Bold.woff2') format('woff2')",
            },
            {
              fontFamily: 'Crimson Pro',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 300,
              src: "url('/fonts/CrimsonPro_Complete/Fonts/OTF/CrimsonPro-Light.otf') format('opentype')",
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
            backgroundColor: baseTheme.palette.background.default,
            color: baseTheme.palette.text.primary,
            fontFamily: baseTheme.typography.fontFamily,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          '#root': {
            minHeight: '100%',
          },
          a: {
            color: 'inherit',
            textDecorationColor: baseTheme.palette.text.primary,
            textUnderlineOffset: '4px',
          },
          img: {
            display: 'block',
            maxWidth: '100%',
          },
          '::selection': {
            backgroundColor: baseTheme.palette.text.primary,
            color: baseTheme.palette.background.default,
          },
          '::-webkit-scrollbar': {
            width: '10px',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: baseTheme.palette.background.default,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: baseTheme.palette.text.primary,
          },
          '*:focus-visible': {
            outline: `2px solid ${baseTheme.palette.text.primary}`,
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
            border: `1px solid ${baseTheme.palette.text.primary}`,
          },
          contained: {
            backgroundColor: baseTheme.palette.text.primary,
            color: baseTheme.palette.background.default,
            '&:hover': {
              backgroundColor: baseTheme.palette.background.default,
              color: baseTheme.palette.text.primary,
            },
          },
          outlined: {
            borderColor: baseTheme.palette.text.primary,
            color: baseTheme.palette.text.primary,
            '&:hover': {
              backgroundColor: baseTheme.palette.text.primary,
              color: baseTheme.palette.background.default,
            },
          },
          text: {
            border: '1px solid transparent',
            color: baseTheme.palette.text.primary,
            '&:hover': {
              backgroundColor: baseTheme.palette.divider,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: baseTheme.palette.background.default,
            color: baseTheme.palette.text.primary,
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
            backgroundColor: baseTheme.palette.text.primary,
            color: baseTheme.palette.background.default,
            borderRadius: 0,
            border: `1px solid ${baseTheme.palette.divider}`,
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
};

export default buildTheme;
