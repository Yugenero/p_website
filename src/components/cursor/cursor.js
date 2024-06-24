import React from 'react';
import AnimatedCursor from 'react-animated-cursor';

const CustomCursor = () => { 
	return (
		<AnimatedCursor 
			color='0, 0, 0'
			innerSize={15}
			outerSize={10}
			innerScale={0.1}
			outerScale={5}
			trailingSpeed={5}
			showSystemCursor={false}
			outerStyle={{
				backgroundColor: 'transparent',
				border: '1px solid rgb(100, 100, 100)',
				zIndex: '1500'
			}}
			innerStyle={{
				border: '1px solid rgb(100, 100, 100)',
				zIndex: '1500'
			}}
		/>
	)
}

export default CustomCursor;