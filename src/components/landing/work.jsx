import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { alpha, keyframes, styled } from '@mui/material/styles';
import {
  Container,
  InlineItem,
  InlineList,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';
import Halftone from '../global/halftone';
import { FULLSTORY_GREEN, TECH_GOLD } from '../global/profileParts';
import { BinaryMetaText } from '../ui/binaryMetaText';
import { education, workExperience } from '../../data/profile';

const companyTitleFont =
  '"Geist", "Aeonik-Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';

// Georgia Tech closes out the timeline on the full experience page.
const timeline = [
  ...workExperience,
  {
    employer: education.school,
    url: education.collegeUrl,
    logo: education.logo,
    location: 'Atlanta, GA',
    date: education.date,
    title: 'CS Undergraduate',
    summary: `${education.degree} with a focus on algorithms, networks, and systems.`,
    highlights: [],
    stack: ['Computer Science'],
  },
];

// Scroll timeline: a rail pinned to the viewport beside the job list. The rail maps the whole list top-to-bottom
// and fills in as you read, with a soft glow that brightens toward the leading tip; when the fill reaches a job's
// diamond, the diamond appears and that job's date is highlighted. The rail is a straight SVG line from the first
// marker to the last, so the markers sit right on its ends.
const READ_LINE = 0.45; // where the "reading line" sits in the viewport at the top of the page
const MARKER_Y = 10; // px from an item's top to the point its marker represents (its date line)
const RAIL_GUTTER = { desktop: 48, mobile: 30 };
const RAIL_X = 5; // px from the gutter's left edge to the rail's center
const RAIL_INSET = 24; // px of breathing room above and below the pinned rail
const DIAMOND = 7; // side of a job's diamond marker (before the 45° turn)
const AURA_TAIL = 140; // px of glow behind the tip, fading from the tip back to nothing
const EASE = 0.14; // per-frame easing toward the scroll target; lower is smoother/slower

const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

const useScrollTimeline = ({ listRef, railRef, fillRef, markerRefs }) => {
  useEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    if (!list || !rail) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let markerFractions = [];
    let items = [];
    let railHeight = 0;
    let startY = 0; // first marker: where the line starts
    let endY = 0; // last marker: where the line ends
    let pathLength = 0;
    const track = rail.querySelector('[data-track]');
    const fillPath = fillRef.current;
    const auraPath = rail.querySelector('[data-aura]');
    const auraGradient = rail.querySelector('linearGradient');
    const tipGlow = rail.querySelector('[data-tip]');

    // How much of the line is filled when the reading position is at height y: the height covered since the first
    // marker, clamped to the line.
    const lengthAtY = (y) => Math.min(Math.max(y, startY), endY) - startY;
    let current = null;
    let target = 0;
    let frame = 0;

    const toFraction = (offsetInList) => clamp01(offsetInList / list.offsetHeight);

    // The reading line slides from READ_LINE to the bottom of the viewport as the page scrolls,
    // so the fill always reaches the last marker even when the page can't scroll that far.
    const computeTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? clamp01(window.scrollY / maxScroll) : 1;
      const readY = window.innerHeight * (READ_LINE + (1 - READ_LINE) * pageProgress);
      return toFraction(readY - list.getBoundingClientRect().top);
    };

    const render = () => {
      const length = lengthAtY(current * railHeight);
      const offset = String(Math.max(pathLength - length, 0));
      fillPath.style.strokeDashoffset = offset;
      auraPath.style.strokeDashoffset = offset;
      // The aura's gradient runs from transparent AURA_TAIL px above the tip to full strength at the tip.
      const tip = track.getPointAtLength(Math.min(Math.max(length, 0), pathLength));
      auraGradient.setAttribute('y1', String(tip.y - AURA_TAIL));
      auraGradient.setAttribute('y2', String(tip.y));
      tipGlow.style.transform = `translate3d(${tip.x}px, ${tip.y}px, 0)`;
      tipGlow.style.opacity = length > 0.5 ? '1' : '0';
      // A job counts as reached once the fill gets to its diamond: the diamond appears and the job's date lights up.
      markerFractions.forEach((fraction, i) => {
        const reached = String(current >= fraction - 0.001);
        if (markerRefs.current[i]) markerRefs.current[i].dataset.reached = reached;
        if (items[i]) items[i].dataset.reached = reached;
      });
    };

    const tick = () => {
      frame = 0;
      if (current === null || reduceMotion) {
        current = target;
      } else {
        current += (target - current) * EASE;
        if (Math.abs(target - current) < 0.0005) current = target;
      }
      render();
      if (current !== target) frame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = computeTarget();
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    // Pin the rail below the sticky header and lay the markers out along it.
    const measure = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
      rail.style.top = `${headerHeight + RAIL_INSET}px`;
      rail.style.height = `${Math.max(window.innerHeight - headerHeight - RAIL_INSET * 2, 120)}px`;
      railHeight = rail.offsetHeight;
      items = Array.from(list.querySelectorAll('[data-timeline-item]'));
      markerFractions = items.map((item) => toFraction(item.offsetTop + MARKER_Y));
      if (!markerFractions.length) return;

      // Rail line: straight down from the first marker to the last, so neither end has a stub past a marker.
      startY = markerFractions[0] * railHeight;
      endY = markerFractions.length > 1 ? markerFractions[markerFractions.length - 1] * railHeight : railHeight;
      const d = `M ${RAIL_X} ${startY} V ${endY}`;
      rail.querySelectorAll('path').forEach((path) => path.setAttribute('d', d));
      pathLength = track.getTotalLength();
      fillPath.style.strokeDasharray = String(pathLength);
      auraPath.style.strokeDasharray = String(pathLength);

      markerRefs.current.forEach((marker, i) => {
        if (!marker) return;
        const y = markerFractions[i] * railHeight;
        marker.style.top = `${y}px`;
        marker.style.left = `${RAIL_X}px`;
      });
      current = null; // snap to the new layout instead of easing from the old one
      onScroll();
    };

    measure();
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(list);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [listRef, railRef, fillRef, markerRefs]);
};

