const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../conrollers/post-controller');


router.post('/create', passport.authenticate, postController.create);


module.exports = router;