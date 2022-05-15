const express = require('express');
const routes = express.Router();

const likeController = require('../conrollers/likes_controller');
routes.post('/toggle/', likeController.toggleLike);



module.exports = routes;