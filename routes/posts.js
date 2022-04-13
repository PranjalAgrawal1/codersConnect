const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../conrollers/post-controller');


router.post('/create', passport.checkAuthenticate, postController.create);
router.get('/destroy/:id', passport.checkAuthenticate, postController.destroy);

module.exports = router;