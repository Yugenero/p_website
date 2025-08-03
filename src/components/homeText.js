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

      <div className='home_text'>
        <p className="header-introduction_text"> Hey, I'm </p>
        <p class="header-introduction_name"> Nelson Rodriguez </p>

        <div className='header-introduction-typer-container'>
          <ReactTyped 
            strings={[
              "Algorithms practitioner & Problem Solver",
              "Design-Minded Developer + Software Engineer @ CDX",
              "Hardware Enthusaist and Coffee Connoisseur",
              "Georgia Tech CS Alumnus w/ Specialization in Information Networks",
              "Avid Runner, Sim Racer, and Book Reader",
              "暇な時間に日本語を勉強しています. (Currently studying Japanese in my free time)",
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
    <div className="select-button" onClick={scrollToAboutMe}>
      <div className="select-button-container">
            <div className="animated-arrow">
              <span className="the-arrow -left">
                <span className="shaft"></span>
              </span>
              <span className="main">
                <span className="text">about me</span>
                <span className="the-arrow -right">
                  <span className="shaft"></span>
                </span>
              </span>
            </div>
        </div>
    </div>
    </div>
    </div>
	)
}

export default HomeText;
