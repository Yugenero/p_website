import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  Container,
  LeadText,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';

/**
 * Tile layout for the photography page using masonry grid
 * @param {*} param0 
 * @returns 
 */
const TileLayout = ({ photos }) => {
  return (
    <MasonryGrid>
      {photos.map((photo, index) => (
        <PhotoItem
          key={index}
          src={photo.url}
          alt={photo.name}
          loading="lazy"
          onError={(e) => console.error('Image load error:', e)}
        />
      ))}
    </MasonryGrid>
  );
};

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://us-central1-angelic-center-419421.cloudfunctions.net/getPhotos')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Section>
        <Container>
          <Typography variant="body1">Loading photography archive…</Typography>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container>
          <Typography variant="body1">Error loading images: {error}</Typography>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="photography">
      <Container>
        <SectionHeader>
          <MetaText>Photography</MetaText>
          <SectionTitle variant="h2">Field notes</SectionTitle>
          <LeadText>
            A quiet archive of light, motion, and framing. Updated as I move.
          </LeadText>
        </SectionHeader>
        <TileLayout photos={photos} />
      </Container>
    </Section>
  );
};

export default Photography;

const MasonryGrid = styled(Box)(({ theme }) => ({
  columnCount: 3,
  columnGap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    columnCount: 2,
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1,
  },
}));

const PhotoItem = styled('img')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  breakInside: 'avoid',
  border: `1px solid ${theme.palette.grey[200]}`,
}));
