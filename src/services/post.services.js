const { User, PostCategory, BlogPost, Category } = require('../models');
const { validateToken } = require('../utils/auth');

const addPost = async (title, content, categoryIds, authorization) => {
    const getEmail = await validateToken(authorization);
    const getUser = await User.findAll();
    const getCategory = await Category.findAll(); 

    const categoryIsValid = categoryIds.map((ele) => 
    getCategory.some((id) => id.dataValues.id === +ele));
    console.log(categoryIsValid);

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

const getPostWithUserAndCategories = async () => {
    const get = await BlogPost.findAll({
        attributes: { exclude: ['user_id'] },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } },
] });
    return get;
};

const getPostWithUserAndCategoriesId = async (id) => {
    const [get] = await BlogPost.findAll({
        where: { id },
        attributes: { exclude: ['user_id'] },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } },
] });
    return get;
};

// const updataPost = async (idUser, title, content) => {

// };

module.exports = {
    addPost,
    getPostWithUserAndCategories,
    getPostWithUserAndCategoriesId,
    // updataPost,
};