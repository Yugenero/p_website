import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
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

// Scroll timeline: a rail pinned to the viewport beside the job list. The rail maps the whole
// list top-to-bottom and fills in as you read; when the fill reaches a job's tick, the tick darkens and that job's
// date is highlighted. The rail is an SVG path that runs from the first tick to the last (so the ticks cap it
// flush) with one abrupt S-bend (a sideways jog) between the first and second jobs; the fill follows the path.
const READ_LINE = 0.45; // where the "reading line" sits in the viewport at the top of the page
const MARKER_Y = 10; // px from an item's top to the point its marker represents (its date line)
const RAIL_GUTTER = { desktop: 48, mobile: 30 };
const RAIL_X = 5; // px from the gutter's left edge to the rail's center (above the jog)
const RAIL_INSET = 24; // px of breathing room above and below the pinned rail
const JOG = 10; // px the rail shifts right at the bend
const JOG_RADIUS = 4; // corner radius of the bend's two turns; small = abrupt
const TICK = 11; // width of a job's tick
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
    let startY = 0; // first tick: where the path starts
    let endY = 0; // last tick: where the path ends
    let jogY = null; // y of the bend, or null with fewer than two jobs
    let pathLength = 0;
    const track = rail.querySelector('[data-track]');
    const fillPath = fillRef.current;

    // How much of the path is filled when the reading position is at height y. The path only ever moves down, so
    // that's the height covered since the first tick, plus the extra the bend adds once you're past it
    // (interpolated through the bend itself).
    const lengthAtY = (rawY) => {
      const y = Math.min(Math.max(rawY, startY), endY);
      const straight = y - startY;
      if (jogY === null) return straight;
      const extra = pathLength - (endY - startY);
      if (y <= jogY - JOG_RADIUS) return straight;
      if (y >= jogY + JOG_RADIUS) return straight + extra;
      return straight + extra * ((y - (jogY - JOG_RADIUS)) / (2 * JOG_RADIUS));
    };
    const xAtY = (y) => (jogY !== null && y > jogY ? RAIL_X + JOG : RAIL_X);
    let current = null;
    let target = 0;
    let frame = 0;

    const toFraction = (offsetInList) => clamp01(offsetInList / list.offsetHeight);

    // The reading line slides from READ_LINE to the bottom of the viewport as the page scrolls,
    // so the fill always reaches the last tick even when the page can't scroll that far.
    const computeTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? clamp01(window.scrollY / maxScroll) : 1;
      const readY = window.innerHeight * (READ_LINE + (1 - READ_LINE) * pageProgress);
      return toFraction(readY - list.getBoundingClientRect().top);
    };

    const render = () => {
      const length = lengthAtY(current * railHeight);
      fillPath.style.strokeDashoffset = String(Math.max(pathLength - length, 0));
      // A job counts as reached once the fill gets to its tick: the tick darkens and the job's date lights up.
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

      // Rail path: from the first tick straight down, an abrupt S-bend halfway between the first two jobs, then
      // straight down to the last tick. Starting and ending on ticks keeps both ends flush (no stub past a tick).
      const x0 = RAIL_X;
      const x1 = RAIL_X + JOG;
      const r = JOG_RADIUS;
      startY = markerFractions[0] * railHeight;
      endY = markerFractions.length > 1 ? markerFractions[markerFractions.length - 1] * railHeight : railHeight;
      jogY = markerFractions.length > 1 ? ((markerFractions[0] + markerFractions[1]) / 2) * railHeight : null;
      const d =
        jogY === null
          ? `M ${x0} ${startY} V ${endY}`
          : `M ${x0} ${startY} V ${jogY - r} Q ${x0} ${jogY} ${x0 + r} ${jogY} H ${x1 - r} Q ${x1} ${jogY} ${x1} ${jogY + r} V ${endY}`;
      rail.querySelectorAll('path').forEach((path) => path.setAttribute('d', d));
      pathLength = track.getTotalLength();
      fillPath.style.strokeDasharray = String(pathLength);

      markerRefs.current.forEach((marker, i) => {
        if (!marker) return;
        const y = markerFractions[i] * railHeight;
        marker.style.top = `${y}px`;
        marker.style.left = `${xAtY(y) - TICK / 2}px`;
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
          <LogoLink {...linkProps} title={employer}>
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
                <path data-track />
                <path ref={fillRef} data-fill />
              </RailPath>
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
  width: RAIL_X + JOG + TICK,
}));

// Track (divider color) and fill (text color, drawn in with stroke-dashoffset as you scroll) share one path.
// No viewBox: SVG units are CSS pixels, so the path lines up exactly with the ticks and progress line.
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
}));

// Each job is a thin horizontal tick across the rail: grey until passed, then full strength and a bit longer.
const RailMarker = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: RAIL_X - TICK / 2,
  width: TICK,
  height: 1,
  backgroundColor: theme.palette.text.secondary,
  transformOrigin: 'center',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&[data-reached="true"]': {
    backgroundColor: theme.palette.text.primary,
    transform: 'scaleX(1.35)',
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
  // The date lights up once the timeline's fill reaches this job's tick (set by useScrollTimeline).
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

const LogoLink = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.65,
  },
}));

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
