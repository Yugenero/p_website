import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  CompactSection,
  Container,
  MetaText,
  SectionHeaderRow,
  SectionTitle,
} from '../ui/primitives';
import { BinaryMetaText } from '../ui/binaryMetaText';
import { education, skillGroups } from '../../data/profile';

// Grouped skills plus education, so the technical breadth reads at a glance.
export const Toolkit = () => (
  <CompactSection id="toolkit">
    <Container>
      <SectionHeaderRow>
        <Box>
          <BinaryMetaText value="0010" />
          <SectionTitle variant="h2">Toolkit</SectionTitle>
        </Box>
      </SectionHeaderRow>
      <Grid>
        {skillGroups.map((group) => (
          <Group key={group.label}>
            <GroupLabel component="h3">{group.label}</GroupLabel>
            <ItemList>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ItemList>
          </Group>
        ))}
      </Grid>
      <EducationRow>
        <MetaText component="p">Education</MetaText>
        <Typography variant="body1">
          <strong>{education.degree}</strong>, {education.school} · {education.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {education.coursework.join(' · ')}
        </Typography>
      </EducationRow>
    </Container>
  </CompactSection>
);

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  borderTop: `1px solid ${theme.palette.text.primary}`,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

const Group = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 3, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5, 2, 2.5, 0),
  },
}));

const GroupLabel = styled(MetaText)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const ItemList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: theme.spacing(0.5),
  fontSize: '0.98rem',
  lineHeight: 1.5,
}));

const EducationRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '11rem minmax(0, 1fr)',
  columnGap: theme.spacing(4),
  rowGap: theme.spacing(0.5),
  padding: theme.spacing(3, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& > p:first-of-type': {
    margin: 0,
    gridRow: 'span 2',
    paddingTop: theme.spacing(0.5),
  },
  '& > *:not(:first-of-type)': {
    gridColumn: 2,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    '& > p:first-of-type': {
      gridRow: 'auto',
    },
    '& > *:not(:first-of-type)': {
      gridColumn: 'auto',
    },
  },
}));
