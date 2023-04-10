const express = require('express');

const { userController } = require('../controllers');
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
userController.postUser,
);

routers.get('/', tokenExist, validationInfoLogin, userController.getUser);

routers.get('/:id', tokenExist, validationInfoLogin, userController.getUserId);

module.exports = routers;