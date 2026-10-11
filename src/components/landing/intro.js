import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import { Container, MetaText } from '../ui/primitives';
import Starfield from '../global/starfield';
import { profile, quickFacts } from '../../data/profile';

const INTRO_BODY_FONT =
  '"Inter", "Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const Intro = () => {
  const theme = useTheme();

  return (
    <HeroSection>
      <Starfield
        density={15}
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.45 : 0.2 }}
        forceWhite={true}
      />
      <HeroContainer>
        <HeroGrid>
          <HeroMain>
            {profile.openToWork && (
              <StatusLine component="p">
                <StatusDot aria-hidden="true" />
                Open to new roles · {profile.location}
              </StatusLine>
            )}
            <HeroTitle variant="h1" component="h1">
              hi, i&apos;m nelson
            </HeroTitle>
            <TypedLine variant="body1" component="p">
              <ReactTyped
                strings={[
                  'Algorithms practitioner, intentional problem solver.',
                  'Humanistic, design-minded software engineer.',
                  'Georgia Tech CS alum, information networks focus.',
                  'Car enthusiast, hybrid athlete, iced coffee enjoyer.',
                  'Kaizen as a practice - aiming to be 1% better every day.',
                ]}
                typeSpeed={40}
                backDelay={2600}
                cursorChar="|"
                loop
                className="typed-text"
              />
            </TypedLine>
            <HeroSummary variant="body1">
              {profile.role} at{' '}
              <Link href={profile.companyUrl} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700 }}>
                {profile.company}
              </Link>
              . {profile.pitch}
            </HeroSummary>
            <CtaRow>
              <Button variant="contained" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                View resume
              </Button>
              <Button variant="outlined" href={`mailto:${profile.email}`}>
                Get in touch
              </Button>
            </CtaRow>
          </HeroMain>

          <FactsPanel component="dl" aria-label="Quick facts">
            {quickFacts.map((fact) => (
              <FactRow key={fact.label}>
                <MetaText component="dt">{fact.label}</MetaText>
                <FactValue component="dd">{fact.value}</FactValue>
              </FactRow>
            ))}
          </FactsPanel>
        </HeroGrid>
      </HeroContainer>
    </HeroSection>
  );
};

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(46, 160, 67, 0.45); }
  70% { box-shadow: 0 0 0 6px rgba(46, 160, 67, 0); }
  100% { box-shadow: 0 0 0 0 rgba(46, 160, 67, 0); }
`;

// Fills the first screen so the landing page needs no scrolling on desktop.
const HeroSection = styled('section')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  minHeight: 'calc(100vh - 160px)',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    minHeight: 0,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

const HeroContainer = styled(Container)(() => ({
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

const HeroGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)',
  gap: theme.spacing(8),
  alignItems: 'end',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(5),
  },
}));

const HeroMain = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  minWidth: 0,
}));

const StatusLine = styled(MetaText)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  color: theme.palette.text.primary,
}));

const StatusDot = styled('span')(() => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#2EA043',
  animation: `${pulse} 2.4s ease-out infinite`,
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.025em',
  lineHeight: 0.95,
  fontSize: 'clamp(2.65rem, 6.8vw, 7.2rem)',
  margin: 0,
  color: theme.palette.text.primary,
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  minHeight: '2.4em',
  fontSize: 'clamp(1.05rem, 1.9vw, 1.5rem)',
  lineHeight: 1.2,
  color: theme.palette.text.secondary,
  fontFamily: INTRO_BODY_FONT,
  '& .typed-text': {
    fontWeight: 500,
    fontFamily: INTRO_BODY_FONT,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '3.6em',
  },
}));

const HeroSummary = styled(Typography)(() => ({
  fontSize: '1.1rem',
  lineHeight: 1.6,
  maxWidth: 640,
}));

const CtaRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
}));

const FactsPanel = styled(Box)(({ theme }) => ({
  margin: 0,
  borderTop: `1px solid ${theme.palette.text.primary}`,
}));

const FactRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '7.5rem minmax(0, 1fr)',
  alignItems: 'baseline',
  gap: theme.spacing(2),
  padding: theme.spacing(1.75, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& dt': {
    margin: 0,
  },
}));

const FactValue = styled(Typography)(() => ({
  margin: 0,
  fontSize: '0.98rem',
  lineHeight: 1.45,
}));
