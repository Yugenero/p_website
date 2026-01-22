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
  'JavaScript/TypeScript',
  'Java',
  'C#',
  'MongoDB',
  'Snowflake',
  'AWS',
  'Docker',
  'Node.js',
];

export const AboutSection = () => {
  return (
    <Section id="about">
      <Container>
        <SectionHeader>
          <MetaText className='h6'>00</MetaText>
          <SectionTitle variant="h2">/About</SectionTitle>
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
              These days I’m a Solutions Engineer at{' '}
              <Link href="https://www.fullstory.com" target="_blank" rel="noopener noreferrer">
                Fullstory
              </Link>
              , helping teams ship mobile AI + SDK integrations across iOS, Android, and
              React Native in real-world apps with an engineering + technical focus. Over the past year I’ve contributed to full-stack
              delivery on internal finance and asset management tools, focusing on clean
              information design, scalable data filtering, and dependable APIs.
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
