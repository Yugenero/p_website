import React from "react";
import { Link } from '@mui/material';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from '@mui/icons-material/Link';
import './styles/projects.css'

const projects = [
	{
		title: "eKlozet - Sustainable Fashion Mobile App",
		description: `I developed a sustainable fashion iOS app with a student team using Agile 
			methodology, Swift, and SQL, creating fashion screening functionality, an outfit recommendation 
			algorithm, and dynamic clothing storage for 5000+ users. This project won 2nd place in the Fall 
			2022 Georgia Tech CS Junior Design Capstone Expo out of 30+ teams.`,
		link: "https://github.com/allisonfain08/team2120"
	}, 
	{
		title: "Nexus - Blogging Web App",
		description: `I built a web application using React Hooks and Context API for state management to 
			ensure efficient data flow and page rendering. I created a REST API with Express.js/Node.js and 
			MongoDB for data fetching and post operations, optimized performance with Axios and React Hooks, 
			and implemented secure user authentication using bcrypt for salting and hashing with MongoDB for 
			storage.`,
		link: "https://github.com/Yugenero/Nexus"
	}, 
	{
		title: "Running Sonification Simulator",
		description: `Designed and developed a running sonification simulator that dynamically sonifies a 
			user’s cadence, heart rate, and other physical attributes based on continuous sensor data, converting
			data streams into helpful audio feedback. Achieved a 75% increase in runner performance as measured 
			by responses to the simulator's output in research analysis.`,
		link: "https://github.com/Yugenero/RodriguezNelson_Simulator"
	}, 
	{
		title: "Ongoing - NLP Sentiment Analysis",
		description: `Exploritory youtube content + comments analysis using NLP; a one stop shop to acquire a deeper 
			insight into the commments on a video and how they resonant with the actual content from the youtube video. Currently
			In progress.`,
		link: "https://github.com/fmartinez32/Youtube_Content_NLP"
	}, 
]

const ProjectList = projects.map((projects) => {
	return (
	  <div className="project_object_container">
		<div className="project_object">
		  <div className="project_title">{projects.title}</div>
		  <div className="project_description">{projects.description}</div>
		  <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
			<IconButton 
			  className="project_link" 
			  component={Link} 
			  href={projects.link} 
			  target="_blank" 
			  rel="noopener noreferrer"
			  sx={{
				color: 'var(--primary-color-light)',
				padding: '0',
				transition: 'all 0.2s ease',
				'&:hover': {
				  color: 'var(--white) !important',
				  transform: 'scale(0.9)',
				  '& .MuiTypography-root': {
					color: 'var(--white)'
				  }
				},
			  }}
			>
			  <GitHubIcon sx={{fontSize: '2rem'}}/>
			  <Typography variant="body1" sx={{  ml: 1, fontSize: '1.1rem', color: 'inherit', fontFamily: 'var(--font-family-n27)'}} >
				GitHub
			  </Typography>
			</IconButton>
		  </Box>
		</div>
	  </div>
	);
  });


const Projects = () => {
	return (
		<div className="projects_container">
			<div className="projects_title">/projects</div>
			<div className="projects_list">
				{ProjectList}
			</div>
		</div>
	);
}

export default Projects;