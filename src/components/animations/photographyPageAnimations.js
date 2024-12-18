import React from "react";
import animejs from 'animejs';

function tileFadeIn() {
	animejs({
		targets: '.photo-item',
		opacity: [0, 1],
		easing: 'easeInOutQuad',
		delay: animejs.stagger(100),
	})
}

export { tileFadeIn }