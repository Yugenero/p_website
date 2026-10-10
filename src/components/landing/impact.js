import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Container, MetaText } from '../ui/primitives';
import { impactStats } from '../../data/profile';

// Four resume metrics in a hairline-divided strip directly under the hero.
export const ImpactStrip = () => (
  <StripWrap aria-label="Selected impact">
    <Container>
      <StripGrid>
        {impactStats.map((stat) => (
          <StatCell key={stat.label}>
            <StatValue>{stat.value}</StatValue>
            <MetaText component="p">{stat.label}</MetaText>
            <StatDetail variant="body2" color="text.secondary">
              {stat.detail}
            </StatDetail>
          </StatCell>
        ))}
      </StripGrid>
    </Container>
  </StripWrap>
);

const StripWrap = styled('section')(({ theme }) => ({
  position: 'relative',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StripGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

const StatCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
  padding: theme.spacing(4, 3),
  borderLeft: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': {
    borderLeft: 'none',
    paddingLeft: 0,
  },
  '& p': {
    margin: 0,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
    '&:nth-of-type(odd)': {
      borderLeft: 'none',
      paddingLeft: 0,
    },
    '&:nth-of-type(n + 3)': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 300,
  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
  lineHeight: 1,
  letterSpacing: '-0.02em',
}));

const StatDetail = styled(Typography)(() => ({
  fontSize: '0.86rem',
  lineHeight: 1.45,
}));
