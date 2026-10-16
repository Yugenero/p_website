import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../animations/themeToggle';
import { profile } from '../../data/profile';
import {
  Arrow,
  LocalClock,
  Marker,
  NAV,
  NavItem,
  NavItemLocked,
  SOCIALS,
  SocialLink,
  Socials,
  Soon,
  StatusDot,
  Strong,
  Underlined,
} from './profileParts';

// The site's frame: a fixed left column with who Nelson is, how to reach him, a live local clock, and the
// page nav pinned to the bottom. Text is two-tone: grey for the connecting words, primary for what matters.
// Desktop only (md and up); phones get mobileHeader.jsx instead. Shared pieces live in profileParts.jsx.

export const SIDEBAR_WIDTH = 'clamp(300px, 26vw, 400px)';

export const Sidebar = ({ mode, onToggleTheme }) => {
  return (
    <SidebarRoot>
      <Box>
        <TopRow>
          <NameWrap>
            <NameLink to="/">{profile.name}</NameLink>
            <NameTip aria-hidden="true">that's me :)</NameTip>
          </NameWrap>
        </TopRow>

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
            <Underlined
              href={profile.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-tone="fullstory"
            >
              {profile.company}
            </Underlined>
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
          {profile.previously.map((job, i) => (
            <span key={job.name}>
              {job.href ? (
                <Underlined href={job.href} target="_blank" rel="noopener noreferrer" data-tone={job.tone}>
                  {job.name}
                </Underlined>
              ) : (
                <Strong>{job.name}</Strong>
              )}
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
        <ThemeToggle mode={mode} onClick={onToggleTheme} tipPlacement="top" />
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



const ClockRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));


// Nav on the left, theme toggle bottom-right.
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
}));

