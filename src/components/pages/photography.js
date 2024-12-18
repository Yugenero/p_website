import React from "react";
import { tileFadeIn } from '../animations/photographyPageAnimations';
import './pageStyles/photography.css';

const { Storage } = require('@google-cloud/storage');

// create new storage instance
const storage = new Storage();
const photos = Storage.bucket('photography').getFiles();

exports.listImages = async (req, res) => {
	try {
		const [files, metadata] = await storage.bucket(photos).getFiles();
		const fileUrls = files.map(file => {
			'https://storage.googleapis.com/' + photos + '/' + file.name;
		})
		const fileMetadata = metadata.map(metadata => {
			'https://storage.googleapis.com/' + photos + '/' + file.fileMetadata;
		})
		res.json(fileUrls);
	} catch {
		console.error('error listing/retrieving images');
		res.status(500).send('Error fetching files/images');
	}
}


// Component that displays interactive photo tiles
const TileLayout = ({ photos, numberOfPhotos }) => {

	/*useEffect(() => {
		tileFadeIn();
	}, [photos, numberOfPhotos])*/

	return (
		<div className="masonry-grid-container">
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