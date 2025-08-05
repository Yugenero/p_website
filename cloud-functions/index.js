/**
 * Custom Function for retrieving photos from Google Cloud Storage.
 */
const { Storage } = require('@google-cloud/storage');

exports.getPhotos = async (res) => {
  const storage = new Storage();
  const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    console.log('Files found:', files.length);
    
    const photos = files.map(file => ({
      url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
      name: file.name
    }));
    
    console.log('First photo URL:', photos[0]?.url);
    res.set('Access-Control-Allow-Origin', '*');
    res.json(photos);
  } catch (error) {
    console.error('Detailed error:', error);
    console.log("Detailed error for user", error);
    res.status(500).json({ error: error.message });
  }
};