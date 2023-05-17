const workRouter = require('express').Router();
const {
  getAllWorkOrders,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} = require('../controllers/workOrderController');

workRouter.get('/all', getAllWorkOrders);
workRouter.post('/work-orders', createWorkOrder);
workRouter.patch('/work-orders/:id', updateWorkOrder);
workRouter.delete('/work-orders/:id', deleteWorkOrder);

module.exports = workRouter;

module.exports = workRouter;