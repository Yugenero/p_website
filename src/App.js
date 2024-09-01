import React from 'react';
import Navbar from './components/navigation';
import HomeText from './components/homeText';
import Header from './components/header';
import Footer from './components/footer';
import Work from './components/work';
import AboutMe from './components/about';
import Projects from './components/projects';
import { Router } from 'react-router-dom';
import './App.css';
import './components/styles/home.css';

function App() {
  return (

    <div className="App">
      
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap')
      </style>

      <Header/>
      <div className="home_page_ui">
        <div className='home_page_intro'>
          <HomeText/>
        </div>
        <hr className='break'/>
        <AboutMe/>
        <hr className='break'/>
        <Work/>
        <hr className='break'/>
        <Projects/>
        <hr className='break'/>
      </div>
      <Footer/>

    </div> 
  );
};

export default App;