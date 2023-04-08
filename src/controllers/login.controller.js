const { generateToken } = require('../utils/auth');

const { getAlluser } = require('../services/login.service');

const validLogin = async (req, res) => {
    const { email, password } = req.body;
    const getUser = await getAlluser();

    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const validationUser = getUser.some((ele) => ele.email === email && ele.password === password);
    if (!validationUser) {
    return res.status(400).json({ message: 'Invalid fields' });
}

    const newToken = await generateToken({ email });
    
    return res.status(200).json({ token: newToken });
};

module.exports = {
    validLogin,
};