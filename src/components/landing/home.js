import { Intro } from './about';
import Work from './work';
import Projects from './projects';
import { TracingBeam } from '../global/traceBeam';
import '../styles/home.css';

const Home = () => {
	return (
		<div className="home_page">
			<TracingBeam >
			<Intro/> <hr className='break'/> 
			<Work /> <hr className='break'/> 
			<Projects/> <hr className='break'/>
			</TracingBeam >
		</div>
	)
}

export default Home;