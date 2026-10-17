import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { profile } from '../../data/profile';

// Pieces shared by the desktop sidebar (sidebar.jsx) and the phone header/menu (mobileHeader.jsx), so the two
// layouts can't drift apart: nav items, socials, inline links with their hover colors, the clock, small labels.

export const MONO_FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/photography', label: 'Photography', locked: !profile.photographyOpen },
  { to: '/blog', label: 'Writing', locked: true },
];

// Plain-text socials, stacked. On hover each takes its brand's color (Instagram its gradient) with a thin
// underline drawing in from the left. Brand colors here are the one deliberate exception to the monochrome rule.
export const SOCIALS = [
  { label: 'LinkedIn', href: profile.linkedin, brand: 'linkedin' },
  { label: 'GitHub', href: profile.github, brand: 'github' },
  { label: 'Instagram', href: profile.instagram, brand: 'instagram' },
];

// Brushed chrome text: grey-scale banded gradient clipped to the text, with a bright streak that sweeps across once
// when it turns on. Used by the sidebar name and the home feed's project titles. Grey-scale only (no accent
// color); the stops are tuned per theme so the metal reads on both backgrounds.
const METAL = {
  // Banded reflections with a narrow specular streak at ~49%; the sweep carries the streak from the first
  // letter to the last. Light mode tops out at mid-grey so letters never fade into the off-white page.
  dark: 'linear-gradient(105deg, #7a7a7a 0%, #d6d6d6 18%, #8a8a8a 32%, #9a9a9a 42%, #ffffff 47.5%, #ffffff 50%, #8c8c8c 56%, #cfcfcf 72%, #6e6e6e 88%, #bdbdbd 100%)',
  light: 'linear-gradient(105deg, #2b2b2b 0%, #7c7c7c 18%, #1f1f1f 32%, #3a3a3a 42%, #a6a6a6 47.5%, #a6a6a6 50%, #333333 56%, #6e6e6e 72%, #151515 88%, #4a4a4a 100%)',
};

const metalSweep = keyframes`
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
`;

// Base styles: the gradient sits under the text, hidden while the text color is solid.
export const metalText = (theme) => ({
  backgroundImage: METAL[theme.palette.mode] ?? METAL.light,
  backgroundSize: '200% 100%',
  backgroundPosition: '100% 0',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  // Room for descenders, which gradient text would otherwise clip; the margin cancels it in layout.
  paddingBottom: '0.15em',
  marginBottom: '-0.15em',
});

