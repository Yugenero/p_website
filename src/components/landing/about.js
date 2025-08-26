import { ReactTyped } from 'react-typed';
import '../styles/about.css';
import '../styles/devicons.css';
import '../styles/home.css'; 
import '../../App.css';

export const Intro = () => {
	return (
		<div className="about-container">
			<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

			{/**Brief Introduction About me + Work History */}
			  <div className="about-info">
				 <div className='header-introduction-typer-container'>
					<ReactTyped 
						strings={[
						"Humanistic + User-centric Software Engineer",
						"Algorithms Practitioner and Problem Solver",
						"Computer Hardware Enthusaist and Coffee Connoisseur",
						"Georgia Tech CS Alum w/ Specialization in Information Networks + Algorithms",
						]}
						typeSpeed={40} 
						backDelay={2500}
						cursorChar='|'
						loop={true}
						className='header-introduction-typer'
          			/>
        		</div>
				{/** Change this to a more readable format later  */}
				Hi, I’m Nelson — a Software Engineer who's passionate about building systems people actually use, among other things.
				Over the past year, I’ve worked on full-stack applications that scaled to thousands of users. 
				Most recently, I was a primary developer on an internal financial/asset-management dashboard supporting 20,000+ ABM contractors
				@ <a className="about-link" href="https://civicdx.com" target="_blank" rel="noopener noreferrer"> Civic Digital Experience Inc (Civic DX)</a>, where
				I built and optimized core features with React, C#/.NET, MongoDB, and Snowflake — including global dataset filtering pipelines, 
				reusable UI components, and REST APIs. I also hold a B.S. in CS from <a className="about-link-gt" href="https://www.gatech.edu" target="_blank" rel="noopener noreferrer">
				<img
					src="files/images/gt-logo.svg"
					alt="Georgia Tech"
					className="about-gt-logo"
					width="28"
					height="18"
					style={{ verticalAlign: 'middle' }}
                />  Georgia Tech</a>, 
				where I built a robust foundation in Theoretical Algorithms, Computing Systems, and Mathematics. 
                <br/><br/>
            </div>

			<div className="about-skills-container">
				<div className="landing-title">/skills</div>
				<p className="about-skills-info" style={{fontSize: '0.6em', width: '100%'}}>Here is an overview of just some of the languages and systems I work with</p>
				<div className="container">
				<div className="about-skills">
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