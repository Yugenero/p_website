import { Intro } from './about';
import { Work } from './work';
import Projects from './projects';
import { TracingBeam, TracingBeamLeft, TracingBeamRight } from '../global/traceBeam';
import '../styles/home.css';

const Home = () => {
	return (
		<div className="home_page">
			<TracingBeamLeft>
			<TracingBeamRight>
			<Intro/> <hr className='break'/> 
			<Work /> <hr className='break'/> 
			<Projects/> <hr className='break'/>
			</TracingBeamRight>
			</TracingBeamLeft>
		</div>
	)
}

export default Home;