const User = require('../models/userSchema');
const ErrorStatus = require('../utils/errorStatus');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new ErrorStatus('Missing fields', 400);
    }

    // Find the user by username or email
    const findUser = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    }).select('+password');
    
    if (!findUser) {
      throw new ErrorStatus('User not found!', 404);
    }

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) {
      throw new ErrorStatus('Password does not match!', 401);
    }

    const isAdmin = findUser.isAdmin; // Get the admin status from the user document

    const token = generateToken(findUser._id, isAdmin);

    return res
      .cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      .sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new ErrorStatus('Missing fields', 400);
    }

    const admin = await User.findOne({ $or: [{ userName }, { email }] }).select('+password');


    if (!admin || !admin.isAdmin) {
      throw new ErrorStatus('Access denied. You are not an admin.', 401);
    }

    const compare = await bcrypt.compare(password, admin.password);
    if (!compare) {
      throw new ErrorStatus('Invalid username or password', 401);
    }

    const token = generateToken(admin._id, true);

    return res
      .cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      .sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { userName,  firstName,
      lastName,
      email,
      password
    } = req.body;
    
    if (!userName || !firstName || !lastName || !email || !password) {
      throw new ErrorStatus('Missing fields', 400);
    }
    
    const hash = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password: hash,
      isAdmin: false, // Set the initial isAdmin value to false for regular users
    });
    
    const token = generateToken(newUser._id, false);
    
    res
      .cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      .sendStatus(201);
    } catch (error) {
      next(error);
    }
    };
    
    const getOneUser = async (req, res, next) => {
      try {
        const findUser = await User.findById(req.userId);
        res.status(200).json(findUser);
      } catch (error) {
        next(error);
      }
    };
    
    const getAllUsers = async (req, res, next) => {
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
    };
    
    const generateToken = (userId, isAdmin) => {
      const token = jwt.sign({ _id: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    };
    
    module.exports = { login, adminLogin, createUser, getOneUser, getAllUsers };
    
