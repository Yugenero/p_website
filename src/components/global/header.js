import { NavLink as RouterNavLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '../ui/primitives';

const HeaderBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1200,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 0),
}));

const NavList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
  margin: 0,
}));

const NavItem = styled(RouterNavLink)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  transition: 'opacity 0.2s ease, text-decoration-color 0.2s ease',
  '&:hover': {
    opacity: 0.7,
    textDecoration: 'underline',
    textDecorationThickness: '2px',
  },
  '&.active': {
    textDecoration: 'underline',
    textDecorationThickness: '2px',
  },
}));

export const Header = () => {
  return (
    <HeaderBar component="header">
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
          <Typography variant="subtitle2" component="div">
            Nelson Rodriguez
          </Typography>
          <nav aria-label="Primary navigation">
            <NavList direction="row" component="ul">
              <li>
                <NavItem to="/" end>
                  Home
                </NavItem>
              </li>
              <li>
                <NavItem to="/about">About</NavItem>
              </li>
              <li>
                <NavItem to="/work">Work</NavItem>
              </li>
              <li>
                <NavItem to="/projects">Projects</NavItem>
              </li>
            </NavList>
          </nav>
        </Stack>
      </Container>
    </HeaderBar>
  );
};
