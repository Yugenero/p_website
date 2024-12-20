import React, { useContext, useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavbarText } from './navigation';
import { Button} from '@mui/material';
import { FontContext } from './fontContext';
import { animateNavTextSlideIn, animateNavTextSlideOut, animateNavFadeIn } from './animations/text_animation';
import './styles/header.css';
import './styles/headerNavigation.css'

// binary search algorithm for literally no reason
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor(right - left) / 2;

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    if (right < left) {
      return -1;
    }
  }
  return -1;
}


const ChangeFontButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} color="primary"
      sx={{ forceLowerdisplay: 'flex', position: 'absolute', right: '47%', backgroundColor: 'var(--primary-color-dark)',
        fontFamily: 'Times New Roman', fontSize: '1em', color: 'var(--primary-color-light2)',
        '&:hover': {
          backgroundColor: 'var(--primary-color-dark)',
          color: 'var(--white)'
        } }}>Font
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
          {/**<div className='navigation-subcontainer2'> 
           * We dont need this right now
          </div>**/}
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
        sx={{ 
          backgroundColor: "var(--primary-color-dark)", 
          borderBottom: '0.5px solid var(--primary-color)', 
          zIndex: 1000
        }}>
        <Box display="flex" justifyContent="center">
          <Toolbar sx={{ width: '70vw', justifyContent: 'space-between' }}>
            <NavigationButton />
            <NavbarText className="app_header_nav" />
            {/**<ChangeFontButton className="change-font-button" onClick={changeFont} />**/}
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );


  // export the header downb her this is going to be a little better now t
}

export default Header;