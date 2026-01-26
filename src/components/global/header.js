import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ThemeToggle } from '../animations/themeToggle';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { Container } from '../ui/primitives';

const HeaderBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.default,
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

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
}));

const SocialLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.disabled,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    color: theme.palette.text.primary,
    transform: 'translateY(-1px)',
  },
  '& svg': {
    fontSize: '1.6rem',
  },
}));

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

const NavItem = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.72rem',
  fontWeight: 600,
  position: 'relative',
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -6,
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.text.primary,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.2s ease',
  },
  '&:hover': {
    color: theme.palette.text.secondary,
  },
  '&:hover::after, &[aria-current="page"]::after': {
    transform: 'scaleX(1)',
  },
  '&[aria-current="page"]': {
    color: theme.palette.text.primary,
  },
}));

const ExternalLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.72rem',
  fontWeight: 600,
  position: 'relative',
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -6,
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.text.primary,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.2s ease',
  },
  '&:hover': {
    color: theme.palette.text.secondary,
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
}));

export const Header = ({ mode, onToggleTheme }) => {
  const nextModeLabel = mode === 'light' ? 'dark' : 'light';

  return (
    <HeaderBar position="sticky" elevation={0}>
      <Toolbar disableGutters>
        <HeaderInner>
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
          </SocialList>
          <NavGroup>
            <NavItem to="/" end>
              Home
            </NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/work">Work</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/photography">Photography</NavItem>
            <ExternalLink
              href="/documents/NelsonRodriguez2025.pdf"
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
              <span className="toggle-track" aria-hidden="true" />
              <span className="toggle-thumb" aria-hidden="true">
                {mode === 'light' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </span>
            </ThemeToggle>
          </NavGroup>
        </HeaderInner>
      </Toolbar>
    </HeaderBar>
  );
};
