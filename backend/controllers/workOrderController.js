const WorkOrder = require('../models/workOrderSchema');

// Get all work orders
const getAllWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find({});
    res.json(workOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new work order
const createWorkOrder = async (req, res) => {
  const workOrder = new WorkOrder({
    orderId: req.body.orderId,
    turbineModel: req.body.turbineModel,
    description: req.body.description,
    location: req.body.location,
    technician: req.body.technician,
    date: req.body.date,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    requestDetails: req.body.requestDetails,
    bestTimes: req.body.bestTimes,
    completionDate: req.body.completionDate,
    addInfo: req.body.addInfo,
    status: req.body.status,
    image: req.body.image,
  });

  try {
    
    const newWorkOrder = await workOrder.save();
    res.status(201).json(newWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a work order
const updateWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id);

    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }
    workOrder.orderId = req.body.orderId || workOrder.orderId;
    workOrder.name = req.body.name || workOrder.name;
    workOrder.email = req.body.email || workOrder.email;
    workOrder.phone = req.body.phone || workOrder.phone;
    workOrder.requestDetails = req.body.requestDetails || workOrder.requestDetails;
    workOrder.location = req.body.location || workOrder.location;
    workOrder.bestTimes = req.body.bestTimes || workOrder.bestTimes;
    workOrder.completionDate = req.body.completionDate || workOrder.completionDate;
    workOrder.turbineModel = req.body.turbineModel || workOrder.turbineModel;
    workOrder.description = req.body.description || workOrder.description;
    workOrder.technician = req.body.technician || workOrder.technician;
    workOrder.date = req.body.date || workOrder.date;
    workOrder.addInfo = req.body.addInfo || workOrder.addInfo;
    workOrder.status = req.body.status || workOrder.status;
    workOrder.image =req.body.image || workOrder.image;
    const updatedWorkOrder = await workOrder.save();
    res.json(updatedWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a work order
const deleteWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id);

    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    await WorkOrder.deleteOne({ _id: req.params.id });
    res.json({ message: 'Work order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific work order
const getOneWork = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id);

    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorkOrders,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  getOneWork,
};


// const WorkOrder = require('../models/workOrderSchema');

// // Get all work orders
// const getAllWorkOrders = async (req, res) => {
//   try {
//     const workOrders = await WorkOrder.find({}).populate('file');
//     res.json(workOrders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new work order
// const createWorkOrder = async (req, res) => {
//   try {
//     const { orderId,
//       turbineModel,
//       description,
//       location,
//       technician,
//       date,
//       name,
//       email,
//       phone,
//       requestDetails,
//       bestTimes,
//       completionDate,
//       addInfo,
//       status,
//     file } = req.body;
//     const workOrder = await WorkOrder.create({ orderId,
//       turbineModel,
//       description,
//       location,
//       technician,
//       date,
//       name,
//       email,
//       phone,
//       requestDetails,
//       bestTimes,
//       completionDate,
//       addInfo,
//       status,
//     file });
//     return res.status(201).json(workOrder);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update a work order
// const updateWorkOrder = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const { orderId,
//     turbineModel,
//     description,
//     location,
//     technician,
//     date,
//     name,
//     email,
//     phone,
//     requestDetails,
//     bestTimes,
//     completionDate,
//     addInfo,
//     status,
//     file } = req.body;
  
//     const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(

//       id,
//       {orderId,
//         turbineModel,
//         description,
//         location,
//         technician,
//         date,
//         name,
//         email,
//         phone,
//         requestDetails,
//         bestTimes,
//         completionDate,
//         addInfo,
//         status,
//         file },
//         { new: true, runValidators: true }

//     ).populate('file');
 
//     res.json(updatedWorkOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a work order
// const deleteWorkOrder = async (req, res) => {
//   try {
//     const workOrder = await WorkOrder.findById(req.params.id);

//     if (!workOrder) {
//       return res.status(404).json({ message: 'Work order not found' });
//     }

//     await WorkOrder.deleteOne({ _id: req.params.id });
//     res.json({ message: 'Work order deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a specific work order
// const getOneWork = async (req, res) => {
//   try {
//     const workOrder = await WorkOrder.findById(req.params.id);

//     if (!workOrder) {
//       return res.status(404).json({ message: 'Work order not found' });
//     }

//     res.json(workOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getAllWorkOrders,
//   createWorkOrder,
//   updateWorkOrder,
//   deleteWorkOrder,
//   getOneWork,
// };
