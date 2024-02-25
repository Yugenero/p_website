import React from 'react';
import './text_animation.css'

const AnimateText = () => {
	return(
		<div class="header-spin">
          <span style={{ '--i': 1 }}>H</span>
          <span style={{ '--i': 2 }}>e</span>
          <span style={{ '--i': 3 }}>y</span>  
          <span style={{ '--i': 4 }}>,&nbsp;</span> {' '}
          <span style={{ '--i': 5 }}>I</span>
          <span style={{ '--i': 6 }}>'</span>
          <span style={{ '--i': 7 }}>m&nbsp;</span>  {' '} 
          <span style={{ '--i': 8 }}>N</span>
          <span style={{ '--i': 9 }}>e</span>
          <span style={{ '--i': 10 }}>l</span>
          <span style={{ '--i': 11 }}>s</span>
          <span style={{ '--i': 12 }}>o</span>
          <span style={{ '--i': 13 }}>n</span>
        </div>
	);
}; // finding the nautre of this other person 

export default AnimateText;