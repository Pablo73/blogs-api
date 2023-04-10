const { Category } = require('../models');

const newCategories = async (name) => {
    const categorie = await Category.create({ name });
        return categorie;
};

const getAllCategorie = async () => {
    const get = await Category.findAll();
    return get;
};

module.exports = {
    newCategories,
    getAllCategorie,
};