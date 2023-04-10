const express = require('express');
const { postController } = require('../controllers');

const { validateValuesKey,
    validateValues, 
    validateCategoryIds,
 } = require('../middlewares/post.validation');

const { validationInfoLogin, tokenExist } = require('../middlewares/login.validation');

const routers = express.Router();

routers.post(
'/', 
tokenExist, 
validationInfoLogin,
validateValuesKey, 
validateValues,
validateCategoryIds,
postController.postPost,
);

module.exports = routers;