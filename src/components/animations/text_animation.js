// text_animation.js
import anime from 'animejs';

export const animateNavTextSlideIn = () => {
    anime({
        targets: '.nav-list-info',
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });
};
export const animateNavTextSlideOut = () => {
    anime({
        targets: '.nav-list-item',
        translateX: [0, -100],
        opacity: [1, 0],
        duration: 1000,
        delay: anime.stagger(100, {direction: 'reverse'}),
        easing: 'easeInExpo'
    });
};

export const animateNavSlideIn = () => {
	anime({
		targets: '.navigation-container',
		translateX: [-100, 0],
		opacity: [0, 1],
		duration: 500,
		easing: 'easeOutExpo'
	})
}

export const animateNavFadeIn = () => { 
    anime({
        targets: '.nav-list-item',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
    })
}

export const homeTextFadeIn = () => {
    anime({
        targets: '.home_text',
        duration: 3000,
        easing: 'linear',
        opacity: [0, 1],
    })
}