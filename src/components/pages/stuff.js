import react from 'react';
import { useEffect, useState } from 'react';

const stuff = () => {

	const [posts, setPosts] = useState(false);

	useEffect(() => {
		// grab api here
		setPosts(posts);
	})

	// TODO - here I want to write about Kaizen and Ikigai. probably have
	// the main link to zenith on my main page, or actually make this a 
	// simple blogging/technical philosophical writing platform.
	// that being said I want to keep the main page low k with link to this + zenith 

	return (
		<div>
			<stuffPage/>
		</div>
	)
}

export default stuff;