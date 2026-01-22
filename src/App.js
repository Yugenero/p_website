import { Header } from './components/global/header';
import Footer from './components/global/footer';
import Home from './components/landing/home';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Main, Page } from './components/ui/primitives';
import { useEffect, useMemo, useState } from 'react';
import buildTheme from './theme';

// Page Imports
import { AboutPage } from './components/pages/about';
import { WorkPage } from './components/pages/work';
import Photography from './components/pages/photography';
import { ProjectsPage } from './components/pages/projects';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="page-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = window.localStorage.getItem('themeMode');
    return storedMode === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    window.localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const handleToggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Page>
          <Header mode={mode} onToggleTheme={handleToggleTheme} />
          <Main>
            <AnimatedRoutes />
          </Main>
          <Footer />
        </Page>
      </Router>
    </ThemeProvider>
  );
}

export default App;
