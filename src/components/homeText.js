import React, { useRef } from 'react';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ReactTyped } from 'react-typed';
import ParticlesComponent from './particles/particlesComponent';
import './particles/particles.css'
import './styles/home.css'; 
import '../App.css';

const HomeText = () => {

  const aboutMeSectionRef = useRef(null); 
  function scrollToAboutMe() {
    // get about me container defined by class name
    const aboutMeSection = document.querySelector('.break');
    if (aboutMeSection) {
      aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

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
            "Design-Minded Software Engineer and Developer",
            "Georgia Tech CS Alumnus w/ Specialization in Information Networks",
            "Currently learning AI/ML in my free time",
            "Hardware Enthusaist and Coffee Connoisseur",
            "Avid Runner, Passionate Artist, and Animal Lover",
          ]} 
          typeSpeed={40} 
          backDelay={2500}
          cursorChar='|'
          loop={true}
          className='header-introduction-typer'
        />
        </div>

        {/**<ParticlesComponent id='home_particles_component'/>**/}
      
        {/** About me button */}
        <Box className="about_me" sx={{marginTop: '30px'}}>
          <Button variant='outlined'size='large' onClick={scrollToAboutMe} color='inherit'
            sx={{
              backgroundColor: 'var(--primary-color-dark)',
              color: 'var(--primary-color-light)', 
              '&:hover': {
                backgroundColor: 'white', 
                color: 'black'
              },
              fontFamily: 'var(--current-font)', 
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
