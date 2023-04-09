const express = require('express');

const loginController = require('../controllers/login.controller');
const { validationInfoLogin } = require('../middlewares/login.validation');
const {
    validationUserDisplayName,
    validationUserEmail,
    validationUserPassword,
} = require('../middlewares/user.validation');

const routers = express.Router();

routers.post(
'/', 
validationInfoLogin,
validationUserDisplayName,
validationUserEmail,
validationUserPassword,
loginController.postUser,
);

module.exports = routers;