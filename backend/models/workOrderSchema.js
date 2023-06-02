const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  requestDetails: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bestTimes: {
    type: String,
    required: true,
  },
  completionDate: {
    type: String,
    required: true,
  },

  turbineModel: {
    type: String,
    required: true,
  },
  description: {
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
  addInfo: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String, // Store the URL of the profile image
  },  
  update: {
    type: String, // Store the URL of the profile image
  },  
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

module.exports = WorkOrder;


// const mongoose = require('mongoose');

// const workOrderSchema = new mongoose.Schema({
//   _id: { type: mongoose.Types.ObjectId, auto: true },
//   orderId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   requestDetails: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   bestTimes: {
//     type: String,
//     required: true,
//   },
//   completionDate: {
//     type: String,
//     required: true,
//   },

//   turbineModel: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   technician: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   addInfo: {
//     type: String,
//   },
//   status: {
//     type: Boolean,
//     default: false,
//   },
//   file: {
//     type: mongoose.ObjectId,
//     ref: 'PDF',
//   },
  
// });

// const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

// module.exports = WorkOrder;
