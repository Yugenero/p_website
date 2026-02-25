import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Section } from '../ui/primitives';
import Starfield from '../global/starfield';

const INTRO_BODY_FONT =
  '"Inter", "Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const Intro = ({ nameFontFamily }) => {
  const theme = useTheme();

  return (
    <HeroSection>
      <Starfield
        density={15}
        color={theme.palette.s === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.45 : 0.2 }}
        forceWhite={true}
      />
      <HeroContainer>
        <HeroContent>
          <HeroBottomBand>
            <HeroLeftBlock>
              <HeroWorkSummary variant="body1">
                I work as a software engineer focused on building reliable applications, designing
                integrations between systems, and helping architect solutions that are maintainable,
                scalable, and useful to the people who depend on them.
              </HeroWorkSummary>
              <HeroRightParagraph variant="body1">
                Outside of work, I care about design, cars, training, and travel. I like thoughtful
                interfaces, learning how systems behave end to end, and improving incrementally over
                time through curiosity and repetition.
              </HeroRightParagraph>
            </HeroLeftBlock>
            <HeroRightBlock>
              <HeroRightTypedFill>
                <TypedLine variant="body1" component="p">
                  <TypedSlot>
                    <ReactTyped
                      strings={[
                        'Algorithms practitioner, intentional problem solver.',
                        'Humanistic, design-minded software engineer.',
                        'Georgia Tech CS alum, information networks focus.',
                        'Car enthusiast, hybrid athlete, iced coffee enjoyer.',
                        'Kaizen as a practice - 1% better every day.',
                      ]}
                      typeSpeed={40}
                      backDelay={2600}
                      cursorChar="|"
                      loop
                      className="typed-text"
                    />
                  </TypedSlot>
                </TypedLine>
              </HeroRightTypedFill>
            </HeroRightBlock>
          </HeroBottomBand>
          <HeroNameStrip>
            <HeroTitle nameFontFamily={nameFontFamily} variant="h1" component="h1">
              hi, i&apos;m nelson rodriguez
            </HeroTitle>
          </HeroNameStrip>
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  );
};

const HeroSection = styled(Section)(({ theme }) => ({
  minHeight: 'calc(100vh - 72px)',
  display: 'flex',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const HeroContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  zIndex: 1,
}));

const HeroContent = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: 'calc(100vh - 72px - 32px)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 72px - 24px)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
}));

const HeroBottomBand = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: 0,
  width: '100vw',
  marginLeft: 'calc(50% - 50vw)',
  marginBottom: 0,
  minHeight: 'clamp(260px, 34vh, 420px)',
  alignItems: 'stretch',
  paddingTop: 0,
  paddingBottom: 0,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    marginBottom: 0,
    minHeight: 'clamp(220px, 30vh, 320px)',
  },
}));

const HeroLeftBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: theme.spacing(1),
  padding: '5px',
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'nameFontFamily',
})(({ theme, nameFontFamily }) => ({
  fontFamily: nameFontFamily || theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.02em',
  lineHeight: 1,
  fontSize: 'clamp(1.55rem, 5.2vw, 3.6rem)',
  margin: 0,
  display: 'block',
  width: '100%',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  textAlign: 'left',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 'clamp(1.05rem, 2.1vw, 1.5rem)',
  lineHeight: 1.05,
  maxWidth: '100%',
  width: '100%',
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontFamily: INTRO_BODY_FONT,
  '& .typed-text': {
    fontWeight: 500,
    fontFamily: INTRO_BODY_FONT,
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
  },
  '& .typed-cursor': {
    fontFamily: INTRO_BODY_FONT,
    fontSize: 'inherit',
    lineHeight: 1,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(0.95rem, 3.8vw, 1.2rem)',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
  },
}));

const TypedSlot = styled('span')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  overflow: 'visible',
}));

const HeroWorkSummary = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.4),
  fontFamily: INTRO_BODY_FONT,
  fontSize: 'clamp(0.98rem, 1.08vw, 1.1rem)',
  lineHeight: 1.7,
  maxWidth: '100%',
  width: '100%',
  textAlign: 'left',
  color: theme.palette.text.secondary,
  marginBottom: 0,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const HeroRightBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const HeroRightParagraph = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontFamily: INTRO_BODY_FONT,
  fontSize: 'clamp(0.95rem, 1.02vw, 1.05rem)',
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  maxWidth: '100%',
  width: '100%',
  textAlign: 'left',
}));

const HeroRightTypedFill = styled(Box)(() => ({
  position: 'absolute',
  inset: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const HeroNameStrip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  bottom: 'calc(clamp(260px, 34vh, 420px) + 8px)',
  transform: 'translateX(-50%)',
  width: '100vw',
  minHeight: 'clamp(44px, 6vh, 64px)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '5px',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    bottom: 'calc(clamp(220px, 30vh, 320px) + 8px)',
    minHeight: 'clamp(40px, 5.5vh, 56px)',
  },
}));
