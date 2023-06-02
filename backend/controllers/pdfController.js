// const path = require('path');
// const Image = require('../models/imageSchema');
// const fs = require('fs');

// // Get all images
// const getAllImages = async (req, res) => {
//   try {
//     const images = await Image.find({});

//     images.forEach((image) => {
//       const filePath = image.filePath;
//       const fileName = path.basename(filePath);

//       const fileStream = fs.createReadStream(filePath);
//       fileStream.pipe(res);
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const uploadImage = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     const file = req.files[0]; // Assuming only one file is uploaded

//     // Replace backslashes with forward slashes in the file path
//     const filePath = file.path.replace(/\\/g, '/');

//     const image = new Image({
//       filename: file.originalname,
//       size: file.size,
//       createdAt: new Date(),
//       filePath: filePath,
//     });

//     const savedImage = await image.save();

//     res.status(200).json(savedImage);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ message: 'Error uploading image', error: error.message });
//   }
// };

// module.exports = {
//   uploadImage,
//   getAllImages
// };



// // / pdfController.js
// // const PDF = require('../models/pdfSchema');
// // const path = require('path')

// // // Get all work orders
// // const getAllPDFs = async (req, res) => {
// //   try {
// //     const pdfs = await PDF.find();
// //     console.log(pdfs)
// //     console.log('/uploads', path.join(__dirname, pdfs.filePath))
// //     // path.resolve(__dirname, `../../${pdfs.filePath}`)
// //     // c://Users/Jared/.../Wind-Turbine-App/backend/controllers/pdfController/uploads/e861d3c59481a030d356183bb452f7c2
// //     res.status(200).send('hey!');
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // const uploadPDF = async (req, res) => {
// //   try {
// //     if (!req.files || req.files.length === 0) {
// //       return res.status(400).json({ message: 'No files uploaded' });
// //     }

// //     const file = req.files[0]; // Assuming only one file is uploaded

// //     // Replace backslashes with forward slashes in the file path
// //     const filePath = file.path.replace(/\\/g, '/');

// //     const pdf = new PDF({
// //       //pdfOrderId: 
// //       filename: file.originalname,
// //       size: file.size,
// //       createdAt: new Date(),
// //       filePath: filePath,
// //     });

// //     const savedPDF = await pdf.save();

// //     res.status(200).json(savedPDF);
// //   } catch (error) {
// //     console.error('Error uploading PDF:', error);
// //     res.status(500).json({ message: 'Error uploading PDF', error: error.message });
// //   }
// // };

// // module.exports = {
// //   uploadPDF,
// //   getAllPDFs
// // };