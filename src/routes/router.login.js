const express = require('express');
const { loginController } = require('../controllers');

const routers = express.Router();

routers.post('/', loginController.validLogin);

module.exports = routers;