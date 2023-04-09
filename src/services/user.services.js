const { User } = require('../models');

const getAlluser = async () => { 
    const get = await User.findAll(); 
  return get;
  };

const newUser = async (displayName, email, password, image) => {
const user = await User.create({
    displayName, email, password, image });
    if (!user) {
        return null;
    } 
    return user;
};

  module.exports = {
    getAlluser,
    newUser,
};