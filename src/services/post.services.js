const { User, PostCategory, BlogPost, Category } = require('../models');
const { validateToken } = require('../utils/auth');

const addPost = async (title, content, categoryIds, authorization) => {
    const getEmail = await validateToken(authorization);
    const getUser = await User.findAll();
    const getCategory = await Category.findAll(); 

    const categoryIsValid = categoryIds.map((ele) => 
    getCategory.some((id) => id.dataValues.id === +ele));
   
    const isTrueId = categoryIsValid.every((ele) => ele === true);

    if (!isTrueId) {
        return null;
    }
    
    const getIdUser = getUser.filter((ele) => ele.dataValues.email === getEmail.email);
    const idUser = +getIdUser[0].dataValues.id;

    const post = await BlogPost.create({ title, content, userId: idUser });
    const newIdPost = +post.id;

    categoryIds.forEach(async (ele) => {
        await PostCategory.create({ postId: newIdPost, categoryId: ele });
    });

    return post;
};

module.exports = {
    addPost,
};