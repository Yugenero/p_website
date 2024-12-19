import React from 'react';
import { Link } from 'react-router-dom';
import './pageStyles/about.css';

const AboutPage = () => {
  return (
    <div className='about-page-container'>
      <div>Welcome to the about page (under construction)</div>
      <div> In the meantime, check out my <span><Link to="/photography" className='photography-link'>photography</Link></span> </div>
    </div>
  )
}

export { AboutPage };