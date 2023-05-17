const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  turbineModel: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  technician: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

module.exports = WorkOrder;