const { validateToken } = require('../utils/auth');

const validationInfoLogin = async (req, res, next) => {
    try {
 const { authorization } = req.headers;
    validateToken(authorization);
    return next();
} catch (error) {
    console.log(error);
        return res.status(401).json({ message: 'not authorization' });
    }
};

module.exports = {
    validationInfoLogin,
};