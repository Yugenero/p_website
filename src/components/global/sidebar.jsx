import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../animations/themeToggle';
import { profile } from '../../data/profile';

// The site's frame: a fixed left column with who Nelson is, how to reach him, a live local clock, and the
// page nav pinned to the bottom. Text is two-tone: grey for the connecting words, primary for what matters.
// On phones it becomes a block at the top: the full profile on the home page, just name + nav elsewhere.

export const SIDEBAR_WIDTH = 'clamp(300px, 26vw, 400px)';
const MONO_FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/photography', label: 'Photography', locked: !profile.photographyOpen },
  { to: '/blog', label: 'Writing', locked: true },
];

// Plain-text socials, stacked. On hover each takes its brand's color (Instagram its gradient) with a thin
// underline drawing in from the left. Brand colors here are the one deliberate exception to the monochrome rule.
const SOCIALS = [
  { label: 'LinkedIn', href: profile.linkedin, brand: 'linkedin' },
  { label: 'GitHub', href: profile.github, brand: 'github' },
  { label: 'Instagram', href: profile.instagram, brand: 'instagram' },
];

const BRAND = {
  // LinkedIn's lighter blue in dark mode; their #0A66C2 is too dim on black.
  linkedin: { light: '#0A66C2', dark: '#70B5F9' },
  // GitHub's own greens: light green in dark mode; a deeper one in light mode so it stays readable on off-white.
  github: { light: '#2DA44E', dark: '#7EE787' },
};
// Email turns light red on hover (softer on black, deeper on off-white so it stays readable).
const EMAIL_RED = { light: '#D9473F', dark: '#FF8A80' };
// Georgia Tech CS turns Tech Gold on hover (GT's Tech Dark Gold in light mode; Tech Gold is too pale on off-white).
const TECH_GOLD = { light: '#857437', dark: '#B3A369' };
const INSTAGRAM_GRADIENT = 'linear-gradient(90deg, #F58529, #DD2A7B 45%, #8134AF 75%, #515BD4)';

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

// Nelson's local time, ticking every second.
const LocalClock = () => {
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

export const Sidebar = ({ mode, onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const showProfile = !isMobile || pathname === '/';

  return (
    <SidebarRoot>
      <Box>
        <TopRow>
          <NameWrap>
            <NameLink to="/">{profile.name}</NameLink>
            <NameTip aria-hidden="true">that's me :)</NameTip>
          </NameWrap>
          {isMobile && <ThemeToggle mode={mode} onClick={onToggleTheme} />}
        </TopRow>

        {showProfile && (
          <>
            <Tagline>
              {profile.tagline.join(' · ')}
              <br />
              <Underlined
                href={profile.school.href}
                target="_blank"
                rel="noopener noreferrer"
                data-tone="school"
              >
                {profile.school.label}
              </Underlined>
            </Tagline>
            <Bio>{profile.bio}</Bio>

            <Block>
              <Label>now</Label>
              <Line>
                <Arrow aria-hidden="true">→</Arrow>
                {profile.role} at{' '}
                <Strong as="a" href={profile.companyUrl} target="_blank" rel="noopener noreferrer">
                  {profile.company}
                </Strong>
              </Line>
              {profile.openToWork && (
                <Line>
                  <StatusDot aria-hidden="true" />
                  <Strong>Open to new roles</Strong>
                </Line>
              )}
            </Block>

            <Line>
              Previously at{' '}
              {profile.previously.map((name, i) => (
                <span key={name}>
                  <Strong>{name}</Strong>
                  {i < profile.previously.length - 1 ? ', ' : ''}
                </span>
              ))}
            </Line>

            <Block>
              <Line>
                Reach out via{' '}
                <Underlined href={`mailto:${profile.email}`} data-tone="email">
                  email
                </Underlined>, or read my{' '}
                <Underlined href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  resume
                </Underlined>
              </Line>
              <Socials>
                {SOCIALS.map((social) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-brand={social.brand}
                  >
                    {social.label}
                  </SocialLink>
                ))}
              </Socials>
            </Block>

            <ClockRow>
              <LocalClock />
            </ClockRow>
          </>
        )}
      </Box>

      <BottomRow>
        <Nav aria-label="Main">
          {NAV.map((item) =>
            item.locked ? (
              <NavItemLocked key={item.to} aria-disabled="true">
                {item.label}
                <Soon>soon</Soon>
              </NavItemLocked>
            ) : (
              <NavItem key={item.to} to={item.to} end={item.end}>
                <Marker aria-hidden="true" />
                {item.label}
              </NavItem>
            ),
          )}
        </Nav>
        {!isMobile && <ThemeToggle mode={mode} onClick={onToggleTheme} tipPlacement="top" />}
      </BottomRow>
    </SidebarRoot>
  );
};

const SidebarRoot = styled('aside')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  flexShrink: 0,
  width: SIDEBAR_WIDTH,
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(5),
  padding: theme.spacing(4),
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  fontSize: '1rem',
  lineHeight: 1.55,
  color: theme.palette.text.secondary,
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    overflowY: 'visible',
    gap: theme.spacing(3),
    padding: theme.spacing(2.5, 2, 2),
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const TopRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
}));

