import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
  const theme = useTheme();

  return (
    <ProjectsWrap id="projects">
      <Starfield
        density={15}
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.4 : 0.18 }}
        forceWhite={true}
      />
      <ProjectsContent>
        <SectionHeader>
          <MetaText>10</MetaText>
          <SectionTitle variant="h2">Projects</SectionTitle>
        </SectionHeader>
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProjectHeader>
                <ProjectTitle variant="h3">{project.title}</ProjectTitle>
                <ProjectDescription variant="body2" color="inherit">
                  {project.description}
                </ProjectDescription>
              </ProjectHeader>
              <Box>
                <InlineList>
                  {project.stack.map((item) => (
                    <ProjectMetaItem key={item}>{item}</ProjectMetaItem>
                  ))}
                </InlineList>
              </Box>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ProjectsContent>
    </ProjectsWrap>
  );
};

const ProjectsWrap = styled(Section)(() => ({
  position: 'relative',
  overflow: 'hidden',
}));

const ProjectsContent = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const ProjectGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
  },
}));

const ProjectCard = styled(Link)(({ theme }) => ({
  aspectRatio: '1 / 1',
  width: '100%',
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.background.default,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 'auto',
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
  fontSize: '1.5rem',
}));

const ProjectDescription = styled(Typography)(() => ({
  fontSize: '1rem',
}));

const ProjectMetaItem = styled(InlineItem)(({ theme }) => ({
  color: theme.palette.mode === 'light' 
    ? theme.palette.background.default 
    : '#AAAAAA',
}));

export default Projects;
