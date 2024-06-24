import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ReactTyped } from 'react-typed';
import ParticlesComponent from './particles/particlesComponent';
import './particles/particles.css'
import './styles/home.css'; 
import '../App.css';

const HomeText = () => {

  const aboutMeSectionRef = useRef(null);

  // Function to scroll to the About Me section
  const scrollToAboutMe = () => {
    if (aboutMeSectionRef.current) {
      aboutMeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

	return (
		<div className='home_text_container'>
      <div className='home_text'>
        <p className="header-introduction_text"> Hey, I'm </p>
        <p class="header-introduction_name"> Nelson Rodriguez </p>

        {/**<Typewriter 
          text={"The quick brown fox jumps over the lazy dog"} 
          delay={100} 
          infinite={true}
        />**/}

        <div className='header-introduction-typer-container'>
        <ReactTyped 
          strings={[
            "Algorithms Expert and Problem Solver",
            "Entry Level Software Engineer and Developer with an eye for Design",
            "CS Alumni and Ramblin Wreck from Georgia Tech",
            "Currently learning AI/ML in my free time",
            "Hardware Enthusaist and Coffee Connosieur",
            "Avid Runner, Passionate Gamer, and Doggo Enjoyer",
          ]} 
          typeSpeed={50} 
          backDelay={2000}
          cursorChar='|'
          loop={true}
          className='header-introduction-typer'
        />
        </div>

        <ParticlesComponent id='home_particles_component'/>
      
        {/** About me button */}
        <Box className="about_me" sx={{margin: '30px 0'}}>
          <Button variant='outlined'size='large' onClick={scrollToAboutMe} color='inherit'
            sx={{
              backgroundColor: 'var(--primary-color-dark)',
              color: 'var(--primary-color-light)', 
              '&:hover': {
                backgroundColor: 'white', 
                color: 'black'
              },
              fontFamily: 'var(--font-family-ibm-plex-mono)', 
              textTransform: 'none', 
              position: 'absolute',
              top: '50px',
            }}>
            <Typography variant='h6' align='center' fontWeight={300}>
              About Me!
            </Typography>
          </Button>

        </Box>

      </div>
    </div>
	)
}

export default HomeText;
