import { Link as RouterLink } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { Container, InlineLink, MetaText, Section } from '../ui/primitives';

const AboutPage = () => {
  return (
    <Section component="section">
      <Container>
        <Stack spacing={3} alignItems="flex-start">
          <MetaText component="p">About</MetaText>
          <Typography variant="h2" component="h1">
            A deeper look at the work and the person behind it.
          </Typography>
          <Typography variant="body1">
            This page is being refined. In the meantime, visit the photography archive for a quieter view of how I see the world.
          </Typography>
          <InlineLink component={RouterLink} to="/photography">
            Photography
          </InlineLink>
        </Stack>
      </Container>
    </Section>
  );
};

export { AboutPage };
