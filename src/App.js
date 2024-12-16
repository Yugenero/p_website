// App.js 
import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/pages/home';

import Signature from './components/signature';
import { FontProvider } from './components/fontContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/styles/home.css';

// Page Imports
import { AboutPage } from './components/pages/about';
import { WorkPage } from './components/pages/work';
import { Photography } from './components/pages/photography';
import { ProjectsPage } from './components/pages/projects';

function App() {

  return (
    <FontProvider>
      
      {/** CSS style imports */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+CA:wght@100..400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100..900&display=swap');
      </style>

      {/** Page Routes in Header Page */}
      <Router>
        <div className="App"> 
          <Header />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/work" element={<WorkPage/>}/>
              <Route path="/projects" element={<ProjectsPage/>}/>
              <Route path="/photography" element={<Photography />}/>
            </Routes>
            <Footer/>
          <Signature />
        </div> 
      </Router>
    </FontProvider>
  );
};

export default App;