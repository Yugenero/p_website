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
              <HeroLeftTopCell>
                <HeroTitle nameFontFamily={nameFontFamily} variant="h1" component="h1">
                  hi, i&apos;m nelson
                </HeroTitle>
              </HeroLeftTopCell>
              <HeroLeftBottomCell>
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
              </HeroLeftBottomCell>
            </HeroLeftBlock>
          </HeroBottomBand>
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  );
};

const HeroSection = styled(Section)(({ theme }) => ({
  minHeight: 'calc(100vh - 72px)',
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100svh - 72px)',
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
  minHeight: 'calc(100vh - 72px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  paddingBottom: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100svh - 72px)',
    paddingBottom: theme.spacing(2),
  },
}));

const HeroBottomBand = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  width: '100vw',
  marginLeft: 'calc(50% - 50vw)',
  minHeight: 'clamp(260px, 36vh, 420px)',
  alignItems: 'stretch',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    minHeight: 'clamp(220px, 34vh, 320px)',
  },
}));

const HeroLeftBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) clamp(58px, 7.5vh, 98px)',
  textAlign: 'left',
  padding: theme.spacing(3.25),
  paddingTop: theme.spacing(4.25),
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    gap: theme.spacing(1),
  },
}));

const HeroLeftTopCell = styled(Box)(() => ({
  width: '100%',
  minHeight: 0,
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
}));

const HeroLeftBottomCell = styled(Box)(() => ({
  width: '100%',
  minHeight: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  overflow: 'hidden',
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'nameFontFamily',
})(({ theme, nameFontFamily }) => ({
  fontFamily: nameFontFamily || theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.025em',
  lineHeight: 0.95,
  fontSize: 'clamp(2.65rem, 6.8vw, 7.2rem)',
  margin: 0,
  position: 'absolute',
  left: 0,
  bottom: 0,
  display: 'block',
  width: '100%',
  color: theme.palette.text.primary,
  whiteSpace: 'normal',
  textAlign: 'left',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: 'clamp(1.2rem, 2.55vw, 2rem)',
  lineHeight: 1.1,
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
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
    fontSize: 'clamp(1.05rem, 2.45vw, 1.5rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.98rem, 4vw, 1.25rem)',
  },
}));

const TypedSlot = styled('span')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  overflow: 'hidden',
  '& .typed-text': {
    display: 'block',
  },
}));
