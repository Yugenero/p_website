import React from 'react';
import { Link } from 'react-router-dom';
import './pageStyles/about.css';

const AboutPage = () => {
  return (
    <div className='about-page-container'>
      <div>Welcome to the about page</div>
      <Link to="/photography" className='photography-page-link'>photography</Link>
      <div className='random-japanese-text'>ありがとうございますね</div>
    </div>
  )
}

export { AboutPage };