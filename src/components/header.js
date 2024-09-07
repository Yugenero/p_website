import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavbarSmall } from './navigation';
import { ReactTyped } from 'react-typed';
import { Button } from '@mui/material';
import { FontContext } from './fontContext';
import './styles/header.css';

const ChangeFontButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="contained" color="primary"
      sx={{ display: 'flex', position: 'absolute', right: '205px', backgroundColor: 'black',
        fontFamily: 'var(--font-family-playwrite)', color: 'var(--primary-color-light2)',
        '&:hover': {
          backgroundColor: 'black',
          color: 'var(--white)'
        }
      }}>
        A
    </Button>
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
            <Typography component="a" href="/" className='app_header_name'
              sx={{ fontFamily: fontFamily, color: 'var(--primary-color-light2)', textDecoration: 'none', fontSize: '1.2em', fontWeight: 'bold'}}>
              nero.me
              <ReactTyped
                strings={[' ']}
                cursorChar='|'
              />
            </Typography>
            <NavbarSmall className="app_header_nav" />
            <ChangeFontButton onClick={changeFont} />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default Header;