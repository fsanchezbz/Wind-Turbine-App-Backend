// pdfController.js
const PDF = require('../models/pdfSchema');

// Get all work orders
const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find({});
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadPDF = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const file = req.files[0]; // Assuming only one file is uploaded

    // Replace backslashes with forward slashes in the file path
    const filePath = file.path.replace(/\\/g, '/');

    const pdf = new PDF({
      //pdfOrderId: 
      filename: file.originalname,
      size: file.size,
      createdAt: new Date(),
      filePath: filePath,
    });

    const savedPDF = await pdf.save();

    res.status(200).json(savedPDF);
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ message: 'Error uploading PDF', error: error.message });
  }
};

module.exports = {
  uploadPDF,
  getAllPDFs
};
