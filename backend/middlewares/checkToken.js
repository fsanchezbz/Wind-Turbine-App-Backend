const jwt = require('jsonwebtoken');
const ErrorStatus = require('../utils/errorStatus');

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ErrorStatus('No token sent!', 400);
    }

    const { _id, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = _id;
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
