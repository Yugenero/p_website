import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Container } from '../ui/primitives';
import Starfield from './starfield';

const FooterWrap = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const FooterInner = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  maxWidth: '100%',
}));

const FooterContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const FooterName = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: '1.4rem',
}));

const SocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const SocialLink = styled('a')(({ theme }) => {
  const hoverBorderColor =
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

  return {
    width: '1.9rem',
    height: '1.9rem',
    borderRadius: '5px',
    border: '1px solid transparent',
    color: theme.palette.mode === 'dark' ? theme.palette.text.disabled : theme.palette.text.secondary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      borderColor: hoverBorderColor,
      color: hoverBorderColor,
    },
    '&:focus-visible': {
      borderColor: hoverBorderColor,
      color: hoverBorderColor,
      outlineOffset: '2px',
    },
    '& svg': {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '2.05rem',
      height: '2.05rem',
      '& svg': {
        fontSize: '1.2rem',
      },
    },
  };
});

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrap>
      <Starfield
        density={5}
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.4 : 0.18 }}
      />
      <FooterContent>
        <FooterInner>
          <Box>
            <FooterName variant="body2">© 2026 Nelson Rodriguez</FooterName>
            <Typography variant="body2" color="text.secondary">
              Atlanta, GA · nelsonrodriguez.me
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
            <SocialLink
              href="https://www.instagram.com/ne.ro.x/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </SocialLink>
          </SocialList>
        </FooterInner>
      </FooterContent>
    </FooterWrap>
  );
};

export default Footer;
