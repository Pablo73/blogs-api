const { userCategories } = require('../services');

const postCategorie = async (req, res) => {
    const { name } = req.body;
    try {
        const categorie = await userCategories.newCategories(name);
        return res.status(201).json(categorie);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

module.exports = {
    postCategorie,
};