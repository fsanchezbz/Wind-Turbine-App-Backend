const express = require('express');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Configure Cloudinary with your Cloudinary URL
cloudinary.config({
  cloud_name: 'windturbineprofile',
  api_key: '984657238132575',
  api_secret: 'eTqJxyGsO4-6ZGXTYwF7Wc8KcW8'
});

// Route to fetch all uploaded images
router.get('/images', async (req, res) => {
  try {
    const result = await cloudinary.api.resources();
    const images = result.resources;
    res.json(images);
  } catch (error) {
    console.error('Error fetching uploaded images:', error);
    res.status(500).json({ error: 'An error occurred while fetching images' });
  }
});

module.exports = router;
