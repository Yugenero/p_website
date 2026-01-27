import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import { Container, LeadText, Section } from '../ui/primitives';
import Starfield from '../global/starfield';

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
        <HeroContent>
          <HeroLayout>
            <HeroMain>
              <HeroHeadline>
              <HeroName variant="h1" component="h1">
                Nelson Rodriguez
              </HeroName>
              <TypedLine variant="h2" component="p">
                <TypedSlot>
                  <ReactTyped
                    strings={[
                      'Algorithms pracitioner, intentional problem solver.',
                      'Humanistic, design-minded software engineer.',
                      'Georgia Tech CS alum, information networks focus.',
                      'Car enthusaist, hybrid athelete, iced coffee enjoyer',
                      "Kaizen as a practice - 1% better every day",
                    ]}
                    typeSpeed={40}
                    backDelay={2600}
                    cursorChar="|"
                    loop
                    className="typed-text"
                  />
                </TypedSlot>
              </TypedLine>
            </HeroHeadline>
              <HeroBody>
                <HeroLead>
                  Hey, I’m Nelson, a software engineer with a genuine love for and technology, among other things.
                </HeroLead>
                <HeroSubText variant="body2" color="text.secondary">
                    I’m currently working on mobile SDKs, seamless integrations, and making complex product data easier 
                    to understand. User experience and business impact shape how I build, with a central goal of creating 
                    things people actually enjoy using.
                </HeroSubText>
              </HeroBody>
            </HeroMain>
            <HeroMedia>
              <HeroImage
               src="/files/images/me.jpg"
                alt="Nelson Rodriguez portrait"
                loading="lazy"
                decoding="async"
              />
            </HeroMedia>
          </HeroLayout>
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  );
};

const HeroSection = styled(Section)(({ theme }) => ({
  minHeight: 'calc(100vh - 72px)',
  display: 'flex',
  paddingTop: 0,
  paddingBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: theme.spacing(5),
  '@media (min-width: 1600px)': {
    alignItems: 'stretch',
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
  },
}));

const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
  alignItems: 'flex-start',
  gap: theme.spacing(6),
  width: '100%',
  '@media (min-width: 1440px)': {
    gap: theme.spacing(200),
  },
  '@media (min-width: 1600px)': {
    gridTemplateColumns: 'minmax(520px, 0.9fr) minmax(640px, 1.25fr)',
    alignItems: 'center',
    gap: theme.spacing(12),
    width: 'min(100%, 1520px)',
    margin: '0 auto',
  },
  '@media (min-width: 1920px)': {
    gridTemplateColumns: 'minmax(600px, 0.9fr) minmax(760px, 1.25fr)',
    gap: theme.spacing(14),
    width: 'min(100%, 1680px)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

const HeroMain = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  position: 'relative',
  zIndex: 2,
}));

const HeroHeadline = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  '@media (min-width: 1600px)': {
    alignItems: 'flex-start',
    textAlign: 'left',
  },
}));

const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.02em',
  fontStyle: 'normal',
  '@media (min-width: 1440px)': {
    whiteSpace: 'nowrap',
  },
  '@media (min-width: 1600px)': {
    fontSize: 'clamp(2.75rem, 4.1vw, 4.4rem)',
  },
  '@media (min-width: 1920px)': {
    fontSize: 'clamp(3rem, 3.6vw, 4.8rem)',
  },
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  minHeight: '3.2em',
  overflow: 'visible',
  fontSize: 'clamp(1.15rem, 2.6vw, 1.85rem)',
  lineHeight: 1.25,
  position: 'relative',
  display: 'block',
  zIndex: 2,
  '& .typed-text': {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    display: 'block',
  },
  '@media (min-width: 1600px)': {
    fontSize: 'clamp(1.2rem, 1.9vw, 1.85rem)',
    minHeight: '3.3em',
  },
  '@media (min-width: 1920px)': {
    fontSize: 'clamp(1.3rem, 1.7vw, 2.05rem)',
    minHeight: '3.4em',
  },
}));

const TypedSlot = styled('span')(() => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  zIndex: 2,
}));

const HeroBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  maxWidth: '100%',
  '& .MuiTypography-root': {
    color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary,
  },
  '@media (min-width: 1600px)': {
    alignItems: 'flex-start',
    textAlign: 'left',
    maxWidth: 720,
  },
}));

const HeroLead = styled(LeadText)(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 1440px)': {
    fontSize: '1.1rem',
  },
  '@media (min-width: 1600px)': {
    fontSize: '1.2rem',
  },
  '@media (min-width: 1920px)': {
    fontSize: '1.3rem',
  },
}));

const HeroSubText = styled(Typography)(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 1440px)': {
    fontSize: '1.05rem',
  },
  '@media (min-width: 1600px)': {
    fontSize: '1.2rem',
  },
  '@media (min-width: 1920px)': {
    fontSize: '1.3rem',
  },
}));

const HeroMedia = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
  position: 'relative',
  zIndex: 1,
  '@media (min-width: 1600px)': {
    justifyContent: 'center',
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: 'min(100%, 48rem)',
  aspectRatio: '5 / 3',
  objectFit: 'cover',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  filter: 'grayscale(100%) contrast(1.05)',
  '@media (min-width: 1600px)': {
    width: 'min(100%, 66rem)',
  },
  '@media (min-width: 1920px)': {
    width: 'min(100%, 76rem)',
  },
  [theme.breakpoints.down('md')]: {
    borderRadius: 16,
  },
}));
