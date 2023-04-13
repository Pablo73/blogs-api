const { usersServices } = require('../services');

const { idUserLog } = require('../utils/auth');

const { generateToken } = require('../utils/auth');

const MESSAGE_ERRO = { message: 'internal error' };

const postUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
        const newToken = await generateToken({ email });
        await usersServices.newUser(displayName, email, password, image);
        return res.status(201).json({ token: newToken });
    } catch (error) { return res.status(500).json(MESSAGE_ERRO); }
};

const getUser = async (req, res) => {
    try {
        const users = await usersServices.getAlluser();
        return res.status(200).json(users);
    } catch (error) { return res.status(500).json(MESSAGE_ERRO); }
};

const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await usersServices.getUserWithId(id);
        if (!users) {
        return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(users);
    } catch (error) { return res.status(500).json(MESSAGE_ERRO); }
};

const deleteUserId = async (req, res) => {
    const { authorization } = req.headers;
    const idUser = await idUserLog(authorization);
    try {
        const post = await usersServices.deleteUser(idUser);
        
        if (post === null) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        return res.status(204).json();
    } catch (error) { 
        console.log(error);
        return res.status(500).json(MESSAGE_ERRO);
    }
};
module.exports = {
    getUser,
    getUserId,
    postUser,
    deleteUserId,
};