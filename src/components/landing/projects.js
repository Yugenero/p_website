import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
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
  // {
  //   title: 'Empty Card',
  //   description:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\s... ',
  //   stack: ['Swift', 'SQL', 'iOS'],
  //   link: 'https://nelsonrodriguez.me',
  // },
  // {
  //   title: 'Empty Card',
  //   description:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\s... ',
  //   stack: ['Swift', 'SQL', 'iOS'],
  //   link: 'https://nelsonrodriguez.me',
  // },
];

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <SectionHeader>
          <MetaText>10</MetaText>
          <SectionTitle variant="h2">&lt;projects&gt;</SectionTitle>
        </SectionHeader>
        <ProjectGrid>
          {projects.map((project) => (
            <StyledTooltip
              key={project.title}
              title="Github"
              placement="top"
              arrow
              followCursor
              TransitionProps={{ timeout: 200 }}
            >
              <ProjectCard 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProjectHeader>
                  <ProjectTitle variant="h3">{project.title}</ProjectTitle>
                  <Typography variant="body2" color="inherit">
                    {project.description}
                  </Typography>
                </ProjectHeader>
                <Box>
                  <InlineList>
                    {project.stack.map((item) => (
                      <ProjectMetaItem key={item}>{item}</ProjectMetaItem>
                    ))}
                  </InlineList>
                </Box>
              </ProjectCard>
            </StyledTooltip>
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
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
  },
}));

const ProjectCard = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.background.default,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 240,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0.5rem',
  gap: theme.spacing(3),
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    minHeight: 'auto',
  },
}));

const ProjectHeader = styled(Box)(({ theme }) => ({
  // No margin needed here
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontFamily: '"Lora", "Times New Roman", Times, serif',
    fontSize: '1.75rem',
    padding: theme.spacing(2, 3),
    borderRadius: '0.6rem',
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
  },
  '& .MuiTooltip-arrow': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
}));

const ProjectMetaItem = styled(InlineItem)(({ theme }) => ({
  color: theme.palette.mode === 'light' 
    ? theme.palette.background.default 
    : '#AAAAAA',
}));

export default Projects;
