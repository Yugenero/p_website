import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Container,
  LeadText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';
import Starfield from '../global/starfield';
import { BinaryMetaText } from '../ui/binaryMetaText';

const PhotoCard = ({ photo, index }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <PhotoCardFrame
      data-loaded={loaded}
      style={{ '--photo-delay': `${Math.min(index * 55, 360)}ms` }}
    >
      <PhotoItem
        src={photo.url}
        alt={photo.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error('Image load error:', e);
          setLoaded(true);
        }}
      />
    </PhotoCardFrame>
  );
};

/**
 * Tile layout for the photography page using pinterest inspired masonry grid
 * @param {*} param0 
 * @returns 
 */
const TileLayout = ({ photos }) => {
  return (
    <MasonryGrid>
      {photos.map((photo, index) => (
        <PhotoCard key={photo.url || index} photo={photo} index={index} />
      ))}
    </MasonryGrid>
  );
};

const Stuff = () => {
  const theme = useTheme();
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

  return (
    <PhotoWrap id="photography">
      <Starfield
        density={0.9}
        color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary}
        backgroundStops={['transparent', 'transparent']}
        maxDrift={0.6}
        ultraSubtle
        style={{ opacity: theme.palette.mode === 'dark' ? 0.4 : 0.18 }}
        forceWhite={true}
      />
      <PhotoContent>
        <SectionHeader>
          <BinaryMetaText value="0011" />
          <SectionTitle variant="h2">Stuff</SectionTitle>
          <PhotoLead>
            Stuff I find interesting.
          </PhotoLead>
        </SectionHeader>
        <MasonryStage aria-busy={loading}>
          {loading && (
            <LoadingOverlay>
              <LoadingStack>
                <LoadingSpinner aria-hidden="true" />
              </LoadingStack>
            </LoadingOverlay>
          )}
          {error && !loading && (
            <LoadingOverlay>
              <LoadingStack>
                <PhotoStatus variant="body2">Error loading images: {error}</PhotoStatus>
              </LoadingStack>
            </LoadingOverlay>
          )}
          <TileLayout photos={photos} />
        </MasonryStage>
      </PhotoContent>
    </PhotoWrap>
  );
};

export default Stuff;

const MasonryGrid = styled(Box)(({ theme }) => ({
  columnCount: 4,
  columnGap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    columnCount: 2,
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1,
  },
}));

const PhotoWrap = styled(Section)(() => ({
  position: 'relative',
  overflow: 'hidden',
}));

const PhotoContent = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const PhotoLead = styled(LeadText)(() => ({
  fontSize: '1.15rem',
}));

const PhotoStatus = styled(Typography)(() => ({
  fontSize: '1rem',
}));

const MasonryStage = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '50vh',
}));

const LoadingOverlay = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  textAlign: 'center',
}));

const LoadingStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: theme.palette.text.secondary,
}));

const LoadingSpinner = styled('div')(({ theme }) => ({
  width: 46,
  height: 46,
  borderRadius: '999px',
  border: `1px solid ${alpha(theme.palette.text.primary, 0.18)}`,
  borderTopColor: alpha(theme.palette.text.primary, 0.55),
  animation: 'photography-spin 1.2s linear infinite',
  '@keyframes photography-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
}));

const PhotoCardFrame = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '100%',
  marginBottom: theme.spacing(3),
  breakInside: 'avoid',
  WebkitColumnBreakInside: 'avoid',
  pageBreakInside: 'avoid',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0.6rem',
  overflow: 'hidden',
  backgroundColor: alpha(theme.palette.text.primary, 0.04),
  opacity: 0.2,
  transform: 'translateY(10px)',
  transitionProperty: 'opacity, transform',
  transitionDuration: '520ms',
  transitionTimingFunction: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
  transitionDelay: 'var(--photo-delay, 0ms)',
  '&[data-loaded="false"]': {
    minHeight: 200,
  },
  '&[data-loaded="true"]': {
    minHeight: 0,
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const PhotoItem = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  maxHeight: 'none',
  opacity: 0,
  transition: 'opacity 400ms ease',
  '[data-loaded="true"] &': {
    opacity: 1,
  },
}));
