import React, { useEffect, useState } from "react";
import { tileFadeIn } from '../animations/photographyPageAnimations';
import './pageStyles/photography.css';

/**
 * Tile layout for the photography page using masonry grid
 * @param {*} param0 
 * @returns 
 */
const TileLayout = ({ photos }) => {
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
    </div>
  );
};

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (photos.length > 0 && !mounted) {
      tileFadeIn();
      setMounted(true);
    }
  }, [photos, mounted]);

  useEffect(() => {
    fetch('https://us-central1-angelic-center-419421.cloudfunctions.net/getPhotos')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="photography-loading-icon">Loading...</div>;
  if (error) return <div>Error loading images: {error}</div>;

  return (
    <div className="photography-page-container">
      <div className='photography-page-information'>Welcome to the photography page</div>
      <TileLayout photos={photos} />
    </div>
  );
};

export default Photography;