const { User } = require('../models');

const newUser = async (displayName, email, password, image) => {
    const user = await User.create({
        displayName, email, password, image });
        if (!user) {
          return ({ message: 'Não foi possível criar um novo paciente' });
        }
      
        return user;
};

const getAlluser = async () => { 
  const get = await User.findAll(); 
return get;
};

module.exports = {
    newUser,
    getAlluser,
};