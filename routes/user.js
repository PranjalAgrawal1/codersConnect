const express = require('express');

const router = express.Router();

const userController = require('../conrollers/users-conrtoller');

router.get('/profile', userController.profile);

router.get('/signup', userController.signup);

router.get('/signin', userController.signin)
router.post('/create', userController.create);

module.exports = router;