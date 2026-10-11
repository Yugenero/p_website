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
import { BinaryMetaText } from '../ui/binaryMetaText';
import { education, workExperience } from '../../data/profile';

const companyTitleFont =
  '"Geist", "Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';

// Georgia Tech closes out the timeline on the full experience page.
const timeline = [
  ...workExperience,
  {
    employer: education.school,
    location: 'Atlanta, GA',
    date: education.date,
    title: 'CS Undergraduate',
    summary: `${education.degree} with a focus on algorithms, networks, and systems.`,
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
          <BinaryMetaText value="0001" />
          <SectionTitle variant="h2">Experience</SectionTitle>
        </SectionHeader>
        <WorkList>
          {timeline.map((experience) => (
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
  fontFamily: companyTitleFont,
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
