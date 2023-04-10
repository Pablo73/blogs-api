const { userCategories } = require('../services');

const postCategorie = async (req, res) => {
    const { name } = req.body;
    try {
        const categorie = await userCategories.newCategories(name);
        return res.status(201).json(categorie);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

const getCategories = async (_req, res) => {
    try {
        const users = await userCategories.getAllCategorie();
        return res.status(200).json(users);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

module.exports = {
    postCategorie,
    getCategories,
};