const { usersServices } = require('../services');

const { generateToken } = require('../utils/auth');

const postUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
        const newToken = await generateToken({ email });
        await usersServices.newUser(displayName, email, password, image);
        return res.status(201).json({ token: newToken });
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

const getUser = async (req, res) => {
    try {
        const users = await usersServices.getAlluser();
        return res.status(200).json(users);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await usersServices.getUserWithId(id);
        if (!users) {
        return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(users);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

module.exports = {
    getUser,
    getUserId,
    postUser,
};