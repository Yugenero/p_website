import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ThemeToggle } from '../animations/themeToggle';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
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
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  flexWrap: 'wrap',
}));

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.35),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(0.25),
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
    borderRadius: '5px',
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
    [theme.breakpoints.down('md')]: {
      minWidth: '2rem',
      minHeight: '2rem',
      '& svg': {
        fontSize: '1.2rem',
      },
    },
  };
});

const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(1.5),
    rowGap: theme.spacing(1),
  },
}));

const NavItem = styled(NavLink)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    letterSpacing: '0.04em',
    fontSize: '0.78rem',
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
}));

const ExternalLink = styled('a')(({ theme }) => ({
    color: theme.palette.text.primary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    letterSpacing: '0.04em',
    fontSize: '0.78rem',
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
}));

const WritingItemWrap = styled(Box)(() => ({
  position: 'relative',
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

  return (
    <HeaderBar position="sticky" elevation={0}>
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
          </HeaderLeft>
          <NavGroup>
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
            <ThemeToggle
              onClick={onToggleTheme}
              aria-label={`Switch to ${nextModeLabel} mode`}
               data-mode={mode}
            >
              <span className="toggle-thumb" aria-hidden="true" />
            </ThemeToggle>
          </NavGroup>
        </HeaderInner>
      </HeaderToolbar>
    </HeaderBar>
  );
};
