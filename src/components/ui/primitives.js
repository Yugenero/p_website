import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
  maxWidth: 1120,
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
  fontWeight: 600,
  marginTop: theme.spacing(1),
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

// InlineItem.defaultProps = {
//   component: 'span',
// };
