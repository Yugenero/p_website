import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../animations/themeToggle';
import Starfield from './starfield';
import { profile } from '../../data/profile';
import {
  Arrow,
  BRAND,
  EMAIL_RED,
  INSTAGRAM_GRADIENT,
  LocalClock,
  Marker,
  NAV,
  NavItem,
  NavItemLocked,
  SOCIALS,
  Soon,
  OpenToWorkLink,
  StatusArrow,
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
        <Starfield />
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
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 9.5l6 6 6-6" />
            </svg>
          </MenuButton>
        </Actions>
      </Bar>

      <Menu id="site-menu" ref={menuRef} data-open={open || undefined} aria-hidden={!open} inert={open ? undefined : ''}>
        <Starfield />
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
              <StatusArrow />
              <OpenToWorkLink />
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
        </Details>

        <LinkGrid role="group" aria-label="Contact and profiles">
          <LinkTile href={`mailto:${profile.email}`} data-tone="email" data-primary>
            Email <span aria-hidden="true">→</span>
          </LinkTile>
          <LinkTile href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </LinkTile>
          <SocialRow>
            {SOCIALS.map((social) => (
              <LinkTile
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-tone={social.brand}
              >
                {social.label}
              </LinkTile>
            ))}
          </SocialRow>
        </LinkGrid>

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
  // Content above the dark-mode starfield.
  '& > *:not([data-starfield])': {
    position: 'relative',
    zIndex: 1,
  },
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

// A chevron that points down when the menu is closed and flips up when it's open. Same square, hairline look as
// the theme toggle.
const MenuButton = styled(ButtonBase)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  '& svg': {
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'square',
    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  '&[data-open] svg': {
    transform: 'rotate(180deg)',
  },
  '&[data-open]': {
    borderColor: theme.palette.text.primary,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.text.primary}`,
    outlineOffset: 2,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& svg': { transition: 'none' },
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
  // Content above the dark-mode starfield.
  '& > *:not([data-starfield])': {
    position: 'relative',
    zIndex: 1,
  },
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

// Contact and profiles as real tap targets: Email (filled, the primary action) and Resume side by side, then the
// three socials in a row. 48px tall, square, hairline borders; on press or hover the label takes the brand color.
const LinkGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(1),
}));

const SocialRow = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(1),
}));

const LinkTile = styled('a')(({ theme }) => {
  const { mode } = theme.palette;
  const toned = (color) => ({ color, borderColor: color });

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    minHeight: 48,
    padding: theme.spacing(0, 1),
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    fontSize: '0.98rem',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
    transition: 'color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease',
    '& > span': {
      color: 'inherit',
      opacity: 0.7,
    },
    '&[data-primary]': {
      backgroundColor: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
      color: theme.palette.background.default,
    },
    '&:hover, &:active, &:focus-visible': {
      borderColor: theme.palette.text.primary,
      '&[data-tone="email"]': {
        backgroundColor: 'transparent',
        ...toned(EMAIL_RED[mode]),
      },
      '&[data-tone="linkedin"]': toned(BRAND.linkedin[mode]),
      '&[data-tone="github"]': toned(BRAND.github[mode]),
      '&[data-tone="instagram"]': {
        color: 'transparent',
        backgroundImage: INSTAGRAM_GRADIENT,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        borderColor: '#DD2A7B',
      },
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.text.primary}`,
      outlineOffset: 2,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  };
});
