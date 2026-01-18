import { Divider, Page } from '../ui/primitives';
import { Intro } from './intro';
import { AboutSection } from './about';
import { Work } from './work';
import Projects from './projects';

const Home = () => {
  return (
    <Page>
      <Intro />
      <Divider />
      <AboutSection />
      <Divider />
      <Work />
      <Divider />
      <Projects />
    </Page>
  );
};

export default Home;
