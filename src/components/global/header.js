import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { ThemeToggle } from '../animations/themeToggle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from '../ui/primitives';
import { profile } from '../../data/profile';
import { CrossRule } from '../ui/crossRule';

const HeaderBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.default,
  overflow: 'visible',
}));

// Above the header rule (zIndex 1) so popups like the theme toggle's label sit on top of the line.
const HeaderToolbar = styled(Toolbar)(() => ({
  position: 'relative',
  zIndex: 2,
}));

// Bottom edge of the header: the same "+"-capped hairline that closes the landing hero.
const HeaderRule = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const HeaderInner = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  flexWrap: 'wrap',
  maxWidth: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    paddingBottom: 0,
  },
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between',
  },
}));

// Name in the serif display face, linking home; the social links live in the footer.
const NameLink = styled(NavLink)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: '1.45rem',
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.35rem',
  },
}));

// On phones the nav becomes a full-bleed, horizontally swipeable strip with larger tap targets.
const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  // Thin vertical hairlines between the nav items (and before the theme toggle).
  '& > *': {
    position: 'relative',
  },
  '& > * + *::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    height: '1.1em',
    width: '1px',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.divider,
    pointerEvents: 'none',
  },
  // The toggle keeps a little air after its separator.
  '& > *:last-child:not(a)': {
    marginLeft: theme.spacing(1.5),
    '&::before': {
      left: theme.spacing(-1.5),
    },
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    margin: theme.spacing(0, -2),
    padding: theme.spacing(0.5, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
    scrollSnapType: 'x proximity',
    scrollPaddingInline: theme.spacing(2),
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // Fade the right edge so it reads as "more to swipe".
    maskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
  },
}));

const navLinkStyles = (theme) => ({
  color: theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  textDecoration: 'none',
  fontFamily: theme.typography.fontFamily,
  letterSpacing: '0.01em',
  fontSize: '0.95rem',
  fontWeight: 400,
  border: 'none',
  borderRadius: 0,
  padding: theme.spacing(0.65, 1.75),
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: theme.spacing(1.75),
    right: theme.spacing(1.75),
    bottom: theme.spacing(0.45),
    height: '1px',
    backgroundColor: theme.palette.text.primary,
    transform: 'scaleX(0)',
    transformOrigin: 'left center',
    transition: 'transform 0.22s ease',
    opacity: 0.9,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&::after': {
      transform: 'scaleX(1)',
    },
  },
  '&:focus-visible': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    outlineOffset: '2px',
    '&::after': {
      transform: 'scaleX(1)',
    },
  },
  [theme.breakpoints.down('md')]: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    scrollSnapAlign: 'start',
    minHeight: 44,
    padding: theme.spacing(1, 1.75),
    fontSize: '1rem',
    fontWeight: 400,
    color: theme.palette.text.secondary,
    '&::after': {
      left: theme.spacing(1.75),
      right: theme.spacing(1.75),
      bottom: theme.spacing(0.75),
    },
    // Current page stays underlined so it's clear where you are in the strip.
    '&.active': {
      color: theme.palette.text.primary,
      '&::after': {
        transform: 'scaleX(1)',
      },
    },
  },
});

const NavItem = styled(NavLink)(({ theme }) => navLinkStyles(theme));

const ExternalLink = styled('a')(({ theme }) => navLinkStyles(theme));

const WritingItemWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover [data-writing-popup], &:focus-within [data-writing-popup]': {
    opacity: 1,
    transform: 'translate(-50%, 0)',
    pointerEvents: 'auto',
  },
}));

const WritingPopup = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: `calc(100% + ${theme.spacing(1.4)})`,
  left: '50%',
  transform: 'translate(-50%, -6px)',
  opacity: 0,
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: '5px',
  padding: theme.spacing(0.9, 1.2),
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.78rem',
  letterSpacing: '0.05em',
  fontWeight: 600,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  boxShadow: `0 10px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)'}`,
  transition: 'opacity 180ms ease, transform 180ms ease',
  zIndex: theme.zIndex.tooltip,
}));

export const Header = ({ mode, onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const headerRef = useRef(null);

  // Publish the header's height as --header-height so full-screen sections can size around it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;
    const publish = () =>
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    publish();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Keep the current page's link in view inside the mobile scroll strip.
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector('a.active');
    if (!isMobile || !nav || !active) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nav.scrollTo({
      left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [pathname, isMobile]);

  const themeToggle = <ThemeToggle mode={mode} onClick={onToggleTheme} />;

  return (
    <HeaderBar ref={headerRef} position="sticky" elevation={0}>
      <HeaderToolbar disableGutters>
        <HeaderInner>
          <HeaderLeft>
            <NameLink to="/" aria-label={`${profile.name}, home`}>
              {profile.name}
            </NameLink>
            {isMobile && themeToggle}
          </HeaderLeft>
          <NavGroup component="nav" aria-label="Main" ref={navRef}>
            <NavItem to="/" end>
              Home
            </NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/work">Experience</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/photography">Photography</NavItem>
            <WritingItemWrap>
              <NavItem
                to="/blog"
                onClick={(event) => {
                  event.preventDefault();
                }}>
                Writing
              </NavItem>
              <WritingPopup data-writing-popup>page under construction</WritingPopup>
            </WritingItemWrap>
            <ExternalLink
              href="/documents/NelsonRodriguez.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </ExternalLink>
            {!isMobile && themeToggle}
          </NavGroup>
        </HeaderInner>
      </HeaderToolbar>
      <HeaderRule>
        <CrossRule />
      </HeaderRule>
    </HeaderBar>
  );
};
