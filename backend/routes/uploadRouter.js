
// // workUploadRouter.js
// const express = require('express');
// const multer = require('multer');
// const PNG = require('../models/pngSchema');

// const workUploadRouter = express.Router();
// const upload = multer();

// // Route for fetching PNG by ID
// workUploadRouter.get('/file/:id', async (req, res) => {
//   try {
//     const pngId = req.params.id;
//     const png = await PNG.findById(pngId);

//     if (!png) {
//       return res.status(404).json({ message: 'PNG not found' });
//     }

//     res.json(png.image);
//   } catch (error) {
//     console.error('Error fetching PNG:', error);
//     res.status(500).json({ message: 'Error fetching PNG', error: error.message });
//   }
// });

// workUploadRouter.post('/file', upload.single('file'), async (req, res) => {
//     try {
//       const { originalname, buffer } = req.file;
  
//       // Create a new PNG document
//       const png = new PNG({
//         image: buffer.toString('base64'), // Convert buffer to base64 string
//       });
  
//       // Save the PNG document to the database
//       const savedPNG = await png.save();
  
//       res.status(201).json({ message: 'PNG uploaded successfully', png: savedPNG });
//     } catch (error) {
//       console.error('Error uploading PNG:', error);
//       res.status(500).json({ message: 'Error uploading PNG', error: error.message });
//     }
//   });

// module.exports = workUploadRouter;