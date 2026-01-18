import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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

const projects = [
  {
    title: 'Zenith - iOS Application',
    description:
      'React Native product helping users map purpose using structured prompts and AI-assisted insights. Focused on onboarding and recommendation flows.',
    stack: ['React Native', 'Firebase', 'NativeWind', 'OpenAI Vector API'],
    link: 'https://github.com/Yugenero/Zenith',
  },
  {
    title: 'Nexus Blogging Platform',
    description:
      'Full-stack publishing app with React hooks and Context, Express APIs, and MongoDB-backed authentication.',
    stack: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/Yugenero/Nexus',
  },
  {
    title: 'Running Sonification Simulator',
    description:
      'Research simulator that converts cadence and heart-rate streams into adaptive audio feedback for runners.',
    stack: ['JavaScript', 'Audio UX', 'Research'],
    link: 'https://github.com/Yugenero/RodriguezNelson_Simulator',
  },
  {
    title: 'eKlozet Sustainable Fashion',
    description:
      'Agile iOS app with outfit intelligence and wardrobe management, winning 2nd place at the GT Junior Design Expo.',
    stack: ['Swift', 'SQL', 'iOS'],
    link: 'https://github.com/allisonfain08/team2120',
  },
];

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <SectionHeader>
          <MetaText>Projects</MetaText>
          <SectionTitle variant="h2">Selected builds</SectionTitle>
        </SectionHeader>
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard key={project.title}>
              <Box>
                <Typography variant="h3">{project.title}</Typography>
                <Typography variant="body2" color="inherit">
                  {project.description}
                </Typography>
              </Box>
              <Box>
                <InlineList>
                  {project.stack.map((item) => (
                    <ProjectMetaItem key={item}>{item}</ProjectMetaItem>
                  ))}
                </InlineList>
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                  View repository
                </ProjectLink>
              </Box>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </Section>
  );
};

const ProjectGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
}));

const ProjectCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 240,
  border: `1px solid ${theme.palette.grey[900]}`,
  gap: theme.spacing(3),
}));

const ProjectLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontSize: '0.72rem',
  fontWeight: 600,
}));

const ProjectMetaItem = styled(InlineItem)(({ theme }) => ({
  color: theme.palette.grey[300],
}));

export default Projects;
