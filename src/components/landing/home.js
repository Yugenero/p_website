import { Intro } from './intro';
import { ImpactStrip } from './impact';
import { ExperienceSummary } from './experienceSummary';
import { Toolkit } from './toolkit';
import { FeaturedProjects } from './featuredProjects';
import { ContactBand } from './contact';

// Landing page: a dense, scannable overview that links into the deeper pages.
const Home = () => {
  return (
    <div>
      <Intro />
      <ImpactStrip />
      <ExperienceSummary />
      <Toolkit />
      <FeaturedProjects />
      <ContactBand />
    </div>
  );
};

export default Home;
