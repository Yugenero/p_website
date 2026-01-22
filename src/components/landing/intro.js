import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
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
                      'Algorithms practitioner and intentional problem solver.',
                      'Humanistic, design-minded software engineer.',
                      'Georgia Tech CS alum, information networks focus.',
                      'Car enthusaist, hybrid athelete, iced coffee enjoyer',
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
                  I build pragmatic systems and clean interfaces that respect how people work.
                </HeroLead>
                <HeroSubText variant="body2" color="text.secondary">
                  Currently shipping full-stack platforms with a bias toward reliability, clear
                  information design, and measurable outcomes.
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
        <ScrollCue>
          <ScrollButton onClick={handleScrollToAbout} aria-label="Scroll to the about section">
            <ArrowForwardRoundedIcon fontSize="medium" />
          </ScrollButton>
        </ScrollCue>
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
  maxWidth: 1240,
}));

const HeroContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: theme.spacing(5),
}));

const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
  alignItems: 'center',
  gap: theme.spacing(6),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
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
  fontSize: 'clamp(2.3rem, 4.4vw, 3.6rem)',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  fontStyle: 'normal',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  height: '2.4em',
  overflow: 'hidden',
  fontSize: 'clamp(1.05rem, 2.3vw, 1.6rem)',
  lineHeight: 1.2,
  position: 'relative',
  '& .typed-text': {
    fontWeight: 500,
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
  maxWidth: 520,
}));

const HeroLead = styled(LeadText)(() => ({
  fontSize: '0.98rem',
}));

const HeroSubText = styled(Typography)(() => ({
  fontSize: '0.95rem',
}));

const HeroMedia = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: 'min(100%, 1000px)',
  height: 'min(100%, 1000px)',
  aspectRatio: '4 / 3',
  objectFit: 'cover',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  filter: 'grayscale(100%) contrast(1.05)',
}));

const arrowDrift = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(6px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.6;
  }
`;

const ScrollCue = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  marginTop: theme.spacing(-2),
}));

const ScrollButton = styled(ButtonBase)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 999,
  border: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  '& svg': {
    animation: `${arrowDrift} 1.6s ease-in-out infinite`,
  },
  '&:hover': {
    transform: 'translateX(4px)',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.default,
  },
}));
