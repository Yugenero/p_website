import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  ArrowLink,
  CompactSection,
  Container,
  InlineItem,
  InlineList,
  MetaText,
  SectionHeaderRow,
  SectionTitle,
} from '../ui/primitives';
import { BinaryMetaText } from '../ui/binaryMetaText';
import { workExperience } from '../../data/profile';

// Condensed timeline: one scannable row per role. Full bullets live on /work.
export const ExperienceSummary = ({ limit = 3 }) => (
  <CompactSection id="experience">
    <Container>
      <SectionHeaderRow>
        <Box>
          <BinaryMetaText value="0001" />
          <SectionTitle variant="h2">Experience</SectionTitle>
        </Box>
        <ArrowLink component={RouterLink} to="/work">
          Full experience <span className="arrow">→</span>
        </ArrowLink>
      </SectionHeaderRow>
      <Timeline>
        {workExperience.slice(0, limit).map((job) => (
          <Row key={job.employer}>
            <MetaText component="p">{job.date}</MetaText>
            <Box>
              <RoleTitle variant="h3">
                {job.title} <Employer component="span">· {job.employer}</Employer>
              </RoleTitle>
              <RoleSummary variant="body1">{job.summary}</RoleSummary>
              {job.highlights[0] && (
                <KeyResult variant="body2" color="text.secondary">
                  {job.highlights[0]}
                </KeyResult>
              )}
            </Box>
            <StackList>
              {job.stack.map((item) => (
                <InlineItem key={item}>{item}</InlineItem>
              ))}
            </StackList>
          </Row>
        ))}
      </Timeline>
    </Container>
  </CompactSection>
);

const Timeline = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.text.primary}`,
}));

const Row = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '11rem minmax(0, 1fr) 16rem',
  gap: theme.spacing(4),
  padding: theme.spacing(3, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& > p': {
    margin: 0,
    paddingTop: theme.spacing(0.75),
  },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '10rem minmax(0, 1fr)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(1.25),
  },
}));

const RoleTitle = styled(Typography)(() => ({
  fontFamily: '"Geist", "Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: 1.3,
}));

const Employer = styled(Typography)(({ theme }) => ({
  font: 'inherit',
  color: theme.palette.text.secondary,
}));

const RoleSummary = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.75),
  fontSize: '1rem',
  lineHeight: 1.55,
}));

const KeyResult = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(1),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.55,
  '&::before': {
    content: '"—"',
    position: 'absolute',
    left: 0,
  },
}));

const StackList = styled(InlineList)(({ theme }) => ({
  gap: theme.spacing(1.25),
  rowGap: theme.spacing(0.5),
  alignContent: 'flex-start',
  paddingTop: theme.spacing(0.75),
  [theme.breakpoints.down('lg')]: {
    gridColumn: '2',
    paddingTop: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridColumn: 'auto',
  },
}));
