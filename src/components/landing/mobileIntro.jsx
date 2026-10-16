import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactTyped } from 'react-typed';
import { profile } from '../../data/profile';
import { StatusDot } from '../global/profileParts';

// Phone home page, above the project feed: a typed line that cycles through who Nelson is (so one line can
// carry what the desktop sidebar spreads over several blocks), the open-to-work status, and the two primary
// actions. Everything else lives in the menu. With reduced motion, the first line shows without typing.

const lines = [`${profile.role} at ${profile.company}.`, ...profile.typedLines];

const usePrefersReducedMotion = () => {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

export const MobileIntro = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Intro aria-label="About Nelson">
      <Typed>
        {reducedMotion ? (
          lines[0]
        ) : (
          <ReactTyped strings={lines} typeSpeed={38} backSpeed={18} backDelay={2400} cursorChar="|" loop />
        )}
      </Typed>
      {profile.openToWork && (
        <Status>
          <StatusDot aria-hidden="true" />
          Open to new roles
        </Status>
      )}
      <Actions>
        <Button variant="contained" href={`mailto:${profile.email}`}>
          Email me
        </Button>
        <Button variant="outlined" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
          Resume
        </Button>
      </Actions>
    </Intro>
  );
};

const Intro = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3, 2, 0.5),
}));

// Two lines tall so the layout doesn't jump as lines of different lengths type in and out.
const Typed = styled('p')(({ theme }) => ({
  margin: 0,
  minHeight: '2.5em',
  fontSize: '1.3rem',
  lineHeight: 1.25,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  '& .typed-cursor': {
    color: theme.palette.text.secondary,
    fontWeight: 300,
  },
}));

const Status = styled('p')(({ theme }) => ({
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.95rem',
  color: theme.palette.text.secondary,
  '& > span': {
    margin: '0 10px 0 0',
  },
}));

const Actions = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  '& .MuiButton-root': {
    minHeight: 44,
    borderRadius: 0,
  },
}));
