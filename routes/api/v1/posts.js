const express = require('express');
const routes = express.Router();
const postsApi = require('../../../conrollers/api/v1/post_api');
const router = require('../../user');



router.get('/', postsApi.index);









module.exports = router;