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

module.exports = {
    validLogin,
};