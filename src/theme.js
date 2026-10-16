import { createTheme } from '@mui/material/styles';

// Main colors for the website
export const colors = {
  black: '#000000',
  nearBlack: '#111111',
  grayDark: '#222222',
  gray: '#888888',
  grayMid: '#A3A3A3', // dark mode's secondary text: clearly grey on black, ~8.5:1 contrast
  grayLight: '#E0E0E0',
  offWhite: '#F1F0EC',
  white: '#F1F0EC',
};

// Cursors: near-black fill with a white outline, so they read on both themes.
const svgCursor = (svg, x, y, fallback) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${x} ${y}, ${fallback}`;

const CURSOR_ARROW = svgCursor(
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">' +
    '<path d="M5 3v18.5l4.6-4.3 3 6.8 3.2-1.4-2.9-6.6 6.1-.2Z" fill="#111" stroke="#fff" ' +
    'stroke-width="1.6" stroke-linejoin="round"/></svg>',
  5,
  3,
  'auto',
);

// Material's PanToolAlt hand, outlined to match the arrow.
const CURSOR_HAND = svgCursor(
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="2 1 22 22">' +
    '<path d="m19.98 14.82-.63 4.46c-.14.99-.99 1.72-1.98 1.72h-6.16c-.53 0-1.29-.21-1.66-.59L5 ' +
    '15.62l.83-.84c.24-.24.58-.35.92-.28l3.25.74V4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6h.91c.31 ' +
    '0 .62.07.89.21l4.09 2.04c.77.39 1.21 1.22 1.09 2.07" fill="#111" stroke="#fff" ' +
    'stroke-width="1.3" stroke-linejoin="round"/></svg>',
  12,
  3,
  'pointer',
);

const CLICKABLE = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]:not([aria-disabled="true"])',
  'label[for]',
  'summary',
].join(', ');

export const accentColors = {
  crimsonPrimary: '#8B0000',
  crimson: '#B11226',
  crimsonMuted: '#9E2A2B',
  crimsonSoft: '#C73E3A',
  crimsonDark: '#5C0A0A',
  crimsonHighlight: '#E63946',
}

const titleFont =
  'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif';
const bodyFont =
  '"Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

const baseTypography = {
  fontFamily: bodyFont,
  h1: {
    fontSize: '3.3rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    fontFamily: titleFont,
  },
  h2: {
    fontSize: '2.35rem',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    lineHeight: 1.2,
    fontFamily: titleFont,
  },
  h3: {
    fontSize: '1.55rem',
    fontWeight: 700,
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
    fontSize: '0.82rem',
    letterSpacing: '0.01em',
    fontWeight: 500,
    textTransform: 'none',
  },
  button: {
    fontSize: '0.88rem',
    letterSpacing: '0.01em',
    fontWeight: 500,
    textTransform: 'none',
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
    secondary: colors.grayMid,
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
              fontFamily: 'Aeonik-Regular',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 400,
              src: "local('Aeonik-Regular'), local('Aeonik Regular')",
            },
            {
              fontFamily: 'Voyager-Thin',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 200,
              src: "local('Voyager-Thin'), local('Voyager Thin')",
            },
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
          // Custom scrollbar for mouse/trackpad only. Touch screens scroll by swiping, so the page scrollbar is
          // hidden there entirely (styling it would otherwise replace the phone's own auto-hiding overlay bar).
          '@media (hover: hover) and (pointer: fine)': {
            '::-webkit-scrollbar': {
              width: '10px',
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: baseTheme.palette.background.default,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: baseTheme.palette.text.primary,
            },
          },
          '@media (pointer: coarse)': {
            html: {
              scrollbarWidth: 'none',
            },
            '::-webkit-scrollbar': {
              display: 'none',
            },
          },
          '*:focus-visible': {
            outline: `2px solid ${baseTheme.palette.text.primary}`,
            outlineOffset: '3px',
          },
          // Chunky, Figma-style cursors (mouse only). !important beats the cursor rules MUI sets per component.
          '@media (pointer: fine)': {
            body: {
              cursor: CURSOR_ARROW,
            },
            [CLICKABLE]: {
              cursor: `${CURSOR_HAND} !important`,
            },
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
