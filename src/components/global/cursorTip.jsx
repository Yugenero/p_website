import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from '@mui/material/styles';

// Every hover label on the site: a small inverted tag that follows the mouse, sitting just above and to the right of
// the cursor (flipping left/below near the window edges). With keyboard focus there's no cursor, so it sits at the
// focused element's top-right corner instead. Mouse and pen only; touch screens don't get it. Rendered in a portal so
// no parent's overflow can clip it.

const OFFSET = 14; // px between the cursor and the tag
const EDGE = 8; // px kept clear of the window edges

// Hook form, for triggers that can't take a wrapper (e.g. grid items): spread `handlers` on the trigger and render
// `tip` inside it.
export const useCursorTip = (label) => {
  const tipRef = useRef(null);
  const [shown, setShown] = useState(false);

  const place = (x, y) => {
    const tip = tipRef.current;
    if (!tip) return;
    const { offsetWidth: w, offsetHeight: h } = tip;
    let left = x + OFFSET;
    let top = y - OFFSET - h;
    if (left + w > window.innerWidth - EDGE) left = x - OFFSET - w;
    if (top < EDGE) top = y + OFFSET;
    tip.style.transform = `translate3d(${Math.max(left, EDGE)}px, ${top}px, 0)`;
  };

  const fromPointer = (event) => event.pointerType === 'mouse' || event.pointerType === 'pen';

  const handlers = {
    onPointerEnter: (event) => {
      if (!fromPointer(event)) return;
      place(event.clientX, event.clientY);
      setShown(true);
    },
    onPointerMove: (event) => {
      if (fromPointer(event)) place(event.clientX, event.clientY);
    },
    onPointerLeave: () => setShown(false),
    onFocus: (event) => {
      if (!event.target.matches(':focus-visible')) return;
      const rect = event.target.getBoundingClientRect();
      place(rect.right - OFFSET, rect.top + OFFSET);
      setShown(true);
    },
    onBlur: () => setShown(false),
  };

  const tip = createPortal(
    <Tip ref={tipRef} data-shown={shown || undefined} aria-hidden="true">
      {label}
    </Tip>,
    document.body,
  );

  return { handlers, tip };
};

export const CursorTip = ({ label, children, className }) => {
  const { handlers, tip } = useCursorTip(label);
  return (
    <Trigger className={className} {...handlers}>
      {children}
      {tip}
    </Trigger>
  );
};

const Trigger = styled('span')(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

const Tip = styled('span')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.75, 1.25),
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.8rem',
  fontWeight: 500,
  lineHeight: 1.2,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.15s ease, visibility 0s linear 0.15s',
  pointerEvents: 'none',
  zIndex: theme.zIndex.tooltip,
  '&[data-shown]': {
    opacity: 1,
    visibility: 'visible',
    transition: 'opacity 0.15s ease',
  },
}));
