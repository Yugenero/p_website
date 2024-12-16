import React, { useContext, useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavbarSmall } from './navigation';
import { Button } from '@mui/material';
import { FontContext } from './fontContext';
import { animateNavTextSlideIn, animateNavTextSlideOut, animateNavFadeIn } from './animations/text_animation';
import './styles/header.css';
import './styles/headerNavigation.css'


const ChangeFontButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="contained" color="primary"
      sx={{ forceLowerdisplay: 'flex', position: 'absolute', right: '200px', backgroundColor: 'var(--primary-color-dark)',
        fontFamily: 'Times New Roman', fontSize: '1.6em', color: 'var(--primary-color-light2)',
        '&:hover': {
          backgroundColor: 'var(--primary-color-dark)',
          color: 'var(--white)'
        } }}>
        f
    </Button>
  );
}


function NavigationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavigation = () => { 
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      // animateNavFadeIn();
      animateNavTextSlideIn();
    } if (!isOpen) {
      animateNavTextSlideOut();
    }
  }, [isOpen]);

  /**
   * This function returns the toggle button and conditionally renders
   * the navigation based on the state of the button when its clicked
   * @returns {JSX.Element}
   */
  return (
    <>
      <div className='hamburger'>
        <svg 
          className={`ham hamRotate ham8 ${isOpen ? 'active' : ''}`} 
          viewBox="0 0 100 100" 
          width="50" 
          onClick={toggleNavigation} >
          <path className="line top" stroke="white" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
          <path className="line middle" stroke="white" d="m 30,50 h 40" />
          <path className="line bottom" stroke="white" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" 
          />
        </svg>
      </div>
      <>
      {isOpen? 
      <div className='navigation-container'>
          <ul className='navigation-list-2'>
            <Link to="/about" className='nav-list-item'>About</Link> <span className='nav-list-info'> Infomation about me + hobbies </span>
            <Link to="/work" className='nav-list-item'>Work</Link> <span className='nav-list-info'> My work experience and history </span>
            <Link to="/projects" className='nav-list-item'>Projects</Link> <span className='nav-list-info'> Passion dev projects  </span>
            <Link to="/photography" className='nav-list-item'>Photography </Link> <span className='nav-list-info'> My photography portfolio </span>
              under construction (links might not work) 
              currently optimizing for mobile devices
          </ul>
          <div className='navigation-subcontainer'> 

          </div>
      </div> : <></>}
      </>
    </>

  );
}

function Header() {

  const { fontFamily, changeFont } = useContext(FontContext);

  return (
    <div>
      <AppBar position="fixed" className="app_header" elevation={0}
        sx={{ backgroundColor: "var(--primary-color-dark)" }}>
        <Box display="flex" justifyContent="center">
          <Toolbar sx={{ width: '70vw', justifyContent: 'space-between' }}>
            <NavigationButton />
            <NavbarSmall className="app_header_nav" />
            <ChangeFontButton className="change-font-button" onClick={changeFont} />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default Header;