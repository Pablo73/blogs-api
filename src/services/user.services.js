const { User } = require('../models');

const getAll = async () => { 
  const get = await User.findAll(); 
return get;
};

const getAlluser = async () => { 
    const get = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
    }); 
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

const getUserWithId = async (id) => { 
  const [getUserId] = await User.findAll({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  }); 
  console.log(getUserId);
  if (!getUserId) {
    return null;
  }
return getUserId;
};

const deleteUser = async (idUser) => {
      const removed = await User.destroy({ where: { id: idUser } }); 
      return removed;
};

  module.exports = {
    getAll,
    getAlluser,
    newUser,
    getUserWithId,
    deleteUser,
};