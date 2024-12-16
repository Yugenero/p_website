import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import './styles/footer.css';

const Footer = () => {
  return (
    <AppBar position="static" color="primary" elevation={10}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        top: 'auto', 
        bottom: 0, 
        backgroundColor: 'var(--primary-color-dark)',
        position: 'relative', // needs to be set to relative to avoid particles.js overlap
        width: '100vw', 
		    height: '200px',
        color: 'var(--primary-color-light2)',
        zIndex: 1000,
        py: 2 // padding top and bottom
      }}>
      <Box display="flex" justifyContent="center" height={'inherit'}>
	  	<Toolbar sx={{width: '70%', justifyContent: "space-between"}}>
          <div style={{display: 'flex', flexDirection: 'column', fontFamily: 'var(--current-font)'}}>
            <Typography className='t' variant="p" align="left" sx={{fontSize: { xs: '0.6em', sm: '0.8em' }, paddingBottom:'10px'}}>
              Built from scratch in 
              <a href='https://react.dev/' target='_blank' className='react_link'> <strong> React </strong></a> 
              © Nelson Rodriguez 2025
            </Typography>
            {/**<Typography sx={{fontSize: '0.8em', paddingBottom:'10px', fontFamily: 'var(--current-font)'}}>email me @neroxv1313@gmail.com</Typography>**/}
          </div>
          <Box sx={{ display: 'flex', width: '30%', justifyContent: 'center', fontFamily: 'var(--current-font)'}}>
            <Typography variant="p" align="left" sx={{fontSize: { xs: '0.6em', sm: '0.8em' } , paddingBottom:'10px'}}>
              nelsonrodriguez.me
            </Typography>
          </Box>
      </Toolbar>

      </Box>
    </AppBar>
  );
};

export default Footer;