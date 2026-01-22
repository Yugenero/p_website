import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { keyframes, styled } from '@mui/material/styles';
import { Container, LeadText, MetaText, Section } from '../ui/primitives';

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
            <HeroHeadline>
              <HeroName variant="h1" component="h1">
                Nelson Rodriguez
              </HeroName>
              <TypedLine variant="h2" component="p">
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
              </TypedLine>
            </HeroHeadline>
            <HeroBody>
              <LeadText>
                I build pragmatic systems and clean interfaces that respect how people work.
              </LeadText>
              <Typography variant="body2" color="text.secondary">
                Currently shipping full-stack platforms with a bias toward reliability,
                clear information design, and measurable outcomes.
              </Typography>
            </HeroBody>
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
  paddingTop: theme.spacing(6),
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
  alignItems: 'flex-start',
  gap: theme.spacing(6),
}));

const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  width: '100%',
}));

const HeroHeadline = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const HeroName = styled(Typography)(() => ({
  fontSize: 'clamp(2.9rem, 6vw, 4.6rem)',
  fontFamily: 'Times New Roman',
  fontWeight: 700,
  fontStyle: 'normal',
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minHeight: '3.6rem',
  fontSize: 'clamp(1.5rem, 3.4vw, 2.4rem)',
  position: 'relative',
  '& .typed-text': {
    fontWeight: 500,
  },
}));

const HeroBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  maxWidth: 640,
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
