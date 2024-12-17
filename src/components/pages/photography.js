import React from "react";
import './pageStyles/photography.css';

/**
 * function that will eventually call photos from google photos api
 * @returns array of photos to be displayed in the tile layout
 */
function photoCaller({ photos }) {
	// TODO: call photos from google photos api
	return photos;
}

// Component that displays interactive photo tiles
const TileLayout = () => {
	return (
		<div>
		<div className="photography-tile-layout-container">
			<div className="photography-tile-layout">
				{/** Photo Items shoudl go hear */}
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
				<img src="https://via.placeholder.com/150" alt="placeholder" /> 
			</div>
		</div>
		</div>
	)
}

// component that displays the photography page with necessary information
const Photography = () => {
	return (
		<div className="photography-page-container">
			<div className='photography-page-information'>Welcome to the photography page</div>
			<TileLayout />
		</div>
	)
}

export default Photography; 
export { TileLayout };