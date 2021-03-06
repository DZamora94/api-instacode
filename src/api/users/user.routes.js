const UserRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');

const { login, create, getById, getUserData } = require('./user.controller');

UserRoutes.post('/register', create);
UserRoutes.post('/login', login);
UserRoutes.get('/', [authorize], getUserData);
UserRoutes.get('/:id', [authorize], getById);

module.exports = UserRoutes;
