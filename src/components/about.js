import React from "react";
import './styles/about.css';
import './styles/devicons.css';

const AboutMe = () => {
	return (
		<div className="about_me_container">
			<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
			
			<div className="about_me_title_container">
				<span className="about_me_title">./about</span>
			</div>

			<div className="about_me_info">
				Last Fall, I graduated with a {' '}
				<a class="link-parchment" target="_blank" rel="noopener noreferrer" 
					href="https://www.parchment.com/u/award/cdc63a097762a059103a9b3ce857a15e">
					Bachelor of Science in Computer Science
				</a> {' '}from the{' '} 
				<a class="link-gatech" target="_blank" rel="noopener noreferrer" href="https://www.cc.gatech.edu/">
				<strong class="georgia-tech">College of Computing</strong>
				</a>{' '}
				<strong class="georgia-tech" style={{color: 'var(--white)'}}> @ Georgia Tech</strong>, where I 
				honed my skills and knowledge in a variety of areas in computation. 
				My concentration in Information Networks and Media Applications provided me a robust foundation in topics
				such as Algorithms and Data Structures, Mathematics, Computer Networks, and Database Systems. 
	
				At <strong>Georgia Tech</strong>, I immersed myself in computing, striving to understand not just the "how" but
				the "why" behind every thing I learned. This intellectual curiosity is what drives me to learn
				something new every day, be it a new algorithm, equation, or emerging technology. But I also believe
				my pursuit of knowledge is matched only by my commitment to applying it in efficient and meaningful ways.
				
				<br/><br/>
				As a <strong>team player</strong>, I also thrive in fast-paced environemnts where communication and collaboration are essential.
				I think that the best results come from collective effort and diverse perspectives. No matter the project,
				I always embrace the dynamics of teamwork and the opportunity to learn from others. 

				Finally, I'm always embracing complexity and seeking new challenges in software engineering, seeing them as 
				opportunities to grow and improve. I aim to reflect this belief through my work by continually learning, iterating, 
				and improving.

				<br/><br/>
				<strong style={{color: 'white'}}>On a more personal note</strong>: I enjoy many things outside of computing. Running and resistance training are staples of my 
				weekly routine, and I'm always looking for new ways to challenge myself physically. I'm a big proponent of the principle that
				1.01<sup>365</sup> = 37.8 &gt; 1.00<sup>365</sup> = 1. In other words: consistency is key to exponential growth. 
				I'm also a huge fan of electronic music and FPS + Soulslike games. Two games I'm playing right now are 
				{' '}<a className="cs_valorant" href="https://tracker.gg/valorant/profile/riot/Nero%23nel/overview">CS/Valorant</a>{' '} and Elden Ring.
				Visual Design aesthetics are also another cornerstone of my life. I'm currently digging dark minimalism and brutalism.
				
				<br/><br/>
				Here is an overview of just some of the tools I've worked with:

			</div>

			<div className="about_me_skills_container">
				<div className="about_me_skills_title">./about/skills</div>
				<div className="container">
				<div className="about_me_skills">
					<i class="devicon-react-original"></i>
					<i class="devicon-javascript-plain"></i>
					<i class="devicon-java-plain"></i>
					<i class="devicon-python-plain"></i>
					<i class="devicon-c-plain"></i>
					<i class="devicon-html5-plain"></i>
					<i class="devicon-css3-plain"></i>
					<i class="devicon-swift-plain"></i>
					<i class="devicon-nodejs-plain"></i>
					<i class="devicon-express-original"></i>
            		<i class="devicon-mongodb-plain-wordmark"></i>
          			<i class="devicon-bash-plain"></i>
					<i class="devicon-git-plain"></i>
					<i class="devicon-github-original"></i>
				</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;