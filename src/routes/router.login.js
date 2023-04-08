const express = require('express');
const loginController = require('../controllers/login.controller');
const { 
    validationInfoLogin,
} = require('../middlewares/login.validation');

const routers = express.Router();

routers.post('/', validationInfoLogin, loginController.validLogin);

module.exports = routers;