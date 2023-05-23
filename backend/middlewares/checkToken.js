const jwt = require('jsonwebtoken');
const ErrorStatus = require('../utils/errorStatus');

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ErrorStatus('No token sent!', 400);
    }

    const { _id, isAdmin , status} = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = _id;
    req.isAdmin = isAdmin;
    req.status = status;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
