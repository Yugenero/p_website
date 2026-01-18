import { Intro } from './intro';
import { WorkSection } from './work';
import Projects from './projects';
import { AboutSection } from './about';

const Home = () => {
	return (
		<div>
			<Intro />
			<Projects />
			<AboutSection />
			<WorkSection />
		</div>
	)
}

export default Home;