// Turned on (hover/focus): the text goes transparent to show the metal, and the streak sweeps once. With reduced
// motion the chrome shows without the sweep.
export const metalOn = {
  color: 'transparent',
  animation: `${metalSweep} 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
    backgroundPosition: '40% 0',
  },
};

export const BRAND = {
  // LinkedIn's lighter blue in dark mode; their #0A66C2 is too dim on black.
  linkedin: { light: '#0A66C2', dark: '#70B5F9' },
  // GitHub's own greens: light green in dark mode; a deeper one in light mode so it stays readable on off-white.
  github: { light: '#2DA44E', dark: '#7EE787' },
};
// Email turns light red on hover (softer on black, deeper on off-white so it stays readable).
export const EMAIL_RED = { light: '#D9473F', dark: '#FF8A80' };
// Georgia Tech CS turns Tech Gold on hover (GT's Tech Dark Gold in light mode; Tech Gold is too pale on off-white).
export const TECH_GOLD = { light: '#857437', dark: '#B3A369' };
// Fullstory turns a darker green on hover, text and underline: their #11AB85 in dark mode, and a deeper shade of
// their #059573 in light mode so it reads on off-white (both from fullstory.com's palette).
export const FULLSTORY_GREEN = { light: '#047A5E', dark: '#11AB85' };
// Civic Digital Experience turns light blue on hover (a deeper blue in light mode so it reads on off-white).
export const CIVIC_BLUE = { light: '#2B8FD6', dark: '#8CCBFF' };
export const INSTAGRAM_GRADIENT = 'linear-gradient(90deg, #F58529, #DD2A7B 45%, #8134AF 75%, #515BD4)';

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

// Nelson's local time, ticking every second.
export const LocalClock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ClockLine>
      {profile.location} · <time dateTime={now.toISOString()}>{timeFormat.format(now)}</time>
    </ClockLine>
  );
};

export const Arrow = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: '1.4em',
  color: theme.palette.text.secondary,
}));

export const Strong = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
}));

// "Open to new roles": a green arrow (same slot as the role line's →) that pulses softly, brightening with a faint
// glow and easing back. Static with reduced motion.
const STATUS_GREEN = '#2EA043';

const statusPulse = keyframes`
  0%, 100% { opacity: 0.55; text-shadow: 0 0 0 transparent; }
  50% { opacity: 1; text-shadow: 0 0 6px rgba(46, 160, 67, 0.75); }
`;

const StatusArrowGlyph = styled('span')(() => ({
  display: 'inline-block',
  width: '1.4em',
  color: STATUS_GREEN,
  animation: `${statusPulse} 1.8s ease-in-out infinite`,
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
    opacity: 1,
  },
}));

export const StatusArrow = () => <StatusArrowGlyph aria-hidden="true">→</StatusArrowGlyph>;

// "Open to new roles" links to Nelson's LinkedIn (LinkedIn blue + underline on hover, like the other inline links).
export const OpenToWorkLink = () => (
  <Underlined href={profile.linkedin} target="_blank" rel="noopener noreferrer" data-tone="linkedin">
    Open to new roles
  </Underlined>
);

// Inline links (school, email, resume): full-strength text with a thin underline that draws in from the left
// on hover, like the socials. `data-tone="email"` also turns the link light red.
export const Underlined = styled('a')(({ theme }) => ({
  position: 'relative',
  // One line per link: the underline is drawn against the link's box, which breaks if the text wraps.
  whiteSpace: 'nowrap',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 1,
    height: 1,
    backgroundColor: 'currentColor',
    transform: 'scaleX(0)',
    transformOrigin: 'left center',
    transition: 'transform 0.25s ease',
  },
  '&:hover::after, &:focus-visible::after': {
    transform: 'scaleX(1)',
  },
  '&[data-tone="email"]:hover, &[data-tone="email"]:focus-visible': {
    color: EMAIL_RED[theme.palette.mode] ?? EMAIL_RED.light,
  },
  '&[data-tone="school"]:hover, &[data-tone="school"]:focus-visible': {
    color: TECH_GOLD[theme.palette.mode] ?? TECH_GOLD.light,
  },
  '&[data-tone="civic"]:hover, &[data-tone="civic"]:focus-visible': {
    color: CIVIC_BLUE[theme.palette.mode] ?? CIVIC_BLUE.light,
  },
  '&[data-tone="linkedin"]:hover, &[data-tone="linkedin"]:focus-visible': {
    color: BRAND.linkedin[theme.palette.mode] ?? BRAND.linkedin.light,
  },
  '&[data-tone="fullstory"]:hover, &[data-tone="fullstory"]:focus-visible': {
    color: FULLSTORY_GREEN[theme.palette.mode] ?? FULLSTORY_GREEN.light,
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&::after': { transition: 'none' },
  },
}));

export const Socials = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(2),
}));

export const SocialLink = styled('a')(({ theme }) => {
  const { mode } = theme.palette;
  const brandHover = (color) => ({
    color,
    '&::after': { transform: 'scaleX(1)', backgroundColor: color },
  });

  return {
    position: 'relative',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 1,
      height: 1,
      backgroundColor: 'currentColor',
      transform: 'scaleX(0)',
      transformOrigin: 'left center',
      transition: 'transform 0.25s ease',
    },
    '&:hover, &:focus-visible': {
      '&[data-brand="linkedin"]': brandHover(BRAND.linkedin[mode]),
      '&[data-brand="github"]': brandHover(BRAND.github[mode]),
      '&[data-brand="instagram"]': {
        color: 'transparent',
        backgroundImage: INSTAGRAM_GRADIENT,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        '&::after': { transform: 'scaleX(1)', backgroundImage: INSTAGRAM_GRADIENT },
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&::after': { transition: 'none' },
    },
  };
});

const ClockLine = styled('p')(({ theme }) => ({
  margin: 0,
  '& time': {
    fontFamily: MONO_FONT,
    fontSize: '0.92em',
    fontVariantNumeric: 'tabular-nums',
    color: theme.palette.text.primary,
  },
}));

// Current page gets a small filled square in front of it.
export const Marker = styled('span')(({ theme }) => ({
  display: 'none',
  width: 9,
  height: 9,
  marginRight: theme.spacing(1.5),
  backgroundColor: theme.palette.text.primary,
  flexShrink: 0,
}));

export const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  fontSize: '1.05rem',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
    '& > span': {
      display: 'inline-block',
    },
  },
}));

export const NavItemLocked = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  width: 'fit-content',
  fontSize: '1.05rem',
  color: theme.palette.text.disabled,
  cursor: 'default',
}));

export const Soon = styled('span')(({ theme }) => ({
  fontFamily: MONO_FONT,
  fontSize: '0.72rem',
  color: theme.palette.text.disabled,
}));
