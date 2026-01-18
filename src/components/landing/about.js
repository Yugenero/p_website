import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, InlineLink, MetaText, Section } from '../ui/primitives';

const SkillsGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: theme.spacing(2),
}));

const SkillItem = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
}));

const AboutSection = () => {
  return (
    <Section component="section" id="about">
      <Container>
        <Stack spacing={4} alignItems="flex-start">
          <MetaText component="p">About</MetaText>
          <Typography variant="h2" component="h2">
            Building systems that people actually use.
          </Typography>
          <Typography variant="body1">
            Hi, I’m Nelson — a software engineer focused on building dependable products and internal systems. Most recently, I led frontend
            and platform work for an internal asset-management dashboard serving 20,000+ contractors at{' '}
            <InlineLink href="https://civicdx.com" target="_blank" rel="noopener noreferrer">
              Civic DX
            </InlineLink>
            . I build data-heavy interfaces, clean APIs, and thoughtful UI systems that scale with teams.
          </Typography>
          <Typography variant="body1">
            I hold a B.S. in Computer Science from{' '}
            <InlineLink
              href="https://www.parchment.com/u/award/cdc63a097762a059103a9b3ce857a15e"
              target="_blank"
              rel="noopener noreferrer"
            >
              Georgia Tech
            </InlineLink>
            , where I focused on algorithms, computing systems, and applied math.
          </Typography>
          <Stack spacing={2} width="100%">
            <MetaText component="p">Tooling & Platforms</MetaText>
            <SkillsGrid>
              {[
                'React',
                'TypeScript',
                'C# / .NET',
                'MongoDB',
                'Snowflake',
                'Node.js',
                'Python',
                'Docker',
                'AWS',
                'Swift',
                'D3.js',
                'Git',
              ].map((skill) => (
                <SkillItem key={skill}>{skill}</SkillItem>
              ))}
            </SkillsGrid>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};

export { AboutSection };
