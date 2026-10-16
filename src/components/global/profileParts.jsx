import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
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
const CIVIC_BLUE = { light: '#2B8FD6', dark: '#8CCBFF' };
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

export const StatusDot = styled('span')(() => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  margin: '0 calc(1.4em - 8px) 1px 0',
  borderRadius: '50%',
  backgroundColor: '#2EA043',
  verticalAlign: 'middle',
}));

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
