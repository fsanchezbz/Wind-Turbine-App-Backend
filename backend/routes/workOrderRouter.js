const workRouter = require('express').Router();
const {
  getAllWorkOrders,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  getOneWork
} = require('../controllers/workOrderController');

workRouter.route('/all').get(getAllWorkOrders);
workRouter.route('/work-orders').post( createWorkOrder);
workRouter.route('/update/:id').put(updateWorkOrder);
workRouter.route('/delete/:id').delete( deleteWorkOrder);
workRouter.route('/:id').get(getOneWork);
module.exports = workRouter;

