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
// list top-to-bottom; the dot tracks how far you've read and each job's marker fills once passed.
const READ_LINE = 0.45; // where the "reading line" sits in the viewport at the top of the page
const MARKER_Y = 10; // px from an item's top to the point its marker represents (its date line)
const RAIL_GUTTER = { desktop: 48, mobile: 30 };
const RAIL_X = 5; // px from the gutter's left edge to the rail's center
const RAIL_INSET = 24; // px of breathing room above and below the pinned rail
const DOT_SIZE = 11;
const MARKER_SIZE = 9;
const EASE = 0.14; // per-frame easing toward the scroll target; lower is smoother/slower

const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

const useScrollTimeline = ({ listRef, railRef, dotRef, fillRef, markerRefs }) => {
  useEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    if (!list || !rail) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let markerFractions = [];
    let railHeight = 0;
    let current = null;
    let target = 0;
    let frame = 0;

    const toFraction = (offsetInList) => clamp01(offsetInList / list.offsetHeight);

    // The reading line slides from READ_LINE to the bottom of the viewport as the page scrolls,
    // so the dot always reaches the last marker even when the page can't scroll that far.
    const computeTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? clamp01(window.scrollY / maxScroll) : 1;
      const readY = window.innerHeight * (READ_LINE + (1 - READ_LINE) * pageProgress);
      return toFraction(readY - list.getBoundingClientRect().top);
    };

    const render = () => {
      dotRef.current.style.transform = `translate3d(0, ${current * railHeight}px, 0)`;
      fillRef.current.style.transform = `scaleY(${current})`;
      markerRefs.current.forEach((marker, i) => {
        if (marker) marker.dataset.reached = String(current >= markerFractions[i] - 0.001);
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
      const items = list.querySelectorAll('[data-timeline-item]');
      markerFractions = Array.from(items, (item) => toFraction(item.offsetTop + MARKER_Y));
      markerRefs.current.forEach((marker, i) => {
        if (marker) marker.style.top = `${markerFractions[i] * 100}%`;
      });
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
  }, [listRef, railRef, dotRef, fillRef, markerRefs]);
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
  const dotRef = useRef(null);
  const fillRef = useRef(null);
  const markerRefs = useRef([]);
  useScrollTimeline({ listRef, railRef, dotRef, fillRef, markerRefs });

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
              <RailFill ref={fillRef} />
              {timeline.map((experience, i) => (
                <RailMarker
                  key={experience.employer}
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  data-reached="false"
                />
              ))}
              <RailDot ref={dotRef} />
            </Rail>
          </RailGutter>
          <WorkList ref={listRef}>
            {timeline.map((experience) => (
              <WorkItem key={experience.employer} data-timeline-item>
                <MetaText>{experience.date}</MetaText>
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
const Rail = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 96,
  height: 'calc(100vh - 144px)',
  width: RAIL_X * 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    left: RAIL_X,
    width: 1,
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.divider,
  },
}));

const RailFill = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: RAIL_X,
  width: 1,
  marginLeft: -0.5,
  transform: 'scaleY(0)',
  transformOrigin: 'top center',
  willChange: 'transform',
  backgroundColor: theme.palette.text.primary,
}));

const RailMarker = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: RAIL_X - MARKER_SIZE / 2,
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  marginTop: -MARKER_SIZE / 2,
  boxSizing: 'border-box',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.text.secondary}`,
  backgroundColor: theme.palette.background.default,
  transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
  '&[data-reached="true"]': {
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.text.primary,
    transform: 'scale(1.1)',
  },
}));

// The glow lives on a pseudo-element and pulses with opacity/scale only, so it stays on the
// compositor instead of repainting a box-shadow every frame.
const glowPulse = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.35); }
`;

const RailDot = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: -DOT_SIZE / 2,
  left: RAIL_X - DOT_SIZE / 2,
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: '50%',
  zIndex: 1,
  willChange: 'transform',
  backgroundColor: theme.palette.text.primary,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    boxShadow: `0 0 12px 3px ${alpha(theme.palette.text.primary, 0.6)}`,
    animation: `${glowPulse} 2.6s ease-in-out infinite`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&::after': {
      animation: 'none',
      opacity: 0.8,
    },
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

const WorkSummary = styled(Typography)(() => ({
  fontSize: '1.06rem',
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
  '&::before': {
    content: '"—"',
    position: 'absolute',
    left: 0,
    color: theme.palette.text.secondary,
  },
}));
