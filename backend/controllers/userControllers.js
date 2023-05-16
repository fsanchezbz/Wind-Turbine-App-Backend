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

    const findUser = await User.findOne({ $or: [{ userName }, { email }] }).select('+password');
    if (!findUser) {
      throw new ErrorStatus('User not found!', 404);
    }

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) {
      throw new ErrorStatus('Password does not match!', 401);
    }

    const token = generateToken(findUser._id, findUser.isAdmin);
    res.cookie('token', token, { httpOnly: true});
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;
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
      isAdmin: true,
    });

    const token = generateToken(newUser._id, newUser.isAdmin);
    res.cookie('token', token, { httpOnly: true});
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const findUser = await User.findById(userId);
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
  const token = jwt.sign({ _id: userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { login, createUser, getOneUser, getAllUsers };
