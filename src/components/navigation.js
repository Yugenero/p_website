import React from 'react';
import './navigation.css';
import './text_animation.css';

const Navbar = () => {
	return(
		<nav class="navigation">
        <ul class="navigation-list">
		  <li class ="navigation_item" href="#">
		  <a class="navigation-link" target="_blank" rel="noopener noreferrer"
		  href="src/components/Rodriguez2024.pdf">Resume</a>
		  </li>
          <li class ="navigation_item" href="#">
		  <a class="navigation-link" target="_blank" rel="noopener noreferrer" 
			href="https://www.linkedin.com/in/nelson-rodriguez13/">LinkedIn </a> {' '}
		  </li>
          <li class ="navigation_item" href="#">
		  	<a class="navigation-link" target="_blank" rel="noopener noreferrer" 
			href="https://github.com/Yugenero"> Github </a>
		  </li>
		  <li class ="navigation-item" href="#">
		  <a class="navigation-link" target="_blank" rel="noopener noreferrer" 
			href="mailto: neroxv1313@gmail.com">Email</a>
		  </li>
        </ul>
        </nav>
	);
};

// I want tor try and tie in the navigation to search icon in the top left of the screen
// try adding a modeling section in the top right of the screen

// export declaration is used to export values from a Javascript module.
// which can then be imported into other programs with the "import" declaration
export default Navbar;