import React from "react";


// component that displays the photography page with necessary information
const Photography = () => {
	return (
		<div>
			<div className='photography-page-container'>Welcome to the photography page</div>
		</div>
	)
}

// Component that displays interactive photo tiles
const TileLayout = () => {
	return (
		<div className="photgraphy-tile-layout-container">
			<div className="photography-tile-layout">
				{/** Photo Items shoudl go hear */}
				<img src="https://via.placeholder.com/150" alt="placeholder" />
				<img src="https://via.placeholder.com/150" alt="placeholder" />
				<img src="https://via.placeholder.com/150" alt="placeholder" />
				<img src="https://via.placeholder.com/150" alt="placeholder" />
				<img src="https://via.placeholder.com/150" alt="placeholder" />
				<img src="https://via.placeholder.com/150" alt="placeholder" />
			</div>
		</div>
	)
}

export { Photography, TileLayout };