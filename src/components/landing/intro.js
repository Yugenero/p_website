import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import { Container, LeadText, Section } from '../ui/primitives';
import Starfield from '../global/starfield';

export const Intro = () => {
  const theme = useTheme();

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) {
      return;
    }
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
  '@media (min-width: 1600px)': {
    gridTemplateColumns: 'minmax(520px, 1fr) minmax(520px, 1fr)',
    alignItems: 'center',
    gap: theme.spacing(4),
    width: 'min(100%, 1400px)',
    margin: '0 auto',
  },
  '@media (min-width: 1920px)': {
    gridTemplateColumns: 'minmax(600px, 1fr) minmax(600px, 1fr)',
    gap: theme.spacing(4),
    width: 'min(100%, 1600px)',
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
  '@media (min-width: 1600px)': {
    fontSize: 'clamp(3rem, 4.8vw, 5rem)',
  },
  '@media (min-width: 1920px)': {
    fontSize: 'clamp(3.4rem, 4.2vw, 5.4rem)',
  },
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  height: '3.2em',
  overflow: 'hidden',
  fontSize: 'clamp(1.15rem, 2.6vw, 1.85rem)',
  lineHeight: 1.25,
  position: 'relative',
  display: 'block',
  '& .typed-text': {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    display: 'block',
  },
  '@media (min-width: 1600px)': {
    fontSize: 'clamp(1.35rem, 2.2vw, 2.1rem)',
    height: '3.6em',
  },
  '@media (min-width: 1920px)': {
    fontSize: 'clamp(1.5rem, 2vw, 2.35rem)',
    height: '3.8em',
  },
}));

const TypedSlot = styled('span')(() => ({
  position: 'absolute',
  inset: 0,
  display: 'block',
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
    fontSize: '1.35rem',
  },
  '@media (min-width: 1600px)': {
    fontSize: '1.55rem',
  },
  '@media (min-width: 1920px)': {
    fontSize: '1.7rem',
  },
}));

const HeroSubText = styled(Typography)(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 1440px)': {
    fontSize: '1.3rem',
  },
  '@media (min-width: 1600px)': {
    fontSize: '1.4rem',
  },
  '@media (min-width: 1920px)': {
    fontSize: '1.5rem',
  },
}));

const HeroMedia = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
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
    width: 'min(100%, 60rem)',
  },
  '@media (min-width: 1920px)': {
    width: 'min(100%, 70rem)',
  },
  [theme.breakpoints.down('md')]: {
    borderRadius: 16,
  },
}));
