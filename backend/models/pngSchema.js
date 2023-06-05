// PngSchema.js
const mongoose = require('mongoose');

const pngSchema  = new mongoose.Schema({
  image: {
    type: String,
  }
 
},)

const PNG = mongoose.model('PNG', pngSchema );

module.exports = PNG;
