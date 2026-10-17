import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../animations/themeToggle';
import Starfield from './starfield';
import { CursorTip } from './cursorTip';
import { profile } from '../../data/profile';
import {
  Arrow,
  LocalClock,
  Marker,
  metalOn,
  metalText,
  NAV,
  NavItem,
  NavItemLocked,
  SOCIALS,
  SocialLink,
  Socials,
  Soon,
  OpenToWorkLink,
  StatusArrow,
  Strong,
  Underlined,
} from './profileParts';

// The site's frame: a fixed left column with who Nelson is, how to reach him, a live local clock, and the
// page nav pinned to the bottom. Text is two-tone: grey for the connecting words, primary for what matters.
// Desktop only (md and up); phones get mobileHeader.jsx instead. Shared pieces live in profileParts.jsx.

export const SIDEBAR_WIDTH = 'clamp(300px, 26vw, 400px)';

// Sidebar text scales with the window so the column fits without scrolling: it shrinks as the window narrows
// (the column stops shrinking at 300px, so its text has to) and as it gets shorter, from 1rem down to 0.75rem.
// Spacing is in em (8px steps at the 15px base) so gaps shrink along with the text.
const SIDEBAR_FONT_SIZE = 'clamp(0.75rem, min(calc(0.6rem + 0.45vw), 1.65vh), 1rem)';
const em = (n) => `${+((n * 8) / 15).toFixed(3)}em`;

export const Sidebar = ({ mode, onToggleTheme }) => {
  return (
    <SidebarRoot>
      <Starfield />
      <Box>
        <TopRow>
          <CursorTip label="that's me :)">
            <NameLink to="/">{profile.name}</NameLink>
          </CursorTip>
        </TopRow>

        <Tagline>{profile.tagline.join(' · ')}</Tagline>
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
              <StatusArrow />
              <OpenToWorkLink />
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
          <SidebarSocials>
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
          </SidebarSocials>
        </Block>

        <ClockRow>
          <LocalClock />
        </ClockRow>
      </Box>

      <Footer>
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
          <ThemeToggle mode={mode} onClick={onToggleTheme} />
        </BottomRow>
        <BuiltWith>
          Built from scratch with {profile.builtWith.slice(0, -1).join(', ')} and {profile.builtWith.at(-1)}
        </BuiltWith>
      </Footer>
    </SidebarRoot>
  );
};

const SidebarRoot = styled('aside')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  flexShrink: 0,
  width: SIDEBAR_WIDTH,
  height: '100vh',
  // Fallback for very short windows, where even the smallest text doesn't fit: scroll, but without a bar
  // (it showed up as a stripe between the sidebar and the page).
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: em(5),
  padding: em(4),
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  fontSize: SIDEBAR_FONT_SIZE,
  lineHeight: 1.55,
  color: theme.palette.text.secondary,
  zIndex: 2,
  // Content above the dark-mode starfield.
  '& > *:not([data-starfield])': {
    position: 'relative',
    zIndex: 1,
  },
}));

const TopRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
}));

// Hovering the name turns it brushed chrome and sweeps a highlight across it once (metalText / metalOn in
// profileParts.jsx), and a "that's me :)" tag follows the cursor (CursorTip).

const NameLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-block',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: '1.75em',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  ...metalText(theme),
  '@media (hover: hover)': {
    '&:hover': metalOn,
  },
  '&:focus-visible': metalOn,
}));

const Tagline = styled('p')(({ theme }) => ({
  margin: `${em(0.75)} 0 0`,
}));

const Bio = styled('p')(({ theme }) => ({
  margin: `${em(3)} 0 0`,
  maxWidth: '34ch',
}));

const Block = styled(Box)(({ theme }) => ({
  marginTop: em(3.5),
  display: 'flex',
  flexDirection: 'column',
  gap: em(0.5),
  '& + p': {
    marginTop: em(1.5),
  },
}));

const Label = styled('p')(({ theme }) => ({
  margin: `0 0 ${em(0.5)}`,
}));

const Line = styled('p')(() => ({
  margin: 0,
}));



const ClockRow = styled(Box)(({ theme }) => ({
  marginTop: em(3.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));


// Nav + toggle, with the small "built with" note under them.
const Footer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: em(2),
}));

const BuiltWith = styled('p')(() => ({
  margin: 0,
  fontSize: '0.78em',
  lineHeight: 1.4,
}));

// Nav on the left, theme toggle bottom-right.
const BottomRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

const SidebarSocials = styled(Socials)(() => ({
  gap: em(0.5),
  marginTop: em(2),
}));

// The shared nav items are sized in rem for the phone menu; here they follow the sidebar's scaled text.
const Nav = styled('nav')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: em(0.75),
  '& > a, & > span': {
    fontSize: '1.05em',
  },
  // Links slide a little to the right on hover or keyboard focus. The current page doesn't: clicking a link shows its
  // square and the link settles back into place. Locked items stay put.
  '& > a': {
    transition: 'color 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  '@media (hover: hover)': {
    '& > a:not(.active):hover': {
      transform: 'translateX(0.4em)',
    },
  },
  '& > a:not(.active):focus-visible': {
    transform: 'translateX(0.4em)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& > a': { transition: 'color 0.2s ease' },
  },
  '& > a > span': {
    width: '0.6em',
    height: '0.6em',
    marginRight: em(1.5),
  },
  '& > span > span': {
    fontSize: '0.69em',
  },
}));

