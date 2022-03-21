const express = require('express');

const router = express.Router();

const userController = require('../conrollers/users-conrtoller');
const userSignUp = require('../conrollers/user-signup');

router.get('/profile', userController.users);
router.get('/signup', userSignUp.signup);
module.exports = router;