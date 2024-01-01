const { updateProfile } = require('../controllers/profileController');
const { Router } = require('express');
const jwtVerify = require('../middleware/jwtVerify');

const profileRoute = Router();

profileRoute.put('/',jwtVerify, updateProfile);

module.exports = profileRoute;