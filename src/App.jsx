import { Sidebar } from './components/global/sidebar';
import { MobileHeader } from './components/global/mobileHeader';
import Home from './components/landing/home';

import { CssBaseline, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Main, Page } from './components/ui/primitives';
import { useEffect, useMemo, useState } from 'react';
import buildTheme from './theme';
import { profile } from './data/profile';

// Page Imports
import { AboutPage } from './components/pages/about';
import { WorkPage } from './components/pages/work';
import PhotographyPage from './components/pages/photography';
import { BlogPage, BlogPostPage } from './components/pages/blog';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="page-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        {/* The projects page (pages/projects.jsx → landing/projects.jsx) is kept but out of use for now; the home
            feed covers projects. Old links land on home. */}
        <Route path="/projects" element={<Navigate to="/" replace />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route
          path="/photography"
          element={profile.photographyOpen ? <PhotographyPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

const AppShell = ({ mode, onToggleTheme }) => {
  // Measured on the first render (noSsr; the app only runs in the browser), so phones never flash the sidebar.
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Page>
      {isMobile ? (
        <MobileHeader mode={mode} onToggleTheme={onToggleTheme} />
      ) : (
        <Sidebar mode={mode} onToggleTheme={onToggleTheme} />
      )}
      <Main>
        <AnimatedRoutes />
      </Main>
    </Page>
  );
};

function App() {
  const [mode, setMode] = useState(() => {
    // Dark by default; light only when the visitor chose it.
    const storedMode = window.localStorage.getItem('themeMode');
    return storedMode === 'light' ? 'light' : 'dark';
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
        <AppShell mode={mode} onToggleTheme={handleToggleTheme} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
