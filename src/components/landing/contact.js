import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowLink, CompactSection, Container, MetaText } from '../ui/primitives';
import { BinaryMetaText } from '../ui/binaryMetaText';
import { profile } from '../../data/profile';

const exploreLinks = [
  { label: 'About me', to: '/about' },
  { label: 'Experience', to: '/work' },
  { label: 'Projects', to: '/projects' },
  { label: 'Photography', to: '/photography' },
];

// Closing call to action + routes into the deeper pages.
export const ContactBand = () => (
  <CompactSection id="contact">
    <Container>
      <Grid>
        <Box>
          <BinaryMetaText value="0100" />
          <Headline variant="h2">Let&apos;s build something useful.</Headline>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mt: 1.5 }}>
            I&apos;m looking for my next engineering role. The fastest way to reach me is email.
          </Typography>
          <Actions>
            <Button variant="contained" href={`mailto:${profile.email}`}>
              {profile.email}
            </Button>
            <Button variant="outlined" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Button>
            <Button variant="outlined" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          </Actions>
        </Box>
        <Explore component="nav" aria-label="Explore the site">
          <MetaText component="p">Explore</MetaText>
          {exploreLinks.map((link) => (
            <ExploreLink key={link.to} component={RouterLink} to={link.to}>
              {link.label} <span className="arrow">→</span>
            </ExploreLink>
          ))}
        </Explore>
      </Grid>
    </Container>
  </CompactSection>
);

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.6fr) minmax(220px, 1fr)',
  gap: theme.spacing(8),
  alignItems: 'end',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(5),
  },
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  marginTop: theme.spacing(1),
}));

const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(3),
}));

const Explore = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${theme.palette.text.primary}`,
  '& > p': {
    margin: 0,
    padding: theme.spacing(1.5, 0),
  },
}));

const ExploreLink = styled(ArrowLink)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  fontSize: '0.95rem',
}));
