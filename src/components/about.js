import React from "react";
import './styles/about.css';
import './styles/devicons.css';

const AboutMe = () => {
	return (
		<div className="about_me_container">
			<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
			
			<div className="about_me_title_container">
				<span className="about_me_title">/about</span>
			</div>

			<div className="about_me_info">
				Last Fall, I graduated with a {' '}
				<a class="link-parchment" target="_blank" rel="noopener noreferrer" 
					href="https://www.parchment.com/u/award/cdc63a097762a059103a9b3ce857a15e">
					B.S. in Computer Science
				</a> {' '}from the{' '} 
				<a class="link-gatech" target="_blank" rel="noopener noreferrer" href="https://www.cc.gatech.edu/">
				<strong class="georgia-tech">College of Computing</strong>
				</a>{' '}
				<strong class="georgia-tech" style={{color: 'var(--white)'}}> @{' '}
				<a class="link-gatech" target="_blank" rel="noopener noreferrer" href="https://www.gatech.edu/">Georgia Tech</a></strong>
				, where I honed my skills and knowledge in a variety of areas in computation. My concentration in Information Networks 
				and Media Applications gave me a robust foundation in topics comprising Algorithms & Data Structures, Mathematics, Computer Networks, 
				and Database Systems to name a few. 
	
				At Georgia Tech, I strived to understand not just the "how" but
				the "why" behind every thing I learned. This intellectual curiosity is what drives me to learn
				something new every day, be it a new algorithm, equation, or technology. Still, I believe
				my pursuit of knowledge is matched only by my commitment to applying it in meaningful ways.
				
				<br/><br/>
				As a <span style={{color: 'white'}}>collaborator</span> and <span style={{color: 'white'}}>teammate</span>, I thrive in fast-paced environemnts where communication 
				and adaptability are essential. I think that the best results come from collective effort and diverse perspectives. 
				No matter the work or project, I embrace the dynamics of teamwork and the opportunity to learn from and teach 
				others. 

				<br/><br/>
				Finally, I embrace complexity, seeking to undertake new challenges and solve problems, seeing them as 
				opportunities to grow and improve. I aim to reflect this mentality through my work by continually learning, iterating, 
				and improving.

				<br/><br/>
				Outside of computing, I also enjoy a variety of recreational and personal hobbies. Running and resistance training (athleticism and hypertrophy) are staples of my 
				weekly routine, and I'm always looking for new ways to challenge myself physically. I'm a big advocate for the following principle: 1.01<sup>365</sup> = 37.8 &gt; 
				1.00<sup>365</sup> = 1 That is to say: consistency (even if it's just 1% everyday) is key to exponential growth.
				I also look for inspiration in visual design, art, and aesthetics. I'm currently digging dark minimalism, and brutalism.

				I'm also into FPS + Soulslike games. Two games I'm playing right now are{' '}<a className="cs_valorant" href="https://tracker.gg/valorant/profile/riot/Nero%23nel/overview">CS/Valorant</a>{' '} and Elden Ring.

			</div>

			<div className="about_me_skills_container">
				<div className="about_me_skills_title">/about/skills</div>
				<p className="about_me_info" style={{fontSize: '0.6em', width: '100%'}}>Here is an overview of just some of the languages and systems I work with</p>
				<div className="container">
				<div className="about_me_skills">
					<div className="skill_container">
						<i class="devicon-react-original"></i>
						React.js
					</div>
					<div className="skill_container">
						<i class="devicon-javascript-plain"></i>
						JavaScript
					</div>
					<div className="skill_container">
						<i class="devicon-java-plain"></i>
						Java
					</div>
					<div className="skill_container">
						<i class="devicon-python-plain"></i>
						Python
					</div>
					<div className="skill_container">
						<i class="devicon-c-plain"></i>
						C
					</div>
					<div className="skill_container">
						<i class="devicon-html5-plain"></i>
						HTML5
					</div>
					<div className="skill_container">
						<i class="devicon-css3-plain"></i>
						CSS3
					</div>
					<div className="skill_container">
						<i class="devicon-swift-plain"></i>
						Swift
					</div>
					<div className="skill_container">
						<i class="devicon-nodejs-plain"></i>
						Node.js
					</div>
					<div className="skill_container">
						<i class="devicon-express-original"></i>
						Express.js
					</div>
					<div className="skill_container">
						<i class="devicon-mongodb-plain-wordmark"></i>
						MongoDB
					</div>
					<div className="skill_container">
						<i class="devicon-bash-plain"></i>
						CLI/Terminal
					</div>
					<div className="skill_container">
						<i class="devicon-git-plain"></i>
						Git
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					<div className="skill_container">
						<i class="devicon-github-original"></i>
						Github
					</div>
					
				</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;