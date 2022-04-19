const express = require('express');
const router = express.Router();
const passport = require('passport')

const postsApi = require('../../../conrollers/api/v1/post_api');
// const router = require('../../user');



router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postsApi.destroy);









module.exports = router;