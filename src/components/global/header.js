import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ThemeToggle } from '../animations/themeToggle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from '../ui/primitives';
import Starfield from './starfield';

const HeaderBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.default,
  overflow: 'visible',
}));

const HeaderToolbar = styled(Toolbar)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const HeaderStarfield = styled(Starfield)(() => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
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

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.35),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(0.75),
    marginLeft: -10, // optically align the first icon with the page gutter
  },
}));

const SocialLink = styled('a')(({ theme }) => {
  const hoverBorderColor =
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

  return {
    color: theme.palette.text.disabled,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    border: `1px solid transparent`,
    borderRadius: 0,
    padding: theme.spacing(0.2),
    minWidth: '1.8rem',
    minHeight: '1.8rem',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      borderColor: hoverBorderColor,
      color: hoverBorderColor,
    },
    '&:focus-visible': {
      borderColor: hoverBorderColor,
      color: hoverBorderColor,
      outlineOffset: '2px',
    },
    '& svg': {
      fontSize: '1.1rem',
    },
    // Larger icons and 44px tap targets on phones.
    [theme.breakpoints.down('md')]: {
      minWidth: 44,
      minHeight: 44,
      '& svg': {
        fontSize: '1.6rem',
      },
    },
  };
});

// On phones the nav becomes a full-bleed, horizontally swipeable strip with larger tap targets.
const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    flexWrap: 'nowrap',
    gap: theme.spacing(0.5),
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
  letterSpacing: '0.02em',
  fontSize: '0.92rem',
  fontWeight: 600,
  border: 'none',
  borderRadius: '5px',
  padding: theme.spacing(0.65, 0.9),
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: theme.spacing(1.05),
    right: theme.spacing(1.05),
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
    padding: theme.spacing(1, 1.5),
    fontSize: '1.05rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    color: theme.palette.text.secondary,
    '&::after': {
      left: theme.spacing(1.5),
      right: theme.spacing(1.5),
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
  const nextModeLabel = mode === 'light' ? 'dark' : 'light';
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

  const themeToggle = (
    <ThemeToggle
      onClick={onToggleTheme}
      aria-label={`Switch to ${nextModeLabel} mode`}
      data-mode={mode}
    >
      <span className="toggle-thumb" aria-hidden="true" />
    </ThemeToggle>
  );

  return (
    <HeaderBar ref={headerRef} position="sticky" elevation={0}>
      {theme.palette.mode === 'dark' && (
        <HeaderStarfield
          density={4}
          color={theme.palette.text.primary}
          backgroundStops={['transparent', 'transparent']}
          maxDrift={0.35}
          ultraSubtle
          style={{ opacity: 0.24 }}
          forceWhite={true}
        />
      )}
      <HeaderToolbar disableGutters>
        <HeaderInner>
          <HeaderLeft>
            <SocialList>
              <SocialLink href="mailto:neroxv1313@gmail.com" aria-label="Email">
                <EmailRoundedIcon />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/nelson-rodriguez13/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink
                href="https://github.com/Yugenero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/ne.ro.x/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>
            </SocialList>
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
    </HeaderBar>
  );
};