// Employer shown in a job title: its logo when there is one, otherwise the name; linked when
// the entry has a `url`.
const Employer = ({ experience }) => {
  const { employer, url, logo } = experience;
  const linkProps = { href: url, target: '_blank', rel: 'noopener noreferrer' };

  if (logo) {
    const mark = (
      <LogoMark
        role="img"
        aria-label={employer}
        style={{
          '--logo-src': `url(${logo.src})`,
          '--logo-ratio': logo.ratio,
          '--logo-descent': logo.descent ?? 0,
          '--logo-scale': logo.scale ?? 1,
        }}
      />
    );
    return (
      <LogoSlot>
        {url ? (
          <LogoLink {...linkProps} title={employer} data-tone={logo.tone}>
            {mark}
          </LogoLink>
        ) : (
          mark
        )}
      </LogoSlot>
    );
  }
  return url ? <EmployerLink {...linkProps}>{employer}</EmployerLink> : employer;
};

// Work section object
export const WorkSection = () => {
  const listRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const markerRefs = useRef([]);
  useScrollTimeline({ listRef, railRef, fillRef, markerRefs });

  return (
    <WorkWrap id="work">
      <Halftone />
      <WorkContent>
        <SectionHeader>
          <BinaryMetaText value="0001" />
          <SectionTitle variant="h2">Experience</SectionTitle>
        </SectionHeader>
        <Timeline>
          <RailGutter aria-hidden="true">
            <Rail ref={railRef}>
              <RailPath>
                <defs>
                  <linearGradient id="timeline-aura" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="0">
                    <stop offset="0" data-stop="tail" />
                    <stop offset="1" data-stop="tip" />
                  </linearGradient>
                  <filter id="timeline-aura-blur" x="-200%" y="-10%" width="500%" height="120%">
                    <feGaussianBlur stdDeviation="2.5" />
                  </filter>
                </defs>
                <path data-track />
                <path data-aura />
                <path ref={fillRef} data-fill />
              </RailPath>
              <RailTip data-tip />
              {timeline.map((experience, i) => (
                <RailMarker
                  key={experience.employer}
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  data-reached="false"
                />
              ))}
            </Rail>
          </RailGutter>
          <WorkList ref={listRef}>
            {timeline.map((experience) => (
              <WorkItem key={experience.employer} data-timeline-item>
                <MetaText data-timeline-date>{experience.date}</MetaText>
                <WorkTitle variant="h3">
                  {experience.title}
                  {'\u00A0· '}
                  <Employer experience={experience} />
                </WorkTitle>
                <WorkLocation variant="body2" color="text.secondary">
                  {experience.location}
                </WorkLocation>
                <WorkSummary variant="body1" paragraph>
                  {experience.summary}
                </WorkSummary>
                <Highlights>
                  {experience.highlights.map((point) => (
                    <HighlightItem key={point}>{point}</HighlightItem>
                  ))}
                </Highlights>
                <InlineList>
                  {experience.stack.map((item) => (
                    <InlineItem key={item}>{item}</InlineItem>
                  ))}
                </InlineList>
              </WorkItem>
            ))}
          </WorkList>
        </Timeline>
      </WorkContent>
    </WorkWrap>
  );
};