// Hovering the name turns it brushed chrome and sweeps a highlight across it once, and shows a small note.
// Grey-scale only (no accent color); the stops are tuned per theme so the metal reads on both backgrounds.
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

const NameWrap = styled('span')(() => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  '@media (hover: hover)': {
    '&:hover > [aria-hidden]': {
      opacity: 1,
      transform: 'translate(0, -50%)',
    },
  },
  '&:has(a:focus-visible) > [aria-hidden]': {
    opacity: 1,
    transform: 'translate(0, -50%)',
  },
}));

const NameLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-block',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: '1.75rem',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  // Room for the "g" descender, which gradient text would otherwise clip; the margin cancels it in layout.
  paddingBottom: '0.15em',
  marginBottom: '-0.15em',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  backgroundImage: METAL[theme.palette.mode] ?? METAL.light,
  backgroundSize: '200% 100%',
  backgroundPosition: '100% 0',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  '@media (hover: hover)': {
    '&:hover': {
      color: 'transparent',
      animation: `${metalSweep} 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
    },
  },
  '&:focus-visible': {
    color: 'transparent',
    animation: `${metalSweep} 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&:hover, &:focus-visible': {
      animation: 'none',
      backgroundPosition: '40% 0',
    },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

// Same look as the theme toggle's hover label: inverted colors, square, small sans.
const NameTip = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: `calc(100% + ${theme.spacing(1.5)})`,
  top: '50%',
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.75, 1.25),
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.8rem',
  fontWeight: 500,
  lineHeight: 1.2,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  opacity: 0,
  transform: 'translate(-4px, -50%)',
  transition: 'opacity 0.15s ease, transform 0.15s ease',
  pointerEvents: 'none',
  zIndex: theme.zIndex.tooltip,
}));

const Tagline = styled('p')(({ theme }) => ({
  margin: theme.spacing(0.75, 0, 0),
}));

const Bio = styled('p')(({ theme }) => ({
  margin: theme.spacing(3, 0, 0),
  maxWidth: '34ch',
}));

const Block = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  '& + p': {
    marginTop: theme.spacing(1.5),
  },
}));

const Label = styled('p')(({ theme }) => ({
  margin: theme.spacing(0, 0, 0.5),
}));

const Line = styled('p')(() => ({
  margin: 0,
}));

const Arrow = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: '1.4em',
  color: theme.palette.text.secondary,
}));

const Strong = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  'a&:hover': {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
}));

const StatusDot = styled('span')(() => ({
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
const Underlined = styled('a')(({ theme }) => ({
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
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&::after': { transition: 'none' },
  },
}));

const Socials = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(2),
}));

const SocialLink = styled('a')(({ theme }) => {
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

const ClockRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

const ClockLine = styled('p')(({ theme }) => ({
  margin: 0,
  '& time': {
    fontFamily: MONO_FONT,
    fontSize: '0.92em',
    fontVariantNumeric: 'tabular-nums',
    color: theme.palette.text.primary,
  },
}));

// Nav on the left, theme toggle bottom-right (desktop; on phones the toggle sits beside the name).
const BottomRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

const Nav = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1, 2.5),
  },
}));

// Current page gets a small filled square in front of it.
const Marker = styled('span')(({ theme }) => ({
  display: 'none',
  width: 9,
  height: 9,
  marginRight: theme.spacing(1.5),
  backgroundColor: theme.palette.text.primary,
  flexShrink: 0,
}));

const NavItem = styled(NavLink)(({ theme }) => ({
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
  [theme.breakpoints.down('md')]: {
    minHeight: 32,
  },
}));

const NavItemLocked = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  width: 'fit-content',
  fontSize: '1.05rem',
  color: theme.palette.text.disabled,
  cursor: 'default',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Soon = styled('span')(({ theme }) => ({
  fontFamily: MONO_FONT,
  fontSize: '0.72rem',
  color: theme.palette.text.disabled,
}));
