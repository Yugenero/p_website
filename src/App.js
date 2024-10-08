import React, { useState } from 'react';
import Navbar from './components/navigation';
import HomeText from './components/homeText';
import Header from './components/header';
import Footer from './components/footer';
import Work from './components/work';
import AboutMe from './components/about';
import Projects from './components/projects';
import { FontProvider } from './components/fontContext';
import './App.css';
import './components/styles/home.css';

function App() {

  return (
    <FontProvider>
    <div className="App" >
      
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+CA:wght@100..400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100..900&display=swap');
      </style>

      <Header />
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
    </FontProvider>
  );
};

export default App;