// `clip` (not `hidden`) so the sticky timeline rail still pins to the viewport.
const WorkWrap = styled(Section)(() => ({
  position: 'relative',
  overflow: 'clip',
}));

const WorkContent = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const Timeline = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'stretch',
}));

const RailGutter = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: RAIL_GUTTER.desktop,
  [theme.breakpoints.down('md')]: {
    width: RAIL_GUTTER.mobile,
  },
}));

// Pinned to the viewport; top/height are set from the header height in useScrollTimeline.
const Rail = styled('div')(() => ({
  position: 'sticky',
  top: 96,
  height: 'calc(100vh - 144px)',
  width: RAIL_X + DIAMOND * 2,
}));

// Track (divider color), aura and fill (drawn in with stroke-dashoffset as you scroll) share one path. The aura is
// a wider, blurred stroke whose gradient moves with the tip, so the glow is brightest at the leading edge.
// No viewBox: SVG units are CSS pixels, so the path lines up exactly with the diamonds and the tip glow.
const RailPath = styled('svg')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'visible',
  '& path': {
    fill: 'none',
    strokeWidth: 1,
    vectorEffect: 'non-scaling-stroke',
  },
  '& [data-track]': {
    stroke: theme.palette.divider,
  },
  '& [data-fill]': {
    stroke: theme.palette.text.primary,
  },
  '& [data-aura]': {
    stroke: 'url(#timeline-aura)',
    strokeWidth: 4,
    strokeLinecap: 'round',
    filter: 'url(#timeline-aura-blur)',
  },
  '& [data-stop="tail"]': {
    stopColor: theme.palette.text.primary,
    stopOpacity: 0,
  },
  '& [data-stop="tip"]': {
    stopColor: theme.palette.text.primary,
    stopOpacity: theme.palette.mode === 'dark' ? 0.45 : 0.32,
  },
}));

const tipPulse = keyframes`
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.2); }
`;

// The brightest point of the aura: a soft halo sitting on the tip of the fill, pulsing gently.
const RailTip = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  willChange: 'transform',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.text.primary, 0.55),
    boxShadow: `0 0 8px 3px ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.32 : 0.22)}`,
    filter: 'blur(1.5px)',
    transform: 'translate(-50%, -50%)',
    animation: `${tipPulse} 2.6s ease-in-out infinite`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&::after': { animation: 'none' },
  },
}));

