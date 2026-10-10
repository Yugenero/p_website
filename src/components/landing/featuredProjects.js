import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import { projects } from '../../data/profile';

export const FeaturedProjects = ({ limit = 3 }) => (
  <CompactSection id="selected-projects">
    <Container>
      <SectionHeaderRow>
        <Box>
          <BinaryMetaText value="0011" />
          <SectionTitle variant="h2">Selected projects</SectionTitle>
        </Box>
        <ArrowLink component={RouterLink} to="/projects">
          All projects <span className="arrow">→</span>
        </ArrowLink>
      </SectionHeaderRow>
      <Grid>
        {projects.slice(0, limit).map((project) => (
          <Card key={project.title} href={project.link} target="_blank" rel="noopener noreferrer">
            <MetaText component="p">
              {[project.kind, project.date].filter(Boolean).join(' · ')}
            </MetaText>
            <CardTitle variant="h3">
              {project.title} <span className="arrow" aria-hidden="true">↗</span>
            </CardTitle>
            <Typography variant="body2" sx={{ lineHeight: 1.55, flex: 1 }}>
              {project.description}
            </Typography>
            <InlineList sx={{ gap: 1.25, rowGap: 0.5 }}>
              {project.stack.map((item) => (
                <InlineItem key={item}>{item}</InlineItem>
              ))}
            </InlineList>
          </Card>
        ))}
      </Grid>
    </Container>
  </CompactSection>
);

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}));

const Card = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  textDecoration: 'none',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  transition: 'border-color 0.2s ease, transform 0.2s ease',
  '& > p:first-of-type': {
    margin: 0,
  },
  '& .arrow': {
    display: 'inline-block',
    transition: 'transform 0.2s ease',
  },
  '&:hover, &:focus-visible': {
    borderColor: theme.palette.text.primary,
    transform: 'translateY(-2px)',
    '& .arrow': {
      transform: 'translate(2px, -2px)',
    },
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: 1.25,
}));
