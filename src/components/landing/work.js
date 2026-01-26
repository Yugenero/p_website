import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import {
  Container,
  InlineItem,
  InlineList,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';
import Starfield from '../global/starfield';

const workExperience = [
  {
    employer: 'Fullstory, Inc.',
    location: 'Atlanta, GA',
    date: 'Dec 2025 - Present',
    title: 'Solutions Engineer',
    summary:
      'Mobile AI & SDK development + Implementation across iOS, Android, and React Native into real-world cross-platform applications.',
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
      'Built item-item collaborative filtering recommendations and bi-directional Google Calendar sync for 10,000+ users.',
      'Designed the SQL schema and ETL pipeline that merged usage logs, catalog data, and preferences with sub-5ms retrieval.',
      'Ran Agile delivery with Git and Jira, and placed 2nd out of 30+ teams at the 2022 GT CS Capstone Expo.',
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
      'Hosted front-end workshops that grew attendance by 50%.',
    ],
    stack: ['React', 'MUI', 'Git'],
  },
  {
    employer: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    date: 'Aug 2020 — Dec 2023',
    title: 'CS Undergraduate',
    summary:
      'B.S. Computer Science with a focus on algorithms, networks, and systems.',
    highlights: [],
    stack: ['Computer Science'],
  },
];

// Work section object
export const WorkSection = () => {
  const theme = useTheme();

  return (
    <WorkWrap id="work">
      <Starfield
        density={20}
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.4 : 0.18 }}
        forceWhite={true}
      />
      <WorkContent>
        <SectionHeader>
          <MetaText>01</MetaText>
          <SectionTitle variant="h2">Experience</SectionTitle>
        </SectionHeader>
        <WorkList>
          {workExperience.map((experience) => (
            <WorkItem key={experience.employer}>
              <MetaText>{experience.date}</MetaText>
              <WorkTitle variant="h3">
                {experience.title} · {experience.employer}
              </WorkTitle>
              <WorkLocation variant="body2" color="text.secondary">
                {experience.location}
              </WorkLocation>
              <WorkSummary variant="body1" paragraph>
                {experience.summary}
              </WorkSummary>
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
      </WorkContent>
    </WorkWrap>
  );
};

const WorkWrap = styled(Section)(() => ({
  position: 'relative',
  overflow: 'hidden',
}));

const WorkContent = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

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

const WorkTitle = styled(Typography)(() => ({
  fontSize: '1.6rem',
  fontWeight: '300',
}));

const WorkLocation = styled(Typography)(() => ({
  fontSize: '0.98rem',
}));

const WorkSummary = styled(Typography)(() => ({
  fontSize: '1.06rem',
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
  fontSize: '1rem',
  '&::before': {
    content: '"—"',
    position: 'absolute',
    left: 0,
    color: theme.palette.text.secondary,
  },
}));
