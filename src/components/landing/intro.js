import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Container, LeadText, MetaText, Section } from '../ui/primitives';

export const Intro = () => {
  return (
    <Section>
      <Container>
        <HeroLayout>
          <Box>
            <MetaText>Intro</MetaText>
            <Typography variant="h1" component="h1">
              Nelson Rodriguez
            </Typography>
            <LeadText>
              I build pragmatic systems and clean interfaces that respect how people work.
            </LeadText>
          </Box>
          <Box>
            <TypedLine variant="h3" component="p">
              <ReactTyped
                strings={[
                  'Algorithms practitioner and intentional problem solver.',
                  'Humanistic, design-minded software engineer.',
                  'Hardware enthusiast and iced coffee lover.',
                  'Georgia Tech CS alum, information networks focus.',
                  'Car enthusaist, hybrid athelete, and podcast consumer.',
                ]}
                typeSpeed={40}
                backDelay={2600}
                cursorChar="|"
                loop
                className="typed-text"
              />
            </TypedLine>
            <Typography variant="body2" color="text.secondary">
              Currently shipping full-stack platforms with a bias toward reliability,
              clear information design, and measurable outcomes.
            </Typography>
          </Box>
        </HeroLayout>
      </Container>
    </Section>
  );
};

const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  minHeight: '4rem',
  gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
  gap: theme.spacing(6),
  alignItems: 'start',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const TypedLine = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minHeight: '4rem',
  psotion: 'relative',
  '& .typed-text': {
    fontWeight: 500,
  },
}));
