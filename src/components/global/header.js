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
  overflow: 'hidden',
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

const HomeButton = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  border: 'none',
  padding: 0,
}));

const NameMark = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '0.04em',
  fontSize: '1.5rem',
  color: 'inherit',
}));

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
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
    padding: theme.spacing(0.65),
    minWidth: '2.5rem',
    minHeight: '2.5rem',
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
      fontSize: '1.6rem',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '2.9rem',
      minHeight: '2.9rem',
      '& svg': {
        fontSize: '1.82rem',
      },
    },
  };
});

const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
    rowGap: theme.spacing(1),
  },
}));

const NavItem = styled(NavLink)(({ theme }) => {
  const hoverBorderColor =
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

  return {
    color: theme.palette.text.primary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: '0.72rem',
    fontWeight: 600,
    border: `1px solid transparent`,
    borderRadius: '5px',
    padding: theme.spacing(0.7, 1.05),
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: hoverBorderColor,
    },
    '&:focus-visible': {
      borderColor: hoverBorderColor,
      outlineOffset: '2px',
    },
  };
});

const ExternalLink = styled('a')(({ theme }) => {
  const hoverBorderColor =
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

  return {
    color: theme.palette.text.primary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: '0.72rem',
    fontWeight: 600,
    border: `1px solid transparent`,
    borderRadius: '5px',
    padding: theme.spacing(0.7, 1.05),
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: hoverBorderColor,
    },
    '&:focus-visible': {
      borderColor: hoverBorderColor,
      outlineOffset: '2px',
    },
  };
});

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
            <HomeButton to="/" aria-label="Go to home page">
              <NameMark>NR</NameMark>
            </HomeButton>
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
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/photography">Photography</NavItem>
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
              aria-pressed={mode === 'dark'}
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
