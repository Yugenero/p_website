import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import Halftone from '../global/halftone';
import { metalOn, metalText } from '../global/profileParts';
import { useCursorTip } from '../global/cursorTip';
import { projects } from '../../data/profile';

// Home page: a tiled feed of projects. The first tile spans the full width like a cover; the rest pair up
// two to a row (an odd one out spans the row). Each tile is a link to the project's repo, with the halftone
// as texture, a big title, and the details set small in mono.

const MONO_FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const ProjectFeed = () => (
  <Feed aria-labelledby="feed-title">
    <VisuallyHidden as="h1" id="feed-title">
      Selected projects
    </VisuallyHidden>
    {projects.map((project, index) => (
      <ProjectTile key={project.title} project={project} index={index} />
    ))}
  </Feed>
);

// Hovering a tile shows where it leads ("View on GitHub") in the cursor tag.
const tipLabel = (link) => (link.includes('github.com') ? 'View on GitHub' : 'Open project');

const ProjectTile = ({ project, index }) => {
  const { handlers, tip } = useCursorTip(tipLabel(project.link));
  return (
    <Tile
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-lead={index === 0 || undefined}
      {...handlers}
    >
      {tip}
      <Halftone />
      <TileTop>
        <Meta>
          {String(index + 1).padStart(2, '0')} :: {project.kind}
        </Meta>
        {project.date && <Meta>{project.date}</Meta>}
      </TileTop>
      <TileBottom>
        <Title>{project.title}</Title>
        <Details>
          <Description>{project.description}</Description>
          <Stack>
            {project.stack.slice(0, -1).map((item) => `${item} · `)}
            {/* The last item and the arrow stay together so the arrow never wraps onto its own line. */}
            <span className="tile-last">
              {project.stack[project.stack.length - 1]}
              <span className="tile-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </Stack>
        </Details>
      </TileBottom>
    </Tile>
  );
};

const Feed = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing(1.5),
  padding: theme.spacing(3),
  // The pairs fill the rows after the lead tile; a last tile without a partner takes the whole row.
  '& > a:last-child:nth-of-type(even)': {
    gridColumn: '1 / -1',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    padding: theme.spacing(2),
  },
}));

const VisuallyHidden = styled('span')(() => ({
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}));

// Also used by the phone intro's typed-line panel (mobileIntro.jsx), so it matches the tiles.
export const tileTint = (theme) => alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.05 : 0.04);

const Tile = styled('a')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  minHeight: 'clamp(300px, 44vh, 460px)',
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  textDecoration: 'none',
  // The tint is layered over the page color so the tile is opaque: the dark-mode starfield behind the feed shows
  // around the tiles, not through them.
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${tileTint(theme)}, ${tileTint(theme)})`,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'border-color 0.25s ease',
  '& > *:not(canvas)': {
    position: 'relative',
    zIndex: 1,
  },
  '& .tile-arrow': {
    display: 'inline-block',
    marginLeft: theme.spacing(1.5),
    transition: 'transform 0.25s ease',
  },
  '&:hover, &:focus-visible': {
    borderColor: theme.palette.text.primary,
    '& .tile-arrow': {
      transform: 'translate(3px, -3px)',
    },
  },
  '&[data-lead]': {
    gridColumn: '1 / -1',
    minHeight: 'clamp(380px, 64vh, 680px)',
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4),
  },
  // Phones: tiles size to their content (with a fixed gap under the meta row) so the feed isn't mostly blank.
  [theme.breakpoints.down('md')]: {
    minHeight: 0,
    gap: theme.spacing(6),
    padding: theme.spacing(2.5),
    '&[data-lead]': {
      minHeight: 0,
      gap: theme.spacing(9),
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& .tile-arrow': {
      transition: 'none',
    },
  },
}));

// Kind on the left, date on the right; on narrow tiles the date drops to its own line instead of breaking.
const TileTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: theme.spacing(0.5, 2),
}));

const Meta = styled('span')(({ theme }) => ({
  whiteSpace: 'nowrap',
  fontFamily: MONO_FONT,
  fontSize: '0.78rem',
  color: theme.palette.text.secondary,
}));

const TileBottom = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

// Serif, like the name and page titles. Tracking only slightly tight: the serif doesn't need the sans's squeeze.
const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 400,
  fontSize: 'clamp(2rem, 3.4vw, 3.2rem)',
  lineHeight: 1,
  letterSpacing: '-0.01em',
  // Hovering (or focusing) the tile turns the title brushed chrome, like the sidebar name. Sized to the text, so the
  // gradient spans the words rather than the whole tile.
  width: 'fit-content',
  maxWidth: '100%',
  ...metalText(theme),
  '@media (hover: hover)': {
    'a:hover > div > &': metalOn,
  },
  'a:focus-visible > div > &': metalOn,
  'a[data-lead] &': {
    fontSize: 'clamp(2.6rem, 6.4vw, 6rem)',
  },
}));

// Description above the stack; only the wide lead tile puts them side by side.
const Details = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('lg')]: {
    'a[data-lead] &': {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
    },
  },
}));

const Description = styled('p')(({ theme }) => ({
  margin: 0,
  maxWidth: '48ch',
  fontFamily: MONO_FONT,
  fontSize: '0.8rem',
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
}));

const Stack = styled('p')(({ theme }) => ({
  margin: 0,
  '& .tile-last': {
    whiteSpace: 'nowrap',
  },
  flexShrink: 0,
  fontFamily: MONO_FONT,
  fontSize: '0.78rem',
  color: theme.palette.text.primary,
}));
