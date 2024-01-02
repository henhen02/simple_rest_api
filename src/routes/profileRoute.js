const { updateProfile, getProfile } = require('../controllers/profileController');
const { Router } = require('express');
const jwtVerify = require('../middleware/jwtVerify');

const profileRoute = Router();

profileRoute.put('/',jwtVerify, updateProfile);
profileRoute.get('/',jwtVerify, getProfile);

module.exports = profileRoute;