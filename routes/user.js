const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../conrollers/users-conrtoller');

router.get('/profile/:id', passport.checkAuthenticate, userController.profile);
router.post('/update/:id', passport.checkAuthenticate, userController.update);

router.get('/signup', userController.signup);

router.get('/signin', userController.signin)
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/signin' }
), userController.createSession)
module.exports = router;

router.get('/signout', userController.releasSeassion);


router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: "/user/signin"}), userController.createSession);