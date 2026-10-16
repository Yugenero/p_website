import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowLink, MetaText } from '../ui/primitives';
import { usePhotos } from '../global/usePhotos';
import { profile } from '../../data/profile';

const STRIP_SIZE = 4;

// A thin row of Nelson's own photographs, linking to /photography while that page is open.
// Renders nothing if the photo service is unavailable, so the hero never shows a broken state.
export const PhotoStrip = () => {
  const { photos, error } = usePhotos();

  if (error) return null;

  const items = photos.length
    ? photos.slice(0, STRIP_SIZE)
    : Array.from({ length: STRIP_SIZE }, () => null);

  return (
    <Strip aria-label="Photography preview">
      <StripHeader>
        <MetaText component="p">Photography</MetaText>
        {profile.photographyOpen && (
          <ArrowLink component={RouterLink} to="/photography">
            View all <span className="arrow">→</span>
          </ArrowLink>
        )}
      </StripHeader>
      <StripGrid
        {...(profile.photographyOpen
          ? { component: RouterLink, to: '/photography', 'aria-label': 'Open the photography page' }
          : {})}
      >
        {items.map((photo, index) => (
          <Thumb key={photo?.url || index} photo={photo} />
        ))}
      </StripGrid>
    </Strip>
  );
};

const Thumb = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <ThumbFrame data-loaded={loaded}>
      {photo && (
        <img src={photo.url} alt={photo.name || ''} loading="lazy" onLoad={() => setLoaded(true)} />
      )}
    </ThumbFrame>
  );
};

const Strip = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(3),
  },
}));

const StripHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  '& p': {
    margin: 0,
  },
}));

const StripGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${STRIP_SIZE}, minmax(0, 1fr))`,
  gap: theme.spacing(1.5),
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(1),
  },
}));

const ThumbFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 'clamp(110px, 15vh, 170px)',
  overflow: 'hidden',
  backgroundColor: theme.palette.divider,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // Monochrome at rest to match the palette; color returns on hover.
    filter: 'grayscale(1) contrast(1.05)',
    opacity: 0,
    transform: 'scale(1.02)',
    transition: 'opacity 0.5s ease, filter 0.4s ease, transform 0.6s ease',
  },
  '&[data-loaded="true"] img': {
    opacity: 1,
  },
  '&:hover img, a:focus-visible & img': {
    filter: 'grayscale(0) contrast(1)',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'clamp(100px, 28vw, 140px)',
  },
}));
