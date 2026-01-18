import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactTyped } from 'react-typed';
import { Container, MetaText, Section } from '../ui/primitives';

const TypedHeadline = styled(ReactTyped)(({ theme }) => ({
  display: 'block',
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  letterSpacing: theme.typography.h1.letterSpacing,
  lineHeight: theme.typography.h1.lineHeight,
  color: theme.palette.text.primary,
}));

const Intro = () => {
  return (
    <Section component="section">
      <Container>
        <Stack spacing={3} alignItems="flex-start">
          <MetaText component="p">Introduction</MetaText>
          <Typography variant="h1" component="h1">
            Nelson Rodriguez
          </Typography>
          <TypedHeadline
            strings={[
              'Algorithms Practitioner & Intentional Problem Solver',
              'Humanistic and Design-Minded Software Engineer',
              'Hardware Enthusiast and Coffee Connoisseur',
              'Georgia Tech CS Alumnus — Information Networks',
              'Avid Runner, Sim Racer, and Book Reader',
            ]}
            typeSpeed={40}
            backDelay={2500}
            cursorChar="|"
            loop
          />
          <Typography variant="body1">
            I design and build software systems that are deliberate, reliable, and calm to use. My work centers on clarity, performance, and
            long-term maintainability.
          </Typography>
        </Stack>
      </Container>
    </Section>
  );
};

export { Intro };
