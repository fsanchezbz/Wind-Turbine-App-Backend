// // workUploadRouter.js
// const express = require('express');
// const multer = require('multer');
// const PDF = require('../models/pdfSchema');

// const workUploadRouter = express.Router();
// const upload = multer({ dest: 'uploads/' });

// const { uploadPDF, getAllPDFs } = require('../controllers/pdfController');

// // workUploadRouter.use(express.static('uploads'));

// // Route for uploading PDF
// workUploadRouter.post('/upload-pdf', upload.array('pdfs'), uploadPDF);

// // Route for getting all PDF files
// workUploadRouter.get('/all', getAllPDFs);

// // Route for fetching PDF by ID
// workUploadRouter.get('/file/:id', async (req, res) => {
//   try {
//     const pdfId = req.params.id;
//     const pdf = await PDF.findById(pdfId);

//     if (!pdf) {
//       return res.status(404).json({ message: 'PDF not found' });
//     }

//     res.json(pdf);
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).json({ message: 'Error fetching PDF', error: error.message });
//   }
// });

// module.exports = workUploadRouter;
