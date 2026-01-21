import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
}));

const BrandLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const BrandMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.72rem',
  fontWeight: 600,
  position: 'relative',
  '&[aria-current="page"]::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -6,
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.text.primary,
  },
}));

const ExternalLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.72rem',
  fontWeight: 600,
}));

const ThemeToggle = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
  minWidth: 'auto',
  fontSize: '0.7rem',
  borderRadius: '0.5rem',
}));

export const Header = ({ mode, onToggleTheme }) => {
  const nextModeLabel = mode === 'light' ? 'Dark' : 'Light';

  return (
    <HeaderBar position="sticky" elevation={0}>
      <Toolbar disableGutters>
        <HeaderInner>
          <Box>
            <BrandLink to="/">Nelson Rodriguez</BrandLink>
            <BrandMeta variant="body2">Software Engineer &amp; Systems Builder</BrandMeta>
          </Box>
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
              variant="outlined"
              onClick={onToggleTheme}
              aria-label={`Switch to ${nextModeLabel.toLowerCase()} mode`}
            >
              {nextModeLabel}
            </ThemeToggle>
          </NavGroup>
        </HeaderInner>
      </Toolbar>
    </HeaderBar>
  );
};
