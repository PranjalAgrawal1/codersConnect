const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../conrollers/comments-controller');


router.post('/create', passport.checkAuthenticate, commentsController.create);


module.exports = router;