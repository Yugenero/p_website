import React from 'react';
import './App.css';
import Navbar from './components/navigation';
import { Squash as Hamburger } from 'hamburger-react';
import './components/text_animation';
import AnimateText from './components/text_animation';
import CircleAnimation from './components/shapes';
import { SvgAnimation } from './components/shapes';
import { LineAnimation } from './components/shapes';


function App() {
  return (
    <div className="App">

      {/**Font for Georgia Tech link */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap')
      </style>
      
      <header className="App-header">
        <div className="line-container">      
          {/**<LineAnimation x1="0%" y1="25%" x2="100%" y2="25%"/> */}
        </div>
        <div className="line-container">      
          {/**<LineAnimation x1="100%" y1="75%" x2="0%" y2="75%"/> */}
        </div>
        <strong class="header-introduction"><AnimateText/></strong>
        <p class='header-information'>Software Engineer {/**<a class="company">@Meta</a>**/} and
          <a> </a>
          <a class="link-parchment" target="_blank" rel="noopener noreferrer" href="https://www.parchment.com/u/award/cdc63a097762a059103a9b3ce857a15e">CS Alum</a>
          <a> </a>
          <a class="link-gatech" target="_blank" rel="noopener noreferrer" href="https://www.cc.gatech.edu/">
            <strong class="georgia-tech">@Georgia Tech</strong>
          </a> 
        </p>
        <Navbar/>
      </header>
      {/**
       * Body section for animations
       */}
      <body>
        {/** <SvgAnimation/>*/}
      </body>
    </div> 
  );
};

export default App;