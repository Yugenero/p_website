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
            <HeroTitle variant="h1" component="h1">
              {profile.name}
              <HeroRole component="span">{profile.role}</HeroRole>
            </HeroTitle>
            <TypedLine variant="body1" component="p">
              <ReactTyped
                strings={[
                  'Algorithms practitioner, intentional problem solver.',
                  'Humanistic, design-minded software engineer.',
                  'Georgia\u00A0Tech CS alum, information networks focus.',
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
              Currently at{' '}
              <Link href={profile.companyUrl} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700 }}>
                {profile.company}
              </Link>
              . {profile.pitch}
            </HeroSummary>
            {profile.openToWork && (
              <StatusLine component="p">
                <StatusDot aria-hidden="true" />
                Open to new roles
              </StatusLine>
            )}
            <CtaRow>
              <Button variant="contained" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                View resume
              </Button>
              <Button variant="outlined" href={`mailto:${profile.email}`}>
                Get in touch
              </Button>
            </CtaRow>
          </HeroMain>

          <HeroAside>
            <PhotoStack style={profile.photoRatio ? { '--photo-ratio': profile.photoRatio } : undefined}>
              <PhotoBacking aria-hidden="true" />
              <PhotoFrame>
                {profile.photo && <img src={profile.photo} alt={profile.name} />}
              </PhotoFrame>
            </PhotoStack>
            <FactsPanel component="dl" aria-label="Quick facts">
              {quickFacts.map((fact) => (
                <FactRow key={fact.label}>
                  <MetaText component="dt">{fact.label}</MetaText>
                  <FactValue component="dd">
                    {fact.value}
                    {fact.link && (
                      <>
                        {' · '}
                        <SchoolLink href={fact.link.href} target="_blank" rel="noopener noreferrer">
                          {fact.link.label}
                        </SchoolLink>
                      </>
                    )}
                  </FactValue>
                </FactRow>
              ))}
            </FactsPanel>
          </HeroAside>
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

// Fills the screen below the header on desktop, so the footer only appears once you scroll.
const HeroSection = styled('section')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  minHeight: 'calc(100vh - var(--header-height, 72px))',
  // Extra bottom padding sits the centered content a little above the middle of the screen.
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(14),
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

// Name (top of HeroMain) and portrait (top of HeroAside) share a top line; the columns stretch to
// the same height so the buttons can sit at the bottom, level with the end of the quick facts.
const HeroGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)',
  gridTemplateAreas: '"main aside"',
  columnGap: theme.spacing(8),
  rowGap: theme.spacing(2.5),
  alignItems: 'stretch',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateAreas: '"main" "aside"',
  },
}));

const HeroMain = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  minWidth: 0,
}));

const StatusLine = styled(MetaText)(({ theme }) => ({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  color: theme.palette.text.primary,
  fontFamily: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  letterSpacing: 0,
}));

const StatusDot = styled('span')(() => ({
  width: 10,
  height: 10,
  flexShrink: 0,
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
  lineHeight: 1,
  fontSize: 'clamp(2.4rem, 5.2vw, 5.4rem)',
  margin: 0,
  color: theme.palette.text.primary,
}));

// Sits on its own line under the name, scaled down so the full title fits on one line.
const HeroRole = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontFamily: theme.typography.fontFamily, // sans-serif, against the serif name
  fontWeight: 400,
  fontSize: '0.5em',
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  marginTop: '0.2em',
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
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
  // Pushed to the bottom of the column (level with the quick facts' last row) on desktop.
  marginTop: 'auto',
  paddingTop: theme.spacing(1),
}));

const HeroAside = styled(Box)(({ theme }) => ({
  gridArea: 'aside',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2.5), // keeps the old 40px gap above the facts on phones
  },
}));

// Portrait: a solid block with the photo frame offset diagonally on top of it. The frame takes
// the photo's own shape (--photo-ratio) at a fixed height; without a ratio it spans the column.
// Desktop only for now; the mobile hero is unchanged.
const PHOTO_HEIGHT = 'clamp(200px, 20vw, 300px)';
const PHOTO_OFFSET = 18;

const PhotoStack = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: `min(100%, calc(${PHOTO_HEIGHT} * var(--photo-ratio, 100) + ${PHOTO_OFFSET}px))`,
  height: `calc(${PHOTO_HEIGHT} + ${PHOTO_OFFSET}px)`,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const PhotoBacking = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: PHOTO_OFFSET,
  left: PHOTO_OFFSET,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.text.primary,
}));

const PhotoFrame = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: PHOTO_OFFSET,
  bottom: PHOTO_OFFSET,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.text.primary}`,
  backgroundColor: theme.palette.background.default,
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
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

const SchoolLink = styled(Link)(() => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 500,
}));

const FactValue = styled(Typography)(() => ({
  margin: 0,
  fontSize: '0.98rem',
  lineHeight: 1.45,
}));
