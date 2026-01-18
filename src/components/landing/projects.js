import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, InlineLink, MetaText, Section } from '../ui/primitives';

const ProjectGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: theme.spacing(3),
}));

const ProjectCard = styled('article')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.grey[900]}`,
  display: 'grid',
  gap: theme.spacing(2),
  minHeight: '100%',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
  },
}));

const ProjectTech = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[200],
  fontSize: '0.85rem',
}));

const projects = [
  {
    title: 'Ikigai.ai Mobile Application',
    description:
      "A React Native app that helps users map purpose, skills, and passions into actionable paths. Focused on onboarding flow and AI-driven insights.",
    tech: ['React Native', 'NativeWind', 'Firebase'],
    link: 'https://github.com/Yugenero/Ikigai.ai',
  },
  {
    title: 'Nexus — Blogging Web App',
    description:
      'A full-stack blogging platform with React, Express, and MongoDB, featuring secure authentication, optimized content delivery, and modular UI building blocks.',
    tech: ['React', 'Express.js', 'MongoDB'],
    link: 'https://github.com/Yugenero/Nexus',
  },
  {
    title: 'Running Sonification Simulator',
    description:
      'A research prototype that turns biometric cadence data into real-time audio cues for training and performance improvement.',
    tech: ['Data Sonification', 'Sensor Streams', 'Research'],
    link: 'https://github.com/Yugenero/RodriguezNelson_Simulator',
  },
  {
    title: 'eKlozet — Sustainable Fashion iOS App',
    description:
      'A student-built sustainable fashion platform with outfit recommendation logic and scalable wardrobe management.',
    tech: ['Swift', 'SQL', 'Agile Delivery'],
    link: 'https://github.com/allisonfain08/team2120',
  },
];

const Projects = () => {
  return (
    <Section component="section" id="projects">
      <Container>
        <Stack spacing={4} alignItems="flex-start">
          <MetaText component="p">Projects</MetaText>
          <Typography variant="h2" component="h2">
            Selected work, built with intention.
          </Typography>
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectCard key={project.title}>
                <Stack spacing={2}>
                  <Typography variant="h3" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {project.description}
                  </Typography>
                  <MetaText component="p">Tech Stack</MetaText>
                  <ProjectTech component="p">{project.tech.join(' • ')}</ProjectTech>
                  <InlineLink href={project.link} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </InlineLink>
                </Stack>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </Stack>
      </Container>
    </Section>
  );
};

export default Projects;
