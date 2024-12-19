import React from "react";
import animejs from 'animejs';

function tileFadeIn() {
	animejs({
		targets: '.photo-item',
		opacity: [0, 1],
		translateY: [-50, 0],
		delay: animejs.stagger(10),
	})
}

export { tileFadeIn }