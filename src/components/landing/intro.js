import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Section } from '../ui/primitives';
import Starfield from '../global/starfield';

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
          <HeroLayout>
            <HeroHeadline>
              <HeroTitleBlock>
                <HeroTitle nameFontFamily={nameFontFamily} variant="h1" component="h1">
                  <HeroTitleLead>Hey, I&apos;m</HeroTitleLead>
                  <HeroTitleName>Nelson Rodriguez</HeroTitleName>
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
              </HeroTitleBlock>
              <HeroDescription variant="body1">
                I build software, work with integrations, and help architect solutions for software systems. 
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

const HeroTitleBlock = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: 'clamp(3.25rem, 6vw, 4.95rem)',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 'clamp(2.8rem, 8.8vw, 4.2rem)',
  },
}));

const HeroTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'nameFontFamily',
})(({ theme, nameFontFamily }) => ({
  fontFamily: nameFontFamily || theme.typography.h1.fontFamily,
  fontWeight: 400,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  fontSize: 'clamp(3.45rem, 8.6vw, 7.1rem)',
  margin: 0,
  display: 'block',
  color: theme.palette.text.primary,
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
  position: 'absolute',
  left: 0,
  bottom: 0,
  margin: 0,
  fontSize: 'clamp(2.2rem, 4.1vw, 3rem)',
  lineHeight: 1.05,
  maxWidth: '100%',
  color: theme.palette.text.primary,
  '& .typed-text': {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
  },
  '& .typed-cursor': {
    fontFamily: theme.typography.fontFamily,
    fontSize: 'inherit',
    lineHeight: 1,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.35rem, 5.2vw, 2rem)',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1rem, 4.5vw, 1.2rem)',
  },
}));

const TypedSlot = styled('span')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  overflow: 'visible',
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  fontFamily: theme.typography.fontFamily,
  fontSize: 'clamp(1.125rem, 1.5vw, 1.35rem)',
  lineHeight: 1.85,
  maxWidth: 860,
  color: theme.palette.text.secondary,
  marginBottom: 0,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));
