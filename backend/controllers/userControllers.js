const User = require('../models/userSchema');
const ErrorStatus = require('../utils/errorStatus');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookies = require('cookies');

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) throw new ErrorStatus('Missing fields', 400);

    const findUser = await User.findOne({ userName }).select('+password');
    if (!findUser) throw new ErrorStatus('User not found!', 404);

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) throw new ErrorStatus('Password does not match!', 401);

    const token = jwt.sign({ _id: findUser._id, isAdmin: findUser.isAdmin, status: findUser.status }, process.env.JWT_SECRET);

    return res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'none',
        secure: true,
      })
      .sendStatus(200);
  } catch (error) {
    next(error);
  }
};


const createUser = async (req, res, next) => {
  try {
    const { userName, firstName, lastName, email, password, isAdmin, status , profileImage } = req.body;
    if (!userName || !firstName || !lastName || !email || !password)
      throw new ErrorStatus('Missing fields', 400);

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password: hash,
      isAdmin: isAdmin || false,// Set isAdmin to the provided value or default to false
      status: status || false, 
      profileImage, // Store the profile image URL in the user document
    });

    const token = jwt.sign({ _id: newUser._id, isAdmin: newUser.isAdmin , status: newUser.status}, process.env.JWT_SECRET);

    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'none',
        secure: true,
      })
      .sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, firstName, lastName, email, password, isAdmin, status ,profileImage } = req.body;

    // Create an object to hold the updated fields
    const updatedFields = {};
    if (userName) updatedFields.userName = userName;
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (email) updatedFields.email = email;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updatedFields.password = hash;
    }
    if (isAdmin !== undefined) updatedFields.isAdmin = isAdmin;
    if (status) updatedFields.status = status;
    if (profileImage) updatedFields.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    console.log('Updated user:', updatedUser);

    res.status(200).json(updatedUser);
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

const getOneUser = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId);
    res.status(200).json(findUser);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const domain = '.cloudinary.com'; // Replace with your domain

    const allCookies = req.cookies.get(domain);
    if (allCookies) {
      Object.keys(allCookies).forEach((cookieName) => {
        res.cookies.set(cookieName, '', {
          domain: `.${domain}`,
          path: '/',
          expires: new Date(0),
        });
      });
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getOneUser, createUser, logout, getAllUsers,  updateUser  };