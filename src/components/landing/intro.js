import { useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { homeTextFadeIn } from '../animations/text_animation';
import { polySlideIn } from '../animations/shapes';
import '../styles/home.css'; 
import '../../App.css';


export const Intro = () => {

  // Scroll Button
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
      <div className='intro-container'>
        <p className="header-introduction"> Hi, I'm </p>

        <div className='header-introduction-typer-container'>
          <ReactTyped 
            strings={[
              "Algorithms Practitioner & Intentional Problem Solver",
              "Humanistic and Design-Minded Software Engineer",
              "Hardware Enthusaist and Coffee Connoisseur",
              "Georgia Tech CS Alumnus w/ Specialization in Information Networks",
              "Avid Runner, Sim Racer, and Book Reader",
            ]}
            typeSpeed={40} 
            backDelay={2500}
            cursorChar='|'
            loop={true}
            className='header-introduction-typer'
          />
        </div>

        {/* <div className="select-button" onClick={scrollToAboutMe}>
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
        </div> */}
    </div>
	)
}

