const jwt = require('jsonwebtoken');

const secretPassword = process.env.JWT_SECRET;

const configJWT = {
    expiresIn: '8d',
    algorithm: 'HS256',
};

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, secretPassword, configJWT);
  return token;
};

const validateToken = async (token) => {
const valid = await jwt.verify(token, secretPassword);
return valid;
};

module.exports = {
    generateToken,
    validateToken,
};