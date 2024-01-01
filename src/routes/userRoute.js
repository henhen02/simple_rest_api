const { getUsers, getUser, deleteUser, createUser, updateUser } = require('../controllers/userController');
const { Router } = require('express');
const isAdmin = require('../middleware/isAdmin');

const userRoutes = Router();

userRoutes.post('/', isAdmin, createUser);
userRoutes.get('/', isAdmin, getUsers);
userRoutes.get('/:id', isAdmin, getUser);
userRoutes.delete('/:id', isAdmin, deleteUser);
userRoutes.put('/:id', isAdmin, updateUser);

module.exports = userRoutes;
