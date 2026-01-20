import { Intro } from './intro';
import { WorkSection } from './work';
import Projects from './projects';
import { AboutSection } from './about';

const Home = () => {
	return (
		<div>
			<Intro />
			<AboutSection />
			<WorkSection />
			<Projects />
		</div>
	)
}

export default Home;
