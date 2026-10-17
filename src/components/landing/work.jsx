import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
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
import { CursorTip } from '../global/cursorTip';
import { CIVIC_BLUE, FULLSTORY_GREEN, TECH_GOLD } from '../global/profileParts';
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
const MARKER_Y = 10; // fallback: px from an item's top to its date line, if the date can't be measured
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
    let activeFractions = []; // where each job's title ends: passing it makes that job the active one
    let items = [];
    let startReadY = 0; // page y of the first marker: where the reading line starts at the top of the page
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
      // At the top of the page the reading line sits on the first marker, so the fill starts empty at the very top
      // of the line; over the first half screen of scrolling it eases down to READ_LINE.
      const ramp = Math.min(window.innerHeight * 0.5, maxScroll);
      const t = ramp > 0 ? clamp01(window.scrollY / ramp) : 1;
      const y = startReadY - window.scrollY + (readY - (startReadY - window.scrollY)) * t;
      return toFraction(y - list.getBoundingClientRect().top);
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
      tipGlow.style.opacity = '1';
      // A job counts as reached once the fill gets to its diamond: the diamond appears and the job's date lights up.
      markerFractions.forEach((fraction, i) => {
        const reached = String(current >= fraction - 0.001);
        if (markerRefs.current[i]) markerRefs.current[i].dataset.reached = reached;
        if (items[i]) items[i].dataset.reached = reached;
      });
      // Once the fill has gone past a job's title, that job is the active one (the last such job wins): its employer
      // takes its highlight color and underline.
      let active = -1;
      activeFractions.forEach((fraction, i) => {
        if (current >= fraction) active = i;
      });
      items.forEach((item, i) => {
        item.dataset.active = String(i === active);
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
      // A job's point on the line is the middle of its date (offsetTop is measured from the list, the nearest
      // positioned ancestor), so the divider and padding above each job don't throw the markers off.
      const markerY = (item) => {
        const date = item.querySelector('[data-timeline-date]');
        return date ? date.offsetTop + date.offsetHeight / 2 : item.offsetTop + MARKER_Y;
      };
      markerFractions = items.map((item) => toFraction(markerY(item)));
      // Titles' offsetTop is measured from the list too (the nearest positioned ancestor).
      activeFractions = items.map((item) => {
        const title = item.querySelector('h3');
        return toFraction(title ? title.offsetTop + title.offsetHeight : markerY(item));
      });
      if (!markerFractions.length) return;
      startReadY = list.getBoundingClientRect().top + window.scrollY + markerY(items[0]);

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

// Metrics in a summary or bullet (40%, 30+, 10,000+, sub-5ms, 2nd) are bolded and type themselves out the first
// time they scroll into view. Years ("Fall 2022") aren't matched: a metric needs a %, +, ms or ordinal suffix.
const METRIC = /((?:sub-)?\d[\d,]*(?:\.\d+)?(?:%|\+|ms\b)|\b\d+(?:st|nd|rd|th)\b)/;
const TYPE_STEP_MS = 70; // per character

const withMetrics = (text) =>
  text.split(METRIC).map((part, i) => (i % 2 === 1 ? <Metric key={i} text={part} /> : part));

const Metric = ({ text }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      setShown(text.length);
      return undefined;
    }
    let timer = 0;
    // Start once the metric is a little way above the bottom of the screen, so it's being looked at. The root reaches
    // far above the screen so a metric that was jumped past (e.g. straight to the bottom) still types instead of
    // staying blank.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setInterval(() => {
          setShown((n) => {
            if (n + 1 >= text.length) window.clearInterval(timer);
            return Math.min(n + 1, text.length);
          });
        }, TYPE_STEP_MS);
      },
      { rootMargin: '100000px 0px -15% 0px', threshold: 1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [text]);

  const typing = shown < text.length;
  // The untyped rest keeps its space (hidden), so the line never reflows while typing. Screen readers get the
  // whole metric at once.
  return (
    <MetricText ref={ref} data-typing={typing && shown > 0 ? 'true' : undefined}>
      <VisuallyHidden>{text}</VisuallyHidden>
      <span aria-hidden="true">
        <span data-typed>{text.slice(0, shown)}</span>
        <span style={{ visibility: 'hidden' }}>{text.slice(shown)}</span>
      </span>
    </MetricText>
  );
};

