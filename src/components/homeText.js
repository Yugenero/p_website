import React, { useEffect, useRef } from 'react';
import { ReactTyped } from 'react-typed';
import { homeTextFadeIn } from './animations/text_animation';
import { polySlideIn } from './animations/shapes';
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

  useEffect(() => {
    homeTextFadeIn();
    polySlideIn();  
  }, []);

	return (
		<div className='home_text_container'>
      <div className="home-text-poly6"></div>
      <div className="home-text-poly5"></div>
      <div className="home-text-poly4"></div>
      <div className="home-text-poly3"></div>
      <div className="home-text-poly2"></div>
      <div className="home-text-poly1"></div>
      <div className="home-text-poly0"></div>

      <div className='home_text'>
        <p className="header-introduction_text"> Hey, I'm </p>
        <p class="header-introduction_name"> Nelson Rodriguez </p>

        <div className='header-introduction-typer-container'>
          <ReactTyped 
            strings={[
              "Algorithms Expert and Problem Solver",
              "Design-Minded Developer & Software QA @ Civic DX",
              "Georgia Tech CS Alumnus w/ Specialization in Information Networks",
              "Currently learning AI/ML in my free time",
              "Hardware Enthusaist and Coffee Connoisseur",
              "Avid Runner, Sim Racer, and Animal Lover",
            ]} 
            typeSpeed={40} 
            backDelay={2500}
            cursorChar='|'
            loop={true}
            className='header-introduction-typer'
          />
        </div>

        {/**<ParticlesComponent id='home_particles_component'/>**/}
      

        {/** state button for future use. the main feature of this button is that it will 
         * scroll to the different sections of the page interactively and let the user know 
         * visually which section they are on
         */}
        <div className="state-button" onClick={scrollToAboutMe} variant='h6' align='center' fontWeight={300}>
          <svg className="arrows">
              <div className="line"></div>  
              <path class="a1" d="M0 0 L15 16 L30 0"></path>
              <path class="a2" d="M0 10 L15 26 L30 10"></path>
              <path class="a3" d="M0 20 L15 36 L30 20"></path>
          </svg>
        </div>
      </div>



    </div>
	)
}

export default HomeText;
