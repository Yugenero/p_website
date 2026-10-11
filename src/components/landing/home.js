import { Intro } from './intro';

// Landing page: a single screen with who Nelson is and how to reach him.
// Deeper content lives on /about, /work, and /projects (linked from the header).
const Home = () => {
  return (
    <div>
      <Intro />
    </div>
  );
};

export default Home;
