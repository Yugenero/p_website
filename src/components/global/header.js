import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavbarText, NavbarIcon } from '../landing/navigation';
import { animateNavTextSlideIn, animateNavTextSlideOut } from '../animations/text_animation';
import '../styles/header.css'; 

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
      <div className='header-name'> Nelson Rodriguez </div>
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

  );
}

// ...existing code...
export const Header = () => {
  return (
    <div>
      <AppBar position="fixed" className="app_header" elevation={0}
        sx={{ 
          backgroundColor: "transparent",
          justifyContent: 'space-between',
          fontSize: 'var(--font-medium)',
          padding: '0.25rem 1rem',        
          zIndex: 1000
        }}>
        <Box display="flex" justifyContent="flex-start">  {/* align content to left */}
          <Toolbar 
            disableGutters
            sx={{ 
              width: '100vw', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              minHeight: '48px',    
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem'
            }}>
            <NavigationButton />
            <NavbarText className="app_header_nav" />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}
// ...existing code...

export const SideBar = () => {
  return (
    <div>
      <NavbarIcon />
      {/** Social Icons */}
    </div>
  )
}