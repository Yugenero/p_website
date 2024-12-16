import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/shapes.css';

const polySlideIn = () => {
	anime({
		targets: '.home-text-poly',
		translateX: [400, 0],
		opacity: [0, 1],
		duration: 800,
		easing: 'easeOutExpo',

	})
	anime({
		targets: '.home-text-poly2',
		translateX: [400, 0],
		opacity: [0, 1],
		delay: 100,
		duration: 800,
		easing: 'easeOutExpo',

	})
	anime({
		targets: '.home-text-poly3',
		translateX: [400, 0],
		opacity: [0, 1],
		delay: 200,
		duration: 800,
		easing: 'easeOutExpo',

	})
	anime({
		targets: '.home-text-poly4',
		translateX: [400, 0],
		opacity: [0, 1],
		delay: 300,
		duration: 800,
		easing: 'easeOutExpo',

	})
	anime({
		targets: '.home-text-poly5',
		translateX: [400, 0],
		opacity: [0, 1],
		delay: 400,
		duration: 800,
		easing: 'easeOutExpo',

	})
	anime({
		targets: '.home-text-poly6',
		translateX: [400, 0],
		opacity: [0, 1],
		delay: 500,
		duration: 800,
		easing: 'easeOutExpo',

	})
}

const GitHubLine = () => {
	anime({
		

	})
}

export { polySlideIn }; 
  

