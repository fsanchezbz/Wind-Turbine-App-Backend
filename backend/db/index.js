const mongoose = require('mongoose');

module.exports = () =>
  mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
