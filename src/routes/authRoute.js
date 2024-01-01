const { login, logout, register } = require('../controllers/authController');
const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);

module.exports = authRoutes;