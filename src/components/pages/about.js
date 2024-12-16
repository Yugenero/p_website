import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
	return (
		<div>
			<div className='about-page-container'>Welcome to the about page</div>
			<Link className='photgraphy-page-link'>photgraphy</Link>
		</div>

	)
}

export { AboutPage } ;