import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";
import '../styles/traceBeam.css'

export const TracingBeamLeft = ({ children, className }) => {
  const ref = useRef(null);
  const body = document.body;
  const html = document.documentElement; 

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const [pageHeight, setPageHeight] = useState(
    Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
  ));

  useEffect(() => {
    setSvgHeight(pageHeight);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight]), { stiffness: 500, damping: 90 });

  return (
    <>
      <div className="trace-path-left" aria-hidden="true">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#636363ff"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#FFFFFF" stopOpacity="0" />
              <stop stopColor="#FFFFFF" />
              <stop offset="0.325" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      {/* Normal content (not shifted) */}
      <div ref={ref} className={clsx(className)}>
        <div ref={contentRef}>{children}</div>
      </div>
    </>
  );
};

export const TracingBeamRight = ({ children, className }) => {
  const ref = useRef(null);
  const body = document.body;
  const html = document.documentElement;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const [pageHeight, setPageHeight] = useState(
    Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
  ));

  useEffect(() => {
    setSvgHeight(pageHeight);
  }, [pageHeight]);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight]), { stiffness: 500, damping: 90 });

  return (
    <>
      <div className="trace-path-right" aria-hidden="true">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
        >
          {/* mirrored horizontal path (start at x=19 and draw leftwards) */}
          <motion.path
            d={`M 19 0V -36 l -18 24 V ${svgHeight * 0.8} l 18 24V ${svgHeight}`}
            fill="none"
            stroke="#636363ff"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 19 0V -36 l -18 24 V ${svgHeight * 0.8} l 18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient-right)"
            strokeWidth="1.25"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient id="gradient-right" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#FFFFFF" stopOpacity="0" />
              <stop stopColor="#FFFFFF" />
              <stop offset="0.325" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      {/* Normal content (not shifted) */}
      <div ref={ref} className={clsx(className)}>
        <div ref={contentRef}>{children}</div>
      </div>
    </>
  );
};