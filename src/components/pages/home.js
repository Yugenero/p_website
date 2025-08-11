import React from 'react';
import HomeText from '../landing/homeText';
import AboutMe from '../landing/about';
import Work from '../landing/work';
import Projects from '../landing/projects';
import '../styles/home.css';

const Home = () => {
	return (
		<div className="home_page_ui">
			<div className='home_page_intro'>
				<HomeText/>
			</div>
			<hr className='break'/>
			<AboutMe/>
			<hr className='break'/>
			<Work />
			<hr className='break'/>
			<Projects/>
			<hr className='break'/>
    	</div>
	)
}

export default Home;