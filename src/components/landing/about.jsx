import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Halftone from '../global/halftone';

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
import { BinaryMetaText } from '../ui/binaryMetaText';
import { education, skillGroups } from '../../data/profile';

const skills = skillGroups.flatMap((group) => group.items).slice(0, 14);

export const AboutSection = () => {
  return (
    <AboutWrap id="about">
      <Halftone />
      <AboutContent>
        <SectionHeader>
          <BinaryMetaText value="0000" />
          <SectionTitle variant="h2">About</SectionTitle>
        </SectionHeader>
        <AboutGrid>
          <Box>
            <AboutLead>
              I enjoy engineering, computers, and building software that brings clarity to complexity. 
              Performance and great user experience guide my work.
            </AboutLead>
          </Box>
          <Box>
            <AboutParagraph variant="body1" paragraph>
              These days I’m a Solutions Engineer at{' '}
              <Link
                href="https://www.fullstory.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontWeight: 700 }}
              >
                Fullstory
              </Link>
              , a technical + customer-facing solutions engineering role. Most of my time goes to working with
              customer engineering teams in their own codebases to implement the Fullstory Mobile SDK and
              build proofs of concept as well as building out AI/automation workflows and internal
              tools for our team. Before that I was a Software Engineer at Civic Digital Experience, building
              React + C#/.NET internal finance and asset-management tools with a focus on clean information
              design, fast data filtering, and dependable APIs.
            </AboutParagraph>
            <AboutParagraph variant="body1" paragraph>
              I also hold a B.S. in Computer Science from the {' '}
              <GeorgiaTechLink href={education.collegeUrl} target="_blank" rel="noopener noreferrer">
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
      </AboutContent>
    </AboutWrap>
  );
};

const AboutWrap = styled(Section)(() => ({
  position: 'relative',
  overflow: 'hidden',
}));

const AboutContent = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

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
  fontSize: '1.2rem',
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
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 700,
  whiteSpace: 'nowrap',
}));
