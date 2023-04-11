const jwt = require('jsonwebtoken');

const secretPassword = process.env.JWT_SECRET;

const { getAll } = require('../services/user.services');

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

const idUserLog = async (authorization) => {
const getEmail = await validateToken(authorization);
const getUser = await getAll();
const getIdUser = getUser.filter((ele) => ele.dataValues.email === getEmail.email);
const idUser = getIdUser[0].dataValues.id;
return idUser;
};

module.exports = {
    generateToken,
    validateToken,
    idUserLog,
};