import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavbarSmall } from './navigation';
import { ReactTyped, Typed } from 'react-typed';
import { Button } from '@mui/material';
import { FontContext } from './fontContext';
import { Squash as Hamburger } from 'hamburger-react'
import './styles/header.css';


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

function HeaderAnimation() {

  const { fontFamily } = useContext(FontContext);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }
  const handleMouseLeave = () => {
    setHover(false);
  }

  return (
    <Typography component="a" href="/" className='app_header_navigation'
      sx={{ 
        fontFamily: fontFamily, 
        color: 'var(--primary-color-light2)', 
        textDecoration: 'none', 
        fontSize: '1.2em', 
        fontWeight: 'normal',
        '&:hover': {
          color: 'white',
        }}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        navigation
    </Typography>
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
            <HeaderAnimation />
            <NavbarSmall className="app_header_nav" />
            <ChangeFontButton className="change-font-button" onClick={changeFont} />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default Header;