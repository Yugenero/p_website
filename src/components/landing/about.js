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
  'Firebase',
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
          <SectionTitle variant="h2">&lt;about&gt;</SectionTitle>
        </SectionHeader>
        <AboutGrid>
          <Box>
            <AboutLead>
              I enjoy computers and building software that brings clarity to complexity.
            </AboutLead>
          </Box>
          <Box>
            <AboutParagraph variant="body1" paragraph>
              These days I’m a Solutions Engineer with a technical + software focus at{' '}
              <Link
                href="https://www.fullstory.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontWeight: 700 }}
              >
                Fullstory
              </Link>
              , helping our specialist team ship mobile AI + SDK integrations across iOS, Android, and
              React Native in real-world applications. Over the past year I’ve contributed to full-stack
              delivery as a Software Engineer on internal finance and asset management tools, focusing on clean
              information design, scalable data filtering, and dependable APIs.
            </AboutParagraph>
            <AboutParagraph variant="body1" paragraph>
              I also hold a B.S. in Computer Science from the {' '}
              <GeorgiaTechLink href="https://www.gatech.edu" target="_blank" rel="noopener noreferrer">
                Georgia Institute of Technology
              </GeorgiaTechLink>
              ,{' '} where I focused on algorithms, networks, and systems.
            </AboutParagraph>
            <CoreStackLabel>Core stack</CoreStackLabel>
            <SkillsList>
              {skills.map((skill) => (
                <InlineItem key={skill}>{skill}</InlineItem>
              ))}
            </SkillsList>
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
    gap: theme.spacing(4),
  },
}));

const AboutLead = styled(LeadText)(() => ({
  fontSize: '1.2rem',
}));

const AboutParagraph = styled(Typography)(() => ({
  fontSize: '1.05rem',
}));

const CoreStackLabel = styled(MetaText)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'block',
}));

const SkillsList = styled(InlineList)(({ theme }) => ({
  gap: theme.spacing(1),
  rowGap: theme.spacing(0.5),
}));

const GeorgiaTechLink = styled(Link)(() => ({
  fontFamily: '"Roboto Slab", serif',
  fontWeight: 600,
}));
