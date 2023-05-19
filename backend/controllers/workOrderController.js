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
      turbineModel: req.body.turbineModel,
      description: req.body.description,
      location: req.body.location,
      technician: req.body.technician,
      date: req.body.date,
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

    workOrder.turbineModel = req.body.turbineModel || workOrder.turbineModel;
    workOrder.description = req.body.description || workOrder.description;
    workOrder.location = req.body.location || workOrder.location;
    workOrder.technician = req.body.technician || workOrder.technician;
    workOrder.date = req.body.date || workOrder.date;
    workOrder.addInfo = req.body.addInfo || workOrder.addInfo;
    const updatedWorkOrder = await workOrder.save();
    res.json(updatedWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a work order
// const updateWorkOrder = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { turbineModel, description, location, technician, date,  addInfo } = req.body;
//       const updatedFields = {};
//       if (turbineModel) updatedFields.turbineModel = turbineModel;
//       if (description) updatedFields.description = description;
//       if (location) updatedFields.location = location;
//       if (technician) updatedFields.technician = technician;
//       if (date) updatedFields.date = date;
//       if (addInfo) updatedFields.addInfo = addInfo;
  
//       const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(id, updatedFields, { new: true });
//       res.status(200).json(updatedWorkOrder);
//     } catch (error) {
//       next(error);
//     }
//   };

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
  getOneWork
};
