import { useEffect, useState } from 'react';

const PHOTOS_URL = 'https://us-central1-angelic-center-419421.cloudfunctions.net/getPhotos';

// One request per page load, shared by the landing strip and /photography.
let photosPromise = null;

const loadPhotos = () => {
  if (!photosPromise) {
    photosPromise = fetch(PHOTOS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .catch((error) => {
        photosPromise = null; // allow a retry on the next mount
        throw error;
      });
  }
  return photosPromise;
};

export const usePhotos = () => {
  const [state, setState] = useState({ photos: [], loading: true, error: null });

  useEffect(() => {
    let isMounted = true;
    loadPhotos()
      .then((photos) => {
        if (isMounted) setState({ photos: Array.isArray(photos) ? photos : [], loading: false, error: null });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        if (isMounted) setState({ photos: [], loading: false, error: error.message });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
