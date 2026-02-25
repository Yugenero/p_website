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
              <HeroLeftTopStack>
                <HeroTopCell>
                  <HeroTitle nameFontFamily={nameFontFamily} variant="h1" component="h1">
                    hi, i&apos;m nelson rodriguez
                  </HeroTitle>
                </HeroTopCell>
                <HeroTopCell>
                  <TypedLine variant="body1" component="p">
                    <TypedSlot>
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
                    </TypedSlot>
                  </TypedLine>
                </HeroTopCell>
              </HeroLeftTopStack>
              <HeroWorkSummary variant="body1">
                I work as a software engineer focused on building reliable applications, designing
                integrations between systems, and helping architect solutions that are maintainable,
                scalable, and useful to the people who depend on them.
              </HeroWorkSummary>
            </HeroLeftBlock>
            <HeroRightBlock>
              <HeroRightParagraph variant="body1">
                Outside of work, I care about design, cars, training, and travel. I like thoughtful
                interfaces, learning how systems behave end to end, and improving incrementally over
                time through curiosity and repetition.
              </HeroRightParagraph>
            </HeroRightBlock>
          </HeroBottomBand>
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  padding: theme.spacing(0.5),
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 72px - 24px)',
    padding: '4px',
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

const HeroLeftBlock = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: '4px',
  padding: '4px',
}));

const HeroLeftTopStack = styled(Box)(() => ({
  width: '100%',
  minHeight: 0,
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gap: '4px',
}));

const HeroTopCell = styled(Box)(() => ({
  width: '100%',
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'nameFontFamily',
})(({ theme, nameFontFamily }) => ({
  fontFamily: nameFontFamily || theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  fontSize: 'clamp(1.15rem, 2.25vw, 1.95rem)',
  margin: 0,
  display: 'block',
  width: '100%',
  color: theme.palette.text.primary,
  whiteSpace: 'normal',
  textAlign: 'left',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 'clamp(1.05rem, 2.05vw, 1.75rem)',
  lineHeight: 1.1,
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
    fontSize: 'clamp(0.95rem, 3.3vw, 1.25rem)',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
  },
}));

const TypedSlot = styled('span')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  overflow: 'visible',
}));

const HeroWorkSummary = styled(Typography)(({ theme }) => ({
  marginTop: 0,
  fontFamily: INTRO_BODY_FONT,
  fontSize: 'clamp(0.98rem, 1.08vw, 1.1rem)',
  lineHeight: 1.7,
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  color: theme.palette.text.secondary,
  marginBottom: 0,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const HeroRightBlock = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  padding: '4px',
}));

const HeroRightParagraph = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontFamily: INTRO_BODY_FONT,
  fontSize: 'clamp(0.95rem, 1.02vw, 1.05rem)',
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
}));
