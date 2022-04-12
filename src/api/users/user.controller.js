const User = require('./user.model');
const bcrypt = require('bcrypt');
const { generateToken, setError } = require('../../helpers/utils');

const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, 'Email already exists'));
    const userInDB = await newUser.save();
    return res.status(201).json(userInDB);
  } catch (error) {
    return next(setError(500, 'Create User Failed'));
  }
};

const login = async (req, res, next) => {
  try {
    const userInDB = await User.findOne({ email: req.body.email });
    if (!userInDB) return next(setError(401, 'Unauthorized user'));
    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      const token = generateToken(userInDB._id, userInDB.email);
      return res.status(200).json({
        user: userInDB,
        token: token
      });
    } else {
      return next(setError(401, 'Incorrect password'));
    }
  } catch (error) {
    return next(setError(500, 'Login User Failed'));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(setError(404, 'User does not exists'));
    return res.json({
      status: 200,
      message: 'User Info',
      data: { user: user }
    });
  } catch (error) {
    return next(setError(500, 'User Id Failed'));
  }
};

module.exports = { create, login, getById };
