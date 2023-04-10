const express = require('express');

const routers = express.Router();

const { categorieController } = require('../controllers');

const { validationCategorieName } = require('../middlewares/user.validation');

const { validationInfoLogin, tokenExist } = require('../middlewares/login.validation');

routers.post(
'/', 
tokenExist,
validationInfoLogin, 
validationCategorieName, 
categorieController.postCategorie,
);

routers.get(
    '/', 
    tokenExist,
    validationInfoLogin, 
    categorieController.getCategories,
    );

module.exports = routers;