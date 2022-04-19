const express = require('express');

const routes = express.Router();
const usersApi = require('../../../conrollers/api/v1/users_api');


routes.post('/create-session', usersApi.createSession);

module.exports = routes;