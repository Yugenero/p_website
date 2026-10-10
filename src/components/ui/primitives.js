import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export const Page = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const Main = styled('main')(() => ({
  flex: 1,
  display: 'block',
}));

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const Section = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
  },
}));

export const MetaText = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  fontWeight: 600,
  fontSize: '0.72rem',
  color: theme.palette.text.secondary,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  marginTop: theme.spacing(1),
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: '3rem',
}));

export const LeadText = styled(Typography)(({ theme }) => ({
  fontSize: '1.05rem',
  color: theme.palette.text.secondary,
  maxWidth: 720,
}));

export const InlineList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

export const InlineItem = styled(Typography)(({ theme }) => ({
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  alignItems: 'center',
}));

// Small uppercase "go deeper" link, e.g. "Full experience →".
export const ArrowLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '& .arrow': {
    transition: 'transform 0.2s ease',
  },
  '&:hover .arrow, &:focus-visible .arrow': {
    transform: 'translateX(4px)',
  },
}));

// Section header with an optional action aligned to the right.
export const SectionHeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
  },
}));

// Tight section spacing for the information-dense landing page.
export const CompactSection = styled('section')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));