// Employer shown in a job title: its logo when there is one, otherwise the name; linked when
// the entry has a `url`.
const Employer = ({ experience }) => {
  const { employer, url, logo, tone } = experience;
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
          <LogoTip label={employer}>
            <LogoLink {...linkProps} data-tone={logo.tone}>
              {mark}
            </LogoLink>
          </LogoTip>
        ) : (
          mark
        )}
      </LogoSlot>
    );
  }
  return url ? (
    <EmployerLink {...linkProps} data-tone={tone}>
      {employer}
    </EmployerLink>
  ) : (
    <EmployerName data-tone={tone}>{employer}</EmployerName>
  );
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
              {/* Diamonds only at the two ends of the line: the first job and the last. */}
              {timeline.map((experience, i) => (i === 0 || i === timeline.length - 1) && (
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
                <WorkTitle variant="h3" data-has-logo={experience.logo ? true : undefined}>
                  {experience.title}
                  {'\u00A0· '}
                  <Employer experience={experience} />
                </WorkTitle>
                <WorkLocation variant="body2" color="text.secondary">
                  {experience.location}
                </WorkLocation>
                <WorkSummary variant="body1" paragraph>
                  {withMetrics(experience.summary)}
                </WorkSummary>
                <Highlights>
                  {experience.highlights.map((point) => (
                    <HighlightItem key={point}>{withMetrics(point)}</HighlightItem>
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

// The brightest point of the aura: a soft, steady halo sitting on the tip of the fill.
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
  },
}));

// Each job is a small diamond centered on the rail, hidden until the fill reaches it; then it scales up into place
// at full strength with a steady glow (and hides again if you scroll back above it). `left`/`top` are the rail point (set in measure).
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
  transition: 'opacity 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  '&[data-reached="true"]': {
    opacity: 1,
    transform: 'rotate(45deg) scale(1)',
    boxShadow: [
      `0 0 4px 1px ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.7 : 0.45)}`,
      `0 0 12px 4px ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.35 : 0.2)}`,
    ].join(', '),
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
  // A faint hairline between jobs, with room on both sides of it.
  '& > [data-timeline-item] + [data-timeline-item]': {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(6),
  },
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
    '& > [data-timeline-item] + [data-timeline-item]': {
      paddingTop: theme.spacing(4),
    },
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
    // Phones: a logo stays on the title's line (e.g. CS Undergraduate · Georgia Tech), shrinking to fit
    // instead of wrapping below it. Centered on the line, since the logo no longer sits on the text baseline.
    '&[data-has-logo]': {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'pre',
    },
    '&[data-has-logo] > *, &[data-has-logo] > * :not([role="img"])': {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
    },
    '&[data-has-logo] [role="img"]': {
      flexShrink: 1,
      minWidth: 0,
    },
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

// The employer's name follows the cursor over its logo. Plain inline so the logo keeps its baseline alignment.
const LogoTip = styled(CursorTip)(() => ({
  display: 'inline',
}));

// Inline after the title at every width; it only wraps to the next line when it doesn't fit beside the title.
const LogoSlot = styled('span')(() => ({
  whiteSpace: 'nowrap',
}));

// On hover the logo (a mask filled with currentColor) takes its brand color: Fullstory's dark green, Georgia Tech's
// Tech Gold. Same per-theme shades as the sidebar links.
const LogoLink = styled(Link)(({ theme }) => {
  const { mode } = theme.palette;
  return {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    // Also while its job is the active one on the timeline.
    ...toneRules(mode, { hover: true }),
    '&:not([data-tone]):hover': {
      opacity: 0.65,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  };
});

// Employer names link out when the entry has a `url` (Civic Digital Experience → its LinkedIn page). No underline at
// rest; on hover a thin underline draws in from the left and the name takes its `tone` color (light blue for Civic,
// as in the sidebar). The underline is a background line rather than a pseudo-element, so it follows the text
// across a line break when a long title wraps on phones.
// Each employer's highlight color, by its `tone` in profile.js.
const TONES = {
  fullstory: FULLSTORY_GREEN,
  school: TECH_GOLD,
  civic: CIVIC_BLUE,
  // No published brand colors for these two; they share Georgia Tech's gold.
  eklozet: TECH_GOLD,
  webdev: TECH_GOLD,
};

// Color rules for every tone: while the job is active on the timeline, and on hover/focus for links.
const toneRules = (mode, { hover }) =>
  Object.fromEntries(
    Object.entries(TONES).map(([tone, color]) => {
      const self = `&[data-tone="${tone}"]`;
      const selectors = [`[data-active="true"] ${self}`];
      if (hover) selectors.unshift(`${self}:hover`, `${self}:focus-visible`);
      return [selectors.join(', '), { color: color[mode] ?? color.light }];
    }),
  );

// The same underline (and tone color) shows while the job is the active one on the timeline.
const employerUnderline = {
  backgroundImage: 'linear-gradient(currentColor, currentColor)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 100%',
  backgroundSize: '0% 1px',
  WebkitBoxDecorationBreak: 'clone',
  boxDecorationBreak: 'clone',
  transition: 'background-size 0.25s ease, color 0.2s ease',
  '[data-active="true"] &': {
    backgroundSize: '100% 1px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
};

const EmployerLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  font: 'inherit',
  textDecoration: 'none',
  ...employerUnderline,
  '&:hover, &:focus-visible': {
    backgroundSize: '100% 1px',
  },
  ...toneRules(theme.palette.mode, { hover: true }),
}));

// Employers without a link (eKlozet, GT WebDev): plain text that only takes its color and underline while active.
const EmployerName = styled('span')(({ theme }) => ({
  ...employerUnderline,
  ...toneRules(theme.palette.mode, { hover: false }),
}));

const WorkLocation = styled(Typography)(() => ({
  fontSize: '0.98rem',
}));

// Summary and bullets stop at 60% of the job column so lines stay short and readable (full width on phones).
const READING_WIDTH = '60%';

const MetricText = styled('strong')(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  // A thin caret follows the typed characters while typing.
  '& [data-typed]': {
    position: 'relative',
  },
  '&[data-typing] [data-typed]::after': {
    content: '""',
    position: 'absolute',
    right: -2,
    top: '0.1em',
    bottom: '0.1em',
    width: 1,
    backgroundColor: 'currentColor',
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
