import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileIntro } from './mobileIntro';
import { ProjectFeed } from './projectFeed';

// Home page: the project feed. On desktop, who Nelson is and how to reach him live in the sidebar; on phones a
// short typed intro with the main actions sits above the feed, and the rest is in the menu.
// (The old hero, intro.jsx with the code card and photo strip, is kept in the codebase but not shown.)
const Home = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true });

  return (
    <>
      {isMobile && <MobileIntro />}
      <ProjectFeed />
    </>
  );
};

export default Home;
