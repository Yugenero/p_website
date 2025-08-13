import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavbarText } from '../landing/navigation';
import { animateNavTextSlideIn, animateNavTextSlideOut } from '../animations/text_animation';
import '../styles/header.css'; 
import '../styles/headerNavigation.css' 

function NavigationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavigation = () => { 
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      animateNavTextSlideIn();
    } if (!isOpen) {
      animateNavTextSlideOut();
    }
  }, [isOpen]);

  return (
    <>
      <div className='hamburger'>
        <svg class={`ham hamRotate ham4 ${isOpen ? 'active' : ''}`} viewBox="0 0 100 100" width="50" onClick={toggleNavigation}>
          <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
          <path class="line middle" d="m 70,50 h -40" />
          <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
        </svg>
      </div>
      <>
      {isOpen? 
      <div className='navigation-container'>
        <div className='navigation-subcontainer'>
          <ul className='navigation-list-2'> 
            <Link to="/" className='nav-list-item' onClick={toggleNavigation}>Home</Link> <span className='nav-list-info'> Go back to the home page </span>
            <Link to="/about" className='nav-list-item' onClick={toggleNavigation}>About</Link> <span className='nav-list-info'> Infomation about me + hobbies </span>
            <Link to="/work" className='nav-list-item' onClick={toggleNavigation}>Work</Link> <span className='nav-list-info'> My work experience and history </span>
            <Link to="/projects" className='nav-list-item' onClick={toggleNavigation}>Projects</Link> <span className='nav-list-info'> Passion dev projects  </span>
            under construction (some links might not work) 
          </ul>
        </div>
      </div> : <></>}
      </>
    </>

  );
}

function Header() {
  return (
    <div>
      <AppBar position="fixed" className="app_header" elevation={0}
        sx={{ 
          backgroundColor: "var(--primary-color-dark)", 
          borderBottom: '0.5px solid var(--primary-color)', 
          zIndex: 1000
        }}>
        <Box display="flex" justifyContent="center">
          <Toolbar sx={{ width: '50vw', justifyContent: 'space-between' }}>
            <NavigationButton />
            <NavbarText className="app_header_nav" />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default Header;