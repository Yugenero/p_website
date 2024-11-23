import React from "react";
import './styles/about.css';
import './styles/devicons.css';
import Work from "./work";

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
				<a class="link-gatech" target="_blank" rel="noopener noreferrer" href="https://www.gatech.edu/">Georgia Tech</a></strong>. 
				
				My concentration in Information Networks 
				and Media Applications gave me a robust foundation in subjects comprising <strong style={{color: 'white'}}>Algorithms & Data Structures, Applied Mathematics, AI/ML, 
				Computer Networks, and Database Systems</strong>. 
				
				<br/><br/>				
				My passion for tech extends beyond coding; 
				it’s about continuously <strong style={{color: 'var(--white)'}}>iterating</strong>, <strong style={{color: 'var(--white)'}}>improving</strong>, 
				and <strong style={{color: 'var(--white)'}}>delivering</strong> impactful solutions that make 
				a difference. As a full-stack software engineer, I am driven by the challenge of solving real problems and
				generating tangible value. 
				During my time at Georgia Tech, I collaborated on projects that served over users and competed in industry-recognized events, 
				which sharpened my ability to thrive in fast-paced environments. Ultimately, I believe that the best 
				outcomes emerge from diverse perspectives and collective effort. Whether it’s contributing 
				to a team project or leading a development initiative,<span style={{color: 'white'}}> I embrace the opportunity to learn, 
				teach others, and grow both as an engineer and a person</span>.

				<br/><br/>

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
						<i class="devicon-amazonwebservices-plain-wordmark"></i>
						AWS
					</div>
					<div className="skill_container">
						<i class="devicon-nextjs-original-wordmark"></i>
						Next.js
					</div>
					<div className="skill_container">		
					<i class="devicon-vercel-original"></i>
						Vercel
					</div>
					<div className="skill_container">	
						<i class="devicon-heroku-original"></i>
						Heroku
					</div>
					<div className="skill_container">
						<i class="devicon-d3js-plain"></i>
							D3.js
					</div>
					<div className="skill_container">
						<i class="devicon-django-plain"></i>
							Django
					</div>
					<div className="skill_container">
						<i class="devicon-docker-plain"></i>
							Docker
					</div>
				
				</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;