// Each job is a small diamond centered on the rail, hidden until the fill reaches it; then it scales up into place
// at full strength (and hides again if you scroll back above it). `left`/`top` are the rail point (set in measure).
const RailMarker = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: DIAMOND,
  height: DIAMOND,
  marginLeft: -DIAMOND / 2,
  marginTop: -DIAMOND / 2,
  zIndex: 1,
  backgroundColor: theme.palette.text.primary,
  opacity: 0,
  transform: 'rotate(45deg) scale(0)',
  transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  '&[data-reached="true"]': {
    opacity: 1,
    transform: 'rotate(45deg) scale(1)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}));

const WorkList = styled(Box)(({ theme }) => ({
  position: 'relative', // items' offsetTop is measured from here
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
  },
}));

const WorkItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  // The date lights up once the timeline's fill reaches this job's diamond (set by useScrollTimeline).
  '& [data-timeline-date]': {
    transition: 'color 0.3s ease',
  },
  '&[data-reached="true"] [data-timeline-date]': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& [data-timeline-date]': { transition: 'none' },
  },
}));

const WorkTitle = styled(Typography)(({ theme }) => ({
  fontFamily: companyTitleFont,
  fontSize: '1.6rem',
  fontWeight: 600,
  // Scale with the screen so long names (e.g. Georgia Institute of Technology) fit on one line.
  [theme.breakpoints.down('md')]: {
    fontSize: 'min(1.6rem, 5.4vw)',
  },
}));

// Company logo as a monochrome silhouette: the SVG masks the current text color, so it follows
// the theme (and link hover) in light and dark mode. Sized in em so it scales with the title.
// `scale` evens out logos whose artwork is small for its box; `descent` is the share of the
// logo that sits below the text baseline.
const LOGO_HEIGHT = 'calc(1.05em * var(--logo-scale))';

const LogoMark = styled('span')(() => ({
  display: 'inline-block',
  height: LOGO_HEIGHT,
  width: `calc(${LOGO_HEIGHT} * var(--logo-ratio))`,
  verticalAlign: `calc(${LOGO_HEIGHT} * var(--logo-descent) * -1)`,
  backgroundColor: 'currentColor',
  WebkitMaskImage: 'var(--logo-src)',
  maskImage: 'var(--logo-src)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskPosition: 'left center',
  maskPosition: 'left center',
}));

// Inline after the title on desktop; on phones the logo gets its own line below it.
const LogoSlot = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block',
    marginTop: theme.spacing(0.75),
    lineHeight: 1,
  },
}));

// On hover the logo (a mask filled with currentColor) takes its brand color: Fullstory's dark green, Georgia Tech's
// Tech Gold. Same per-theme shades as the sidebar links.
const LogoLink = styled(Link)(({ theme }) => {
  const { mode } = theme.palette;
  return {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&[data-tone="fullstory"]:hover, &[data-tone="fullstory"]:focus-visible': {
      color: FULLSTORY_GREEN[mode] ?? FULLSTORY_GREEN.light,
    },
    '&[data-tone="school"]:hover, &[data-tone="school"]:focus-visible': {
      color: TECH_GOLD[mode] ?? TECH_GOLD.light,
    },
    '&:not([data-tone]):hover': {
      opacity: 0.65,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  };
});

// Employer names link out when the entry has a `url` in profile.js.
const EmployerLink = styled(Link)(() => ({
  color: 'inherit',
  font: 'inherit',
}));

const WorkLocation = styled(Typography)(() => ({
  fontSize: '0.98rem',
}));

// Summary and bullets stop at half the window width so lines stay readable on wide screens.
const READING_WIDTH = '50vw';

const WorkSummary = styled(Typography)(({ theme }) => ({
  fontSize: '1.06rem',
  [theme.breakpoints.up('md')]: {
    maxWidth: READING_WIDTH,
  },
}));

const Highlights = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(1.5),
  },
}));

const HighlightItem = styled(Typography)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(3),
  fontSize: '1rem',
  [theme.breakpoints.up('md')]: {
    maxWidth: READING_WIDTH,
  },
  '&::before': {
    content: '"—"',
    position: 'absolute',
    left: 0,
    color: theme.palette.text.secondary,
  },
}));
