import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import {
  Container,
  InlineItem,
  InlineList,
  LeadText,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';

const skills = [
  'React',
  'TypeScript',
  'C#/.NET',
  'MongoDB',
  'Snowflake',
  'AWS',
  'Docker',
  'Node.js',
  'Python',
];

export const AboutSection = () => {
  return (
    <Section id="about">
      <Container>
        <SectionHeader>
          <MetaText>About</MetaText>
          <SectionTitle variant="h2">Editorial overview</SectionTitle>
        </SectionHeader>
        <AboutGrid>
          <Box>
            <LeadText>
              I build software that turns complex operational data into clear,
              reliable tools that people trust.
            </LeadText>
          </Box>
          <Box>
            <Typography variant="body1" paragraph>
              Over the past year I led full-stack delivery on internal finance and
              asset management systems serving 20,000+ ABM contractors at{' '}
              <Link href="https://civicdx.com" target="_blank" rel="noopener noreferrer">
                Civic DX
              </Link>
              . I focused on clean information design, scalable data filtering, and
              dependable APIs with React, C#/.NET, MongoDB, and Snowflake.
            </Typography>
            <Typography variant="body1" paragraph>
              I hold a B.S. in Computer Science from{' '}
              <Link href="https://www.gatech.edu" target="_blank" rel="noopener noreferrer">
                Georgia Tech
              </Link>
              , where I focused on algorithms, networks, and systems.
            </Typography>
            <MetaText>Core stack</MetaText>
            <InlineList>
              {skills.map((skill) => (
                <InlineItem key={skill}>{skill}</InlineItem>
              ))}
            </InlineList>
          </Box>
        </AboutGrid>
      </Container>
    </Section>
  );
};

const AboutGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));
