const express = require('express');
const routes = express.Router();
const homeController = require('../conrollers/home-controller');

console.log("hii from router/indes.js");


routes.get('/', homeController.home);

routes.use('/user', require('./user'));

routes.use('/posts', require('./posts'));

routes.use('/comments', require('./comments'));



routes.use('/likes', require('./likes'));
routes.use('/api', require('./api'));


module.exports = routes;

