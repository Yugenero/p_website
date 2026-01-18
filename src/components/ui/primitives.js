import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
}));

export const Container = styled(Box)(({ theme }) => ({
  width: 'min(1100px, 92vw)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const Divider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.grey[200],
}));

export const MetaText = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export const InlineLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 600,
  letterSpacing: '0.02em',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease, text-decoration-color 0.2s ease',
  '&:hover': {
    opacity: 0.7,
    textDecoration: 'underline',
    textDecorationThickness: '2px',
  },
}));
