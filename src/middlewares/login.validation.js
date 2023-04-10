const { validateToken } = require('../utils/auth');

const tokenExist = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    return next();
};

const validationInfoLogin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = await validateToken(authorization);
        console.log(token);
    return next();
} catch (error) {
    console.log(error);
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    validationInfoLogin,
    tokenExist,
};