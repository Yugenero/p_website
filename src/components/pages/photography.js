import React, { useEffect } from "react";
import { useState } from "react";
import { tileFadeIn } from '../animations/photographyPageAnimations';
import './pageStyles/photography.css';

// Component that displays interactive photo tiles
const TileLayout = ({ photos }) => {

	useEffect(() => {
		tileFadeIn();
	}, [photos]) 
	return (
		<div className="masonry-grid-container">

			{photos.map((photo, index) => (
				<img 
				key={index}
				className="photo-item"
				src={photo.url}
				alt={photo.name}
				loading="lazy"
				onError={(e) => console.error('Image load error:', e)}
			  />
			))}
			<img className="photo-item" src="https://via.placeholder.com/150x200" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/200x150" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/300x200" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/250x250" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/180x240" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/220x170" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/160x200" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/240x180" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/200x300" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/280x190" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/190x280" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/210x160" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/160x210" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/230x170" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/170x230" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/200x200" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/320x180" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/180x320" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/250x170" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/170x250" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/290x200" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/200x290" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/270x180" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/180x270" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/240x160" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/160x240" alt="placeholder" /> 
			<img className="photo-item" src="https://via.placeholder.com/220x220" alt="placeholder" /> 
		</div>
	)
}

const Photography = ( {}) => {

	const [photos, setPhotos] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('https://us-central1-angelic-center-419421.cloudfunctions.net/getPhotos')
		  .then(res => {
			if (!res.ok) throw new Error('Network response was not ok');
			return res.json();
		  })
		  .then(data => {
			console.log('Received data:', data);
			setPhotos(data);
		  })
		  .catch(error => {
			console.error('Fetch error:', error);
			setError(error.message);
		  });
	  }, []);
	
	  if (error) return <div>Error loading images: {error}</div>;

	return (
		<div className="photography-page-container">
			<div className='photography-page-information'>Welcome to the photography page</div>
			<TileLayout photos={photos}/>
		</div>
	)
}

export default Photography; 
export { TileLayout }; 