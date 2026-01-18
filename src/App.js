import { Header } from './components/global/header';
import Footer from './components/global/footer';
import Home from './components/landing/home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Page } from './components/ui/primitives';

// Page Imports
import { AboutPage } from './components/pages/about';
import { WorkPage } from './components/pages/work';
import Photography from './components/pages/photography';
import { ProjectsPage } from './components/pages/projects';

function App() {
  return (
    <Router>
      <Page>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
        </Main>
        <Footer />
      </Page>
    </Router>
  );
}

export default App;
