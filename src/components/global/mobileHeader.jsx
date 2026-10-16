import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
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
  Soon,
  StatusDot,
  Strong,
  Underlined,
} from './profileParts';

// Phones (below md): a compact sticky bar (name, theme toggle, menu button) so content starts right away, and a
// full-screen menu holding everything the desktop sidebar shows. The menu closes on navigation, Escape, or the
// button; the page behind it doesn't scroll while it's open, and focus moves into it and back out.

export const MOBILE_BAR_HEIGHT = 56;

export const MobileHeader = ({ mode, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Close whenever the route changes (tapping a nav link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: lock page scroll, close on Escape, and move focus into the menu.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <Bar>
        <NameLink to="/">{profile.name}</NameLink>
        <Actions>
          <ThemeToggle mode={mode} onClick={onToggleTheme} />
          <MenuButton
            ref={buttonRef}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-open={open || undefined}
          >
            <span />
            <span />
          </MenuButton>
        </Actions>
      </Bar>

      <Menu id="site-menu" ref={menuRef} data-open={open || undefined} aria-hidden={!open} inert={open ? undefined : ''}>
        <MenuNav aria-label="Main">
          {NAV.map((item) =>
            item.locked ? (
              <MenuItemLocked key={item.to} aria-disabled="true">
                {item.label}
                <Soon>soon</Soon>
              </MenuItemLocked>
            ) : (
              <MenuItem key={item.to} to={item.to} end={item.end}>
                <Marker aria-hidden="true" />
                {item.label}
              </MenuItem>
            ),
          )}
        </MenuNav>

        <Details>
          <Line>
            <Arrow aria-hidden="true">→</Arrow>
            {profile.role} at{' '}
            <Underlined href={profile.companyUrl} target="_blank" rel="noopener noreferrer" data-tone="fullstory">
              {profile.company}
            </Underlined>
          </Line>
          {profile.openToWork && (
            <Line>
              <StatusDot aria-hidden="true" />
              <Strong>Open to new roles</Strong>
            </Line>
          )}
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
          <Line>
            <Underlined href={profile.school.href} target="_blank" rel="noopener noreferrer" data-tone="school">
              {profile.school.label}
            </Underlined>
          </Line>
        </Details>

        <Contact>
          <Underlined href={`mailto:${profile.email}`} data-tone="email">
            Email
          </Underlined>
          <Underlined href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </Underlined>
        </Contact>
        <Contact>
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
        </Contact>

        <LocalClock />
      </Menu>
    </>
  );
};

const Bar = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  height: MOBILE_BAR_HEIGHT,
  padding: theme.spacing(0, 2),
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NameLink = styled(NavLink)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: '1.4rem',
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}));

const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// Two bars that cross into an X when the menu is open. Same square, hairline look as the theme toggle.
const MenuButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: 44,
  height: 44,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  '& > span': {
    position: 'absolute',
    left: 12,
    right: 12,
    height: 1.5,
    backgroundColor: 'currentColor',
    transition: 'transform 0.25s ease',
  },
  '& > span:first-of-type': {
    transform: 'translateY(-4px)',
  },
  '& > span:last-of-type': {
    transform: 'translateY(4px)',
  },
  '&[data-open] > span:first-of-type': {
    transform: 'rotate(45deg)',
  },
  '&[data-open] > span:last-of-type': {
    transform: 'rotate(-45deg)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.text.primary}`,
    outlineOffset: 2,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& > span': { transition: 'none' },
  },
}));

const Menu = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: MOBILE_BAR_HEIGHT,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndex.appBar - 1,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(1, 2, 4),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  lineHeight: 1.55,
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-8px)',
  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s',
  '&[data-open]': {
    opacity: 1,
    visibility: 'visible',
    transform: 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0s',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    transform: 'none',
    '&[data-open]': { transition: 'none' },
  },
}));

const MenuNav = styled('nav')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

// Big rows with hairlines between them: easy to hit with a thumb.
const menuRow = (theme) => ({
  width: '100%',
  minHeight: 56,
  fontSize: '1.5rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
});

const MenuItem = styled(NavItem)(({ theme }) => menuRow(theme));

const MenuItemLocked = styled(NavItemLocked)(({ theme }) => ({
  ...menuRow(theme),
  alignItems: 'center',
}));

const Details = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
}));

const Line = styled('p')(() => ({
  margin: 0,
}));

// One row for email + resume, one for the socials.
const Contact = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5, 3),
  '& + &': {
    marginTop: theme.spacing(-2.5), // pull the socials row closer to the contact row than the Menu gap would
  },
}));
