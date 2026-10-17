import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Starfield from '../global/starfield';
import { MobileIntro } from './mobileIntro';
import { ProjectFeed } from './projectFeed';

// Home page: the project feed. On desktop, who Nelson is and how to reach him live in the sidebar; on phones a
// short typed intro with the main actions sits above the feed, and the rest is in the menu.
// (The old hero, intro.jsx with the code card and photo strip, is kept in the codebase but not shown.)
const Home = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true });

  return (
    <HomeWrap>
      <Starfield />
      {isMobile && <MobileIntro />}
      <ProjectFeed />
    </HomeWrap>
  );
};

// At least a screen tall so the dark-mode starfield around the tiles reaches the bottom of the window.
const HomeWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  '& > *:not([data-starfield])': {
    position: 'relative',
    zIndex: 1,
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100dvh - 56px)',
  },
}));

export default Home;
