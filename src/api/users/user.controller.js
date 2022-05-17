const User = require('./user.model');
const bcrypt = require('bcrypt');
const { generateToken, setError } = require('../../helpers/utils');

const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, 'Email already exists'));
    const userInDb = await newUser.save();
    return res.status(201).json(userInDb);
  } catch (error) {
    return next(setError(500, 'Create user failed'));
  }
};

const login = async (req, res, next) => {
  try {
    const userInDb = await User.findOne({ email: req.body.email });
    if (!userInDb) return next(setError(401, 'Unauthorized'));
    if (bcrypt.compareSync(req.body.password, userInDb.password)) {
      const token = generateToken(userInDb._id, userInDb.email);
      return res.status(200).json({
        user: userInDb,
        token: token
      });
    } else {
      return next(setError(401, 'Wrong password'));
    }
  } catch (error) {
    return next(setError(500, 'Login user failed'));
  }
};

const getUserData = async (req, res) => {
  const { user } = await req;
  const { password, __v, createdAt, ...restUser } = user.toObject();

  return res.json({
    status: 200,
    message: 'User Info',
    data: restUser
  });
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id != req.user.id) return next(setError(403, 'Forbidden'));
    const user = await User.findById(id);
    if (!user) return next(setError(404, 'User not found'));
    return res.json({
      status: 200,
      message: 'User Info',
      data: { user: user }
    });
  } catch (error) {
    return next(setError(500, 'Get user by id failed'));
  }
};

module.exports = {
  create,
  login,
  getById,
  getUserData
};
