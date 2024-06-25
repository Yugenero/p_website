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
	
				At Georgia Tech, I immersed myself in computing, striving to understand not just the "how" but
				the "why" behind every thing I learned. This intellectual curiosity is what drives me to learn
				something new every day, be it a new algorithm, equation, or emerging technology. But I also believe
				my pursuit of knowledge is matched only by my commitment to applying it in efficient and meaningful ways.
				
				<br/><br/>
				As a team player, I also thrive in fast-paced environemnts where communication and collaboration are essential.
				I think that the best results come from collective effort and diverse perspectives. No matter the project,
				I always embrace the dynamics of teamwork and the opportunity to learn from others. 

				Finally, I'm always embracing complexity and seeking new challenges in software engineering, seeing them as 
				opportunities to grow and improve. I aim to reflect this belief through my work by continually learning, iterating, 
				and improving.
				
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