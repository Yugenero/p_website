import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavbarSmall }  from './navigation';
import CustomCursor from './cursor/cursor';
import { ReactTyped } from 'react-typed';
import { Button } from '@mui/material';
import './styles/header.css'; // Import the CSS file

function Header() {

  const fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-family-ibm-plex-mono');

  return (
    <div>
    <CustomCursor/>
    <AppBar position="fixed" className="app_header" elevation={0}
		  sx={{backgroundColor: "var(--primary-color-dark)"}}>
      <Box display="flex" justifyContent="center">
        <Toolbar sx={{width: '70vw', justifyContent: 'space-between'}}>
          <Typography component="a" href="/" className='app_header_name' 
            sx={{fontFamily: fontFamily, textDecoration: 'none', fontSize: '1.5em'}}>
              /nero.me
              <ReactTyped 
                strings={[' ']} 
                cursorChar='_'
                />
          </Typography>
          <NavbarSmall className="app_header_nav"/>
        </Toolbar>
      </Box>
    </AppBar>
    </div>
  );
}

export default Header;