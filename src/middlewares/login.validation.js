const { validateToken } = require('../utils/auth');

const validationInfoLogin = async (req, res, next) => {
    try {
 const { authorization } = req.headers;
   const token = await validateToken(authorization);
    console.log(token);
    return next();
} catch (error) {
    console.log(error);
        return res.status(401).json({ message: 'not authorization' });
    }
};

module.exports = {
    validationInfoLogin,
};