import React from "react";
import animejs from 'animejs';
import anime from "animejs";

function tileFadeIn() {
	anime({
		targets: '.photo-item',
		opacity: [0, 1],
		translateY: [-50, 0],
		delay: animejs.stagger(10),
	})
}

function tileFadeOut() {
	anime({
		targets: '.photo-item',
		opacity: [1, 0],
		translateY: [0, 50],
		delay: animejs.stagger(10),
	})
}



function tileSlideIn() {
	animejs({
		targets: '.photo-itme',
		opacity: [0, 1],
		duration: 10000,
		translateY: [-50, 0],
	})
}


export { tileFadeIn, tileSlideIn, tileFadeOut };