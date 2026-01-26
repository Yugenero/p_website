import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container } from '../ui/primitives';

const FooterWrap = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  width: '100%',
}));

const FooterInner = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  maxWidth: '100%',
}));

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const SocialLink = styled('a')(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: 999,
  border: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.default,
  },
  '& svg': {
    fontSize: '1.25rem',
  },
}));

const Footer = () => {
  return (
    <FooterWrap>
      <FooterInner>
        <Box>
          <Typography variant="body2">© 2025 Nelson Rodriguez</Typography>
          <Typography variant="body2" color="text.secondary">
            Currently Atlanta, GA · nelsonrodriguez.me
          </Typography>
        </Box>
        <SocialList>
          <SocialLink href="mailto:neroxv1313@gmail.com" aria-label="Email">
            <EmailRoundedIcon />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/nelson-rodriguez13/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </SocialLink>
          <SocialLink
            href="https://github.com/Yugenero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </SocialLink>
        </SocialList>
      </FooterInner>
    </FooterWrap>
  );
};

export default Footer;
