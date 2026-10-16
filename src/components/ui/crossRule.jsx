import { keyframes, styled } from '@mui/material/styles';

// Hairline with small "+" marks at both ends, like crop marks on a print layout.
// The line grows out from the middle to both ends once on mount; when it reaches
// the ends, the marks fade in. Used under the header and under the landing hero.
export const CrossRule = ({ delay = 0, className }) => (
  <RuleRoot className={className} aria-hidden="true" style={{ '--rule-delay': `${delay}s` }}>
    <Line />
    <Tick data-side="start" />
    <Tick data-side="end" />
  </RuleRoot>
);

const drawX = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TICK = 11;
const DRAW_SECONDS = 1.1;

const RuleRoot = styled('div')(() => ({
  position: 'relative',
  height: 1,
}));

const Line = styled('span')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: theme.palette.divider,
  transformOrigin: 'center',
  animation: `${drawX} ${DRAW_SECONDS}s cubic-bezier(0.22, 1, 0.36, 1) var(--rule-delay) both`,
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

const Tick = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: -(TICK - 1) / 2,
  width: TICK,
  height: TICK,
  // Starts as the line's ease-out arrives at the ends.
  animation: `${fadeIn} 0.5s ease calc(var(--rule-delay) + ${DRAW_SECONDS * 0.75}s) both`,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.text.primary,
  },
  '&::before': { left: (TICK - 1) / 2, top: 0, width: 1, height: TICK },
  '&::after': { top: (TICK - 1) / 2, left: 0, width: TICK, height: 1 },
  '&[data-side="start"]': { left: -(TICK - 1) / 2 },
  '&[data-side="end"]': { right: -(TICK - 1) / 2 },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));
