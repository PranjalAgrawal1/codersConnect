const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../conrollers/comments-controller');


router.post('/create', passport.checkAuthenticate, commentsController.create);

router.get('/destroy/:id', passport.checkAuthenticate, commentsController.destroy);


module.exports = router;