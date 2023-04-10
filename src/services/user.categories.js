const { Category } = require('../models');

const newCategories = async (name) => {
    const categorie = await Category.create({ name });
        return categorie;
    };

    module.exports = {
        newCategories,
    };