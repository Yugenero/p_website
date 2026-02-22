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
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
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
              <HeroTitleBlock>
                <HeroTitle nameFontFamily={nameFontFamily} variant="h1" component="h1">
                  <HeroTitleLead>Hey, I&apos;m</HeroTitleLead>
                  <HeroTitleName>Nelson Rodriguez</HeroTitleName>
                </HeroTitle>
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
              </HeroTitleBlock>
              <HeroWorkSummary variant="body1">
                I build software, work with integrations, and help architect solutions for software systems.
              </HeroWorkSummary>
            </HeroLeftBlock>
            <HeroRightBlock>
              <HeroRightParagraph variant="body1">
                I work as a software engineer focused on building reliable applications, designing
                integrations between systems, and helping architect solutions that are maintainable,
                scalable, and useful to the people who depend on them.
              </HeroRightParagraph>
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
  gap: theme.spacing(4),
  width: '100%',
  alignItems: 'stretch',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2.5),
    paddingTop: theme.spacing(2),
  },
}));

const HeroLeftBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.4),
}));

const HeroTitleBlock = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingTop: 'clamp(3.2rem, 7.8vw, 6.1rem)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: 'clamp(4.6rem, 16vw, 5.8rem)',
  },
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'nameFontFamily',
})(({ theme, nameFontFamily }) => ({
  position: 'absolute',
  top: 'clamp(-0.9rem, -1.2vw, -0.35rem)',
  left: 0,
  width: '100%',
  fontFamily: nameFontFamily || theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.02em',
  lineHeight: 1.02,
  fontSize: 'clamp(2.6rem, 7.2vw, 5.7rem)',
  margin: 0,
  display: 'block',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    top: 'clamp(-0.35rem, -1.5vw, -0.1rem)',
  },
}));

const HeroTitleLead = styled('span')(({ theme }) => ({
  display: 'inline',
  marginRight: '0.25ch',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    marginRight: 0,
  },
}));

const HeroTitleName = styled('span')(({ theme }) => ({
  display: 'inline',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 'clamp(1.2rem, 2.45vw, 1.8rem)',
  lineHeight: 1.05,
  maxWidth: '100%',
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
    fontSize: 'clamp(1.02rem, 4.2vw, 1.35rem)',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.95rem, 3.9vw, 1.1rem)',
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
  color: theme.palette.text.secondary,
  marginBottom: 0,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const HeroRightBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.1),
}));

const HeroRightParagraph = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontFamily: INTRO_BODY_FONT,
  fontSize: 'clamp(0.95rem, 1.02vw, 1.05rem)',
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  maxWidth: 560,
}));
