const express = require('express');

const loginController = require('../controllers/login.controller');
const { validationInfoLogin, tokenExist } = require('../middlewares/login.validation');
const {
    validationUserDisplayName,
    validationUserEmail,
    validationUserPassword,
} = require('../middlewares/user.validation');

const routers = express.Router();

routers.post(
'/', 
validationUserDisplayName,
validationUserEmail,
validationUserPassword,
loginController.postUser,
);

routers.get('/', tokenExist, validationInfoLogin, loginController.getUser);

routers.get('/:id', tokenExist, validationInfoLogin, loginController.getUserId);

module.exports = routers;