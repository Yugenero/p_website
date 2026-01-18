import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, MetaText, Section } from '../ui/primitives';

const ExperienceCard = styled('article')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.grey[900]}`,
  display: 'grid',
  gap: theme.spacing(2),
}));

const ExperienceMeta = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: theme.palette.grey[200],
}));

const ExperienceList = styled('ul')(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2.5),
  display: 'grid',
  gap: theme.spacing(1.5),
}));

const workExperiences = [
  {
    employer: 'Civic DX',
    location: 'Atlanta, GA',
    date: 'October 2024 - July 2025',
    title: 'Software Engineer',
    points: [
      'Built and scaled an internal asset-management dashboard for 20,000+ ABM Industries contractors using React, C#/.NET, MongoDB, and Snowflake.',
      'Led global state management and filtering architecture, shipping 30+ reusable UI components aligned to a common system.',
      'Designed SOLID-aligned CRUD APIs and data services to keep analytics and operational tooling consistent and reliable.',
    ],
  },
  {
    employer: 'eKlozet',
    location: 'Atlanta, GA',
    date: 'January 2022 - December 2022',
    title: 'Contract Software Development Intern',
    points: [
      'Developed a SQL data model supporting sustainable fashion workflows for 1,000+ users.',
      'Built a collaborative-filtering algorithm for outfit recommendations with measurable engagement lift.',
      'Shipped RESTful services and coordinated delivery through Git-based workflows.',
    ],
  },
  {
    employer: 'GT WebDev',
    location: 'Atlanta, GA',
    date: 'August 2020 - May 2021',
    title: 'Web Developer',
    points: [
      'Delivered Material UI experiences for HackGT projects in student-led teams.',
      'Maintained code integration standards to keep features shipping smoothly.',
      'Ran frontend workshops that grew attendance by 50% across the org.',
    ],
  },
];

export const Work = () => {
  return (
    <Section component="section" id="work">
      <Container>
        <Stack spacing={4} alignItems="flex-start">
          <MetaText component="p">Experience</MetaText>
          <Typography variant="h2" component="h2">
            Selected roles and impact.
          </Typography>
          <Stack spacing={3} width="100%">
            {workExperiences.map((experience) => (
              <ExperienceCard key={experience.employer}>
                <Stack spacing={1}>
                  <ExperienceMeta component="p">
                    {experience.date} · {experience.location}
                  </ExperienceMeta>
                  <Typography variant="h3" component="h3">
                    {experience.title} — {experience.employer}
                  </Typography>
                </Stack>
                <ExperienceList>
                  {experience.points.map((point) => (
                    <li key={point}>
                      <Typography variant="body2" component="p">
                        {point}
                      </Typography>
                    </li>
                  ))}
                </ExperienceList>
              </ExperienceCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
