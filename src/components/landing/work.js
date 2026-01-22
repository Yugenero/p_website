import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  Container,
  InlineItem,
  InlineList,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';

const workExperience = [
  {
    employer: 'Fullstory, Inc.',
    location: 'Atlanta, GA',
    date: 'Dec 2025 - Present',
    title: 'Solutions Engineer',
    summary:
      'Developing/Integrating Fullstory Mobile SDK into enterprise applications and building tooling to validate SDK implementations across ',
    // highlights: [
    //     'Integrated FullStory\'s Mobile SDK into enterprise iOS, Android, and React Native codebases, implementing type-safe events, identity mapping, and privacy configurations.',
    //     'Built automated SDK validation tooling in TypeScript to verify network traffic, event payloads, and session replay accuracy.',
    //     'Developed and maintained internal React Native demo apps used by Sales and Product to showcase advanced session replay and behavioral analytics.',
    //     'Reproduced customer-reported SDK issues by creating minimal repro environments and structured bug reports with logs and stack traces.',
    //   ],
    highlights: [
      ''
    ],
    stack: ['TypeScript/JavaScript', 'Java', 'Swift/Swift UI'],
  },
  {
    employer: 'Civic Digital Experience, Inc.',
    location: 'Atlanta, GA',
    date: 'Oct 2024 — Jul 2025',
    title: 'Software Engineer',
    summary:
      'Built internal finance and asset management tools for 20,000+ ABM contractors, focused on data fidelity and operational clarity.',
    highlights: [
      'Led the React + C#/.NET feature backlog for an internal dashboard spanning assets, operations, and business metrics.',
      'Designed a global data filtering pipeline and delivered 30+ reusable UI components integrated with backend APIs.',
      'Built scalable CRUD services aligned with SOLID and clean architecture practices.',
    ],
    stack: ['React', 'C#/.NET', 'MongoDB', 'Snowflake'],
  },
  {
    employer: 'eKlozet Designer Consignment',
    location: 'Atlanta, GA',
    date: 'Jan 2022 — Dec 2022',
    title: 'Software Engineer Intern',
    summary:
      'Built a sustainable fashion iOS platform with personalization and data-driven wardrobe intelligence.',
    highlights: [
      'Developed a collaborative-filtering algorithm for personalized outfit recommendations.',
      'Designed SQL data models and REST APIs to support CRUD functionality.',
      'Partnered with cross-functional teammates to deliver production-ready mobile workflows.',
    ],
    stack: ['Swift', 'SQL', 'REST APIs'],
  },
  {
    employer: 'GT WebDev',
    location: 'Atlanta, GA',
    date: 'Aug 2020 — May 2021',
    title: 'Web Developer',
    summary:
      'Contributed to student-led web apps and taught front-end workflows across campus teams.',
    highlights: [
      'Built MUI-driven UI features for HackGT web experiences.',
      'Managed version control and integration across distributed teams.',
      'Hosted front-end workshops that grew attendance by 50%.',
    ],
    stack: ['React', 'MUI', 'Git'],
  },
];

// Work section object
export const WorkSection = () => {
  return (
    <Section id="work">
      <Container>
        <SectionHeader>
          <MetaText>01</MetaText>
          <SectionTitle variant="h2">/Experience</SectionTitle>
        </SectionHeader>
        <WorkList>
          {workExperience.map((experience) => (
            <WorkItem key={experience.employer}>
              <MetaText>{experience.date}</MetaText>
              <Typography variant="h3">
                {experience.title} · {experience.employer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {experience.location}
              </Typography>
              <Typography variant="body1" paragraph>
                {experience.summary}
              </Typography>
              <Highlights>
                {experience.highlights.map((point) => (
                  <HighlightItem key={point}>{point}</HighlightItem>
                ))}
              </Highlights>
              <InlineList>
                {experience.stack.map((item) => (
                  <InlineItem key={item}>{item}</InlineItem>
                ))}
              </InlineList>
            </WorkItem>
          ))}
        </WorkList>
      </Container>
    </Section>
  );
};

const WorkList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
  },
}));

const WorkItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const Highlights = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(1.5),
  },
}));

const HighlightItem = styled(Typography)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(3),
  '&::before': {
    content: '"—"',
    position: 'absolute',
    left: 0,
    color: theme.palette.text.secondary,
  },
}));
