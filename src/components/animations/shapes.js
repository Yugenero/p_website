import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/shapes.css';

// Line Animation from anime.js library
export const LineAnimation = function({x1, y1, x2, y2}) {
	useEffect(() => {
	  anime({ // call the anime.js library
		targets: '.line',
		color: '#A80000',
		strokeDashoffset: [anime.setDashoffset, 0], // Animates the stroke dash offset from its initial value to 0
		duration: 1000,
		easing: 'linear',
	  });
	}, []);
  
	return (
	  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<line className="line" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />
	  </svg>
	);
};

export default LineAnimation;
  

