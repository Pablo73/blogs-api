const express = require('express');
const { postController } = require('../controllers');

const { validateValuesKey,
    validateValues, 
    validateCategoryIds,
    validateValusPut,
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

routers.get('/', tokenExist, validationInfoLogin, postController.getPost);
routers.get('/:id', tokenExist, validationInfoLogin, postController.getPostId);
routers.put('/:id', tokenExist, validationInfoLogin, validateValusPut, postController.postId);

module.exports = routers;