import React from 'react';
import Navbar from './components/navigation';
import HomeText from './components/homeText';
import Header from './components/header';
import Footer from './components/footer';
import Work from './components/work';
import AboutMe from './components/about';
import Projects from './components/projects';
import CustomCursor from './components/cursor/cursor';
import { Router } from 'react-router-dom';
import './App.css';
import './components/styles/home.css';

function reverseAPp() {
  let string1 = 0;
  let string2 = 0;
  let string3 = 0;

  let newString = '';

  for (let i = 0; i < string1.length; i++) {
    document.querySelector('.home_page_intro').innerHTML += string2[i];
    for (let j = 0; j < string2.length; j++) {
      document.querySelector('.home_page_intro').innerHTML += string3[j];
    }
  }
  return (
    <div className='new_String'>
      {}
    </div>
  )
}


function App() {
  return (

    <div className="App">

      <CustomCursor/>
      
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
        <Projects/>
        <hr className='break'/>
      </div>
      <Footer/>

    </div> 
  );
};

export default App;