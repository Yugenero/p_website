import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';
import { MetaText } from '../ui/primitives';
import { profile } from '../../data/profile';

const ATLANTA_COORDS = '33.75° N, 84.39° W';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/New_York',
  timeZoneName: 'short',
});

// Live clock in Nelson's time zone; useful context for anyone scheduling a call.
const useLocalTime = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(timer);
  }, []);
  return timeFormatter.format(now);
};

// Editorial frame around the hero: hairlines that draw in on load, corner ticks,
// and small location / local-time labels along the top rule.
export const HeroFrame = ({ children }) => {
  const localTime = useLocalTime();

  return (
    <Frame>
      <Rule data-edge="top" aria-hidden="true" />
      <Rule data-edge="bottom" aria-hidden="true" />
      <Tick data-corner="tl" aria-hidden="true" />
      <Tick data-corner="tr" aria-hidden="true" />
      <Tick data-corner="bl" aria-hidden="true" />
      <Tick data-corner="br" aria-hidden="true" />
      <LabelRow>
        <MetaText component="p">
          {profile.location} · {ATLANTA_COORDS}
        </MetaText>
        <MetaText component="p">
          Local time <time>{localTime}</time>
        </MetaText>
      </LabelRow>
      {children}
    </Frame>
  );
};

const drawX = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Frame = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 0, 5),
  [theme.breakpoints.down('md')]: {
    paddingBottom: theme.spacing(4),
  },
}));

const Rule = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  height: 1,
  backgroundColor: theme.palette.text.primary,
  transformOrigin: 'left center',
  animation: `${drawX} 1.1s cubic-bezier(0.22, 1, 0.36, 1) both`,
  '&[data-edge="top"]': { top: 0 },
  '&[data-edge="bottom"]': {
    bottom: 0,
    backgroundColor: theme.palette.divider,
    transformOrigin: 'right center',
    animationDelay: '0.25s',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

// Small "+" crosshairs where the rules end, like crop marks on a print layout.
const Tick = styled('span')(({ theme }) => ({
  position: 'absolute',
  width: 11,
  height: 11,
  animation: `${fadeIn} 0.6s ease 0.9s both`,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.text.primary,
  },
  '&::before': { left: 5, top: 0, width: 1, height: 11 },
  '&::after': { top: 5, left: 0, width: 11, height: 1 },
  '&[data-corner="tl"]': { top: -5, left: -5 },
  '&[data-corner="tr"]': { top: -5, right: -5 },
  '&[data-corner="bl"]': { bottom: -5, left: -5 },
  '&[data-corner="br"]': { bottom: -5, right: -5 },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

const LabelRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(1, 3),
  padding: theme.spacing(1.5, 0),
  marginBottom: theme.spacing(5),
  animation: `${fadeIn} 0.6s ease 0.6s both`,
  '& p': {
    margin: 0,
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));
