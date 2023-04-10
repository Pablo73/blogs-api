const { usersServices } = require('../services');

const validationUserDisplayName = async (req, res, next) => {
    const { displayName } = req.body;

    if (!displayName || displayName.length < 8) {
        return res.status(400).json({ 
            message: '"displayName" length must be at least 8 characters long' });
    }
    return next();
};

const validationUserEmail = async (req, res, next) => {
    const { email } = req.body;
    const allUser = await usersServices.getAll();

    const validationEmail = (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );
      const valiEmail = validationEmail.test(email);
    if (!email || !valiEmail) {
        return res.status(400).json({ 
            message: '"email" must be a valid email' });
    }

    const checkRegistered = allUser.some((ele) => ele.email === email);

    if (checkRegistered) {
        return res.status(409).json({ 
            message: 'User already registered' });
    }
    return next();
};

const validationUserPassword = async (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({ 
            message: '"password" length must be at least 6 characters long' });
    }
    return next();
};

const validationCategorieName = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ 
            message: '"name" is required' });
    }
    return next();
};

module.exports = {
    validationUserDisplayName,
    validationUserEmail,
    validationUserPassword,
    validationCategorieName,
};