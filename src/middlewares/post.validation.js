const validateValuesKey = async (req, res, next) => {
    const { body } = req;

    if (!body.title || !body.content || !body.categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
};

const validateValues = async (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
};

const validateCategoryIds = async (req, res, next) => {
    const { categoryIds } = req.body;

    if (!Array.isArray(categoryIds) || categoryIds.length < 1) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    return next();
};

const validateValusPut = async (req, res, next) => {
    const { body } = req;

    if (!body.title || !body.content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
};
module.exports = {
    validateValuesKey,
    validateValues,
    validateCategoryIds,
    validateValusPut,
};