import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
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
              <HeroBody>
                <HeroLead>
                  I’m a software engineer with a genuine love for technology, thoughtful design, and the details that make products feel effortless.
                </HeroLead>
                <HeroSubText variant="body2" color="text.secondary">
                    I’m currently working on mobile SDKs, seamless integrations, and making complex product data easier 
                    to understand. User experience and business impact shape how I build, with a central goal of creating 
                    things people actually enjoy using.
                </HeroSubText>
              </HeroBody>
            </HeroMain>
            <HeroMedia>
              <HeroMediaFrame>
                <HeroImage
                  src="/files/images/me.jpg"
                  alt="Nelson Rodriguez portrait"
                  loading="lazy"
                  decoding="async"
                />
                <HeroOverlay>
                  <TypedLine variant="h2" component="p">
                    <TypedSlot>
                      <ReactTyped strings={[""]} cursorChar=">" className="typed-text" />
                      <ReactTyped
                        strings={[
                          'Algorithms pracitioner, intentional problem solver.',
                          'Humanistic, design-minded software engineer.',
                          'Georgia Tech CS alum, information networks focus.',
                          'Car enthusaist, hybrid athelete, iced coffee enjoyer',
                          'Kaizen as a practice - 1% better every day',
                        ]}
                        typeSpeed={40}
                        backDelay={2600}
                        cursorChar="|"
                        loop
                        className="typed-text"
                      />
                    </TypedSlot>
                  </TypedLine>
                </HeroOverlay>
              </HeroMediaFrame>
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
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(6),
  width: '100%',
  '@media (min-width: 1440px) and (max-width: 1599.98px)': {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
    gap: theme.spacing(8),
    width: 'min(100%, 1360px)',
    margin: '0 auto',
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

const TypedLine = styled(Typography)(({ theme }) => ({
  margin: 0,
  overflow: 'visible',
  fontSize: 'clamp(1.05rem, 2.1vw, 1.6rem)',
  lineHeight: 1.35,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  '& .typed-text': {
    fontWeight: 500,
    fontFamily: theme.typography.h1.fontFamily,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  '& .typed-cursor': {
    display: 'inline-block',
  },
  '@media (min-width: 1600px)': {
    fontSize: 'clamp(1.1rem, 1.8vw, 1.7rem)',
  },
  '@media (min-width: 1920px)': {
    fontSize: 'clamp(1.2rem, 1.6vw, 1.85rem)',
  },
}));

const TypedSlot = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  width: 'fit-content',
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

const HeroMediaFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'min(100%, 48rem)',
  margin: '0 auto',
  '@media (min-width: 1600px)': {
    width: 'min(100%, 66rem)',
  },
  '@media (min-width: 1920px)': {
    width: 'min(100%, 76rem)',
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  aspectRatio: '5 / 3',
  objectFit: 'cover',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  filter: 'grayscale(88%) contrast(1.05)',
  boxShadow: theme.palette.mode === 'dark' ? '0 24px 60px rgba(0, 0, 0, 0.45)' : '0 18px 40px rgba(0, 0, 0, 0.15)',
  [theme.breakpoints.down('md')]: {
    borderRadius: 16,
  },
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(3),
  width: '100%',
  maxWidth: '100%',
  padding: theme.spacing(2, 3),
  borderRadius: 16,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(10, 10, 12, 0.65)' : 'rgba(255, 255, 255, 0.72)',
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark' ? '0 16px 40px rgba(0, 0, 0, 0.35)' : '0 10px 30px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 2.5),
    borderRadius: 14,
  },
}));
