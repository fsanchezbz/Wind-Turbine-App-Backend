const userRouter = require('express').Router();
const {
  login,
  adminLogin,
  getOneUser,
  createUser,
  getAllUsers
} = require('../controllers/userControllers');
const checkToken = require('../middlewares/checkToken');

userRouter.route('/login').post(login);
userRouter.route('/admin/login').post(adminLogin);
userRouter.route('/signup').post(createUser);
userRouter.route('/me').get(checkToken, getOneUser);
userRouter.route('/all').get(getAllUsers);
module.exports = userRouter;
