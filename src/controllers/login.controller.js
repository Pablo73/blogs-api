const { generateToken } = require('../utils/auth');

const { usersServices } = require('../services');

const validLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
    const getUser = await usersServices.getAll();

    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const validationUser = getUser.some((ele) => ele.email === email && ele.password === password);
    if (!validationUser) {
    return res.status(400).json({ message: 'Invalid fields' });
}

    const newToken = await generateToken({ email });
    
    return res.status(200).json({ token: newToken });
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

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
    validLogin,
    postUser,
    getUser,
    getUserId,
};