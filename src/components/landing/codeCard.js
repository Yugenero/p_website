import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';
import { MetaText } from '../ui/primitives';

const MONO_FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// A small, company-agnostic "about me" in code. Everything here comes from the hero tagline
// and the site itself; keep lines under ~42 characters so they don't wrap on phones.
const SNIPPET = `const nelson = {
  base: 'Atlanta, GA',
  fuel: 'iced coffee',
  training: ['strength', 'endurance'],
  offline: ['photography', 'cars'],
};

// Kaizen: 1% better every day
const kaizen = (days: number) =>
  1.01 ** days;

kaizen(365); // ≈ 37.8x`;

const KEYWORDS = /\b(import|from|const|let|await|return)\b/g;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveals `text` one character at a time; returns how many characters are visible.
const useTypewriter = (text, { speed = 14, startDelay = 600 } = {}) => {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  useEffect(() => {
    if (count >= text.length) return undefined;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed);
    return () => clearTimeout(timer);
  }, [count, text, speed, startDelay]);

  return count;
};

// Monochrome highlighting: comments recede, keywords get weight. No accent colors.
// Handles whole-line and trailing `//` comments (the snippet has no `//` inside strings).
const renderLine = (line, key) => {
  const commentAt = line.indexOf('//');
  const code = commentAt === -1 ? line : line.slice(0, commentAt);
  const comment = commentAt === -1 ? '' : line.slice(commentAt);
  const parts = code.split(KEYWORDS);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <Keyword key={`${key}-${i}`}>{part}</Keyword> : <span key={`${key}-${i}`}>{part}</span>
      )}
      {comment && <Comment key={`${key}-c`}>{comment}</Comment>}
    </>
  );
};

export const CodeCard = () => {
  const visible = useTypewriter(SNIPPET);
  const lines = SNIPPET.split('\n');
  const done = visible >= SNIPPET.length;
  let remaining = visible;

  return (
    <Card aria-label="Code snippet: a few things about Nelson">
      <CardHeader>
        <FileName>nelson.ts</FileName>
        <MetaText component="span">TypeScript</MetaText>
      </CardHeader>
      <Code aria-hidden="true">
        {lines.map((line, index) => {
          const shown = Math.max(0, Math.min(line.length, remaining));
          const lineIsActive = remaining >= 0 && remaining <= line.length;
          remaining -= line.length + 1; // +1 for the newline
          return (
            <Line key={index}>
              <LineNumber>{index + 1}</LineNumber>
              <LineText>
                {renderLine(line.slice(0, shown), `v${index}`)}
                {lineIsActive && <Cursor data-done={done} />}
                <Hidden>{line.slice(shown) || (line.length === 0 ? ' ' : '')}</Hidden>
              </LineText>
            </Line>
          );
        })}
      </Code>
      {/* Screen readers get the full snippet at once instead of the animation. */}
      <VisuallyHidden component="pre">{SNIPPET}</VisuallyHidden>
    </Card>
  );
};

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Card = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  minWidth: 0,
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(1.25, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FileName = styled('span')(({ theme }) => ({
  fontFamily: MONO_FONT,
  fontSize: '0.82rem',
  color: theme.palette.text.primary,
}));

const Code = styled('div')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.75, 2, 2),
  fontFamily: MONO_FONT,
  fontSize: '0.8rem',
  lineHeight: 1.65,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.74rem',
    padding: theme.spacing(1.5, 1.5, 1.75),
  },
}));

const Line = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.6rem minmax(0, 1fr)',
  gap: theme.spacing(1),
}));

const LineNumber = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  opacity: 0.6,
  textAlign: 'right',
  userSelect: 'none',
}));

const LineText = styled('span')(() => ({
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
}));

const Comment = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));

const Keyword = styled('span')(() => ({
  fontWeight: 600,
}));

const Hidden = styled('span')(() => ({
  visibility: 'hidden',
}));

const Cursor = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: '0.55em',
  height: '1.1em',
  marginBottom: '-0.2em',
  backgroundColor: theme.palette.text.primary,
  '&[data-done="true"]': {
    animation: `${blink} 1.1s step-end infinite`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

const VisuallyHidden = styled(Box)(() => ({
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}));
