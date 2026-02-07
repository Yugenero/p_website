import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Section } from '../ui/primitives';
import Starfield from '../global/starfield';

const introSerif = '"Junicode", "Crimson Pro", "Times New Roman", Times, serif';

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
            <HeroHeadline>
              <HeroTitle variant="h1" component="h1">
                hi, i&apos;m Nelson Rodriguez.
              </HeroTitle>
              <TypedLine variant="body1" component="p">
                <TypedSlot>
                  <ReactTyped
                    strings={[
                      'Algorithms practitioner, Intentional problem solver.',
                      'Humanistic, design-minded software engineer.',
                      'Georgia Tech CS alum, information networks focus.',
                      'Car enthusiast, Hybrid athlete, Iced coffee enjoyer.',
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
              <HeroDescription variant="body1">
                I build mobile SDKs, integrations, and product data experiences that make complex workflows feel
                clear, dependable, and easy to use.
              </HeroDescription>
            </HeroHeadline>
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
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    paddingBottom: theme.spacing(4),
  },
}));

const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(3),
  },
}));

const HeroHeadline = styled(Box)(() => ({
  width: '100%',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: introSerif,
  fontWeight: 400,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  fontSize: 'clamp(3.45rem, 8.6vw, 7.1rem)',
  margin: 0,
  display: 'block',
  color: theme.palette.text.primary,
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  fontSize: 'clamp(1.2rem, 2.3vw, 1.55rem)',
  lineHeight: 1.5,
  color: theme.palette.text.primary,
  '& .typed-text': {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
  },
  '& .typed-cursor': {
    fontFamily: theme.typography.fontFamily,
  },
}));

const TypedSlot = styled('span')(() => ({
  display: 'inline-block',
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  fontFamily: theme.typography.fontFamily,
  fontSize: '1rem',
  lineHeight: 1.85,
  maxWidth: 860,
  color: theme.palette.text.secondary,
  marginBottom: 0,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));
