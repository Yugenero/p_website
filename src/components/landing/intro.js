import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';
import { Container, LeadText, Section } from '../ui/primitives';

export const Intro = () => {
  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) {
      return;
    }
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <HeroSection>
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
                  Hey, I'm Nelson and I love everything software, technology and engineering.
                </HeroLead>
                <HeroSubText variant="body2" color="text.secondary">
                  Right now I’m focused on mobile SDK work, smooth integrations, and turning messy
                  product data into clear, useful experiences. I care about the little details,
                  but I’m always chasing simple, human workflows that just make sense.
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
}));

const HeroContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

const HeroContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: theme.spacing(5),
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
}));

const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  letterSpacing: '-0.02em',
  fontStyle: 'normal',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  height: '2.4em',
  overflow: 'hidden',
  fontSize: 'clamp(1.15rem, 2.6vw, 1.85rem)',
  lineHeight: 1.2,
  position: 'relative',
  '& .typed-text': {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
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
}));

const HeroLead = styled(LeadText)(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 1440px)': {
    fontSize: '1.35rem',
  },
}));

const HeroSubText = styled(Typography)(() => ({
  fontSize: '1.2rem',
  '@media (min-width: 1440px)': {
    fontSize: '1.3rem',
  },
}));

const HeroMedia = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: 'min(100%, 46.875rem)',
  aspectRatio: '4 / 3',
  objectFit: 'cover',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  filter: 'grayscale(100%) contrast(1.05)',
  [theme.breakpoints.down('md')]: {
    borderRadius: 16,
  },
}));
