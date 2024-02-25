import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './shapes.css';

// Circle Animation from anime.js library
const CircleAnimation = () => {
  useEffect(() => {
    anime({ // call the anime.js library
      targets: '.circle',
	  translateY: 90,
	  rotate: 405,
      scale: 5, // Scale the circle to twice its size
      opacity: 0.6, // Change the opacity to 0.5
      duration: 2000, // Animation duration in milliseconds
      easing: 'linear', // Easing function for the animation
    }); // interesting easing function
  }, []); 

  return <div className="circle"></div>;
};

// Line Animation from anime.js library
export const LineAnimation = function({x1, y1, x2, y2}) {
	useEffect(() => {
	  anime({ // call the anime.js library
		targets: '.line',
		strokeDashoffset: [anime.setDashoffset, 0], // Animates the stroke dash offset from its initial value to 0
		duration: 1000,
		easing: 'linear',
	  });
	}, []);
  
	return (
	  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<line className="line" x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1.5" />
	  </svg>
	);
};

export const SvgAnimation = function () {
	useEffect(() => {
		console.log("animation starting");
		anime({
			targets: '.function-based-values-demo .el',
			translateX: function(el) {
			  return el.getAttribute('data-x');
			},
			translateY: function(el, i) {
			  return -500;
			},
			scale: function(el, i, l) {
			  return (l - i) + .25;
			},
			rotate: function() { return anime.random(-360, 360); },
			borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
			duration: function() { return anime.random(1200, 1800); },
			delay: function() { return anime.random(0, 400); },
			direction: 'alternate',
			loop: true
		  });
	});
	return (
		<div className="function-based-values-demo">
		  <div className="el" data-x="250"></div>
		  <div className="el" data-x="300"></div>
		  <div className="el" data-x="350"></div>
		</div>
	);
};

export default CircleAnimation;
  

