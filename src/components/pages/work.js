import { Stack, Typography } from '@mui/material';
import { Container, MetaText, Section } from '../ui/primitives';

const WorkPage = () => {
  return (
    <Section component="section">
      <Container>
        <Stack spacing={3} alignItems="flex-start">
          <MetaText component="p">Work</MetaText>
          <Typography variant="h2" component="h1">
            Case studies and detailed write-ups are in progress.
          </Typography>
          <Typography variant="body1">
            For now, the homepage includes a curated list of recent roles and responsibilities.
          </Typography>
        </Stack>
      </Container>
    </Section>
  );
};

export { WorkPage };
