const express = require('express');
const routes = express.Router();
const homeController = require('../conrollers/home-controller');

console.log("hii from router/indes.js");


routes.get('/', homeController.home);

routes.use('/user', require('./user'));

module.exports = routes;

