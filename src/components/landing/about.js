import '../styles/about.css';
import '../styles/devicons.css';

const AboutMe = () => {
	return (
		<div className="about_me_container">
			<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

			<div className="about_me_title_container">
				<span className="about_me_title">/about</span>
			</div>

			  <div className="about_me_info">
                Since graduating from Georgia Tech, I’ve worked on full‑stack projects that scaled to thousands of users. At Civic Digital Experience (Civic DX) I was a primary engineer on the internal dashboard built with React, C#/.NET, MongoDB, and Snowflake — a system supporting 20,000+ ABM contractors. I’ve designed and implemented REST APIs, built collaborative‑filtering recommendation systems, and containerized developer environments with Docker to streamline onboarding and workflows for multiple engineers. 
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