import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, InlineLink, MetaText } from '../ui/primitives';

const FooterWrapper = styled('footer')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.background.paper,
}));

const FooterLinks = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  flexWrap: 'wrap',
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Stack spacing={3}>
          <MetaText component="p">Connect</MetaText>
          <FooterLinks direction="row">
            <InlineLink href="/documents/NelsonRodriguez2025.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </InlineLink>
            <InlineLink href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </InlineLink>
            <InlineLink href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer">
              GitHub
            </InlineLink>
            <InlineLink href="mailto: neroxv1313@gmail.com">Email</InlineLink>
          </FooterLinks>
          <Typography variant="body2">
            Built in React. © 2025 Nelson Rodriguez.
          </Typography>
        </Stack>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
