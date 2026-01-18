import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Container, InlineItem, InlineList } from '../ui/primitives';

const FooterWrap = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const FooterInner = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
}));

const FooterLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontSize: '0.72rem',
  fontWeight: 600,
}));

const Footer = () => {
  return (
    <FooterWrap>
      <FooterInner>
        <Box>
          <Typography variant="body2">© 2025 Nelson Rodriguez</Typography>
          <Typography variant="body2" color="text.secondary">
            Atlanta, GA · nelsonrodriguez.me
          </Typography>
        </Box>
        <InlineList>
          <InlineItem>
            <FooterLink href="mailto:neroxv1313@gmail.com">Email</FooterLink>
          </InlineItem>
          <InlineItem>
            <FooterLink
              href="https://www.linkedin.com/in/nelson-rodriguez13/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </FooterLink>
          </InlineItem>
          <InlineItem>
            <FooterLink
              href="https://github.com/Yugenero"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </FooterLink>
          </InlineItem>
        </InlineList>
      </FooterInner>
    </FooterWrap>
  );
};

export default Footer;
