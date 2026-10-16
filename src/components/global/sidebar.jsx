import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
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
          <NameLink to="/">{profile.name}</NameLink>
          {isMobile && <ThemeToggle mode={mode} onClick={onToggleTheme} />}
        </TopRow>

        {showProfile && (
          <>
            <Tagline>{profile.tagline}</Tagline>
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
                Reach out via <Underlined href={`mailto:${profile.email}`}>email</Underlined>, or read my{' '}
                <Underlined href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  resume
                </Underlined>
              </Line>
              <Socials>
                <SocialLink href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </SocialLink>
                <SocialLink href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </SocialLink>
                <SocialLink href={profile.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </SocialLink>
              </Socials>
            </Block>

            <ClockRow>
              <LocalClock />
              {!isMobile && <ThemeToggle mode={mode} onClick={onToggleTheme} />}
            </ClockRow>
          </>
        )}
      </Box>

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

const NameLink = styled(NavLink)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: '1.75rem',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
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

const Underlined = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderBottomColor: theme.palette.text.primary,
  },
}));

const Socials = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5, 3),
  marginTop: theme.spacing(2),
}));

const SocialLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

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
