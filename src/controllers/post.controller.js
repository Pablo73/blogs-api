const { postServices } = require('../services');
const { idUserLog } = require('../utils/auth');

const MESSAGE_ERRO = { message: 'internal error' };

const postPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    try {
        const post = await postServices.addPost(title, content, categoryIds, authorization);
        if (!post) {
            return res.status(400).json({ message: 'one or more "categoryIds" not found' });
        }
        return res.status(201).json(post);
    } catch (error) { 
        console.log(error);
        return res.status(500).json(MESSAGE_ERRO); 
    }
};

const getPost = async (_req, res) => {
    try {
        const post = await postServices.getPostWithUserAndCategories();
        return res.status(200).json(post);
    } catch (error) { 
        console.log(error);
        return res.status(500).json(MESSAGE_ERRO);
     }
};

const getPostId = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postServices.getPostWithUserAndCategoriesId(+id);
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        return res.status(200).json(post);
    } catch (error) { 
        console.log(error);
        return res.status(500).json(MESSAGE_ERRO);
     }
};

const postId = async (req, res) => {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const { id } = req.params;
    const idUser = await idUserLog(authorization);
    try {
        const post = await postServices.updataPost(id, idUser, title, content);
        if (!post) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        return res.status(200).json(post);
    } catch (error) { 
        console.log(error);
        return res.status(500).json(MESSAGE_ERRO);
     }
};

const deletePostId = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const idUser = await idUserLog(authorization);
    try {
        const post = await postServices.deletePost(id, idUser);

        if (post === 0) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
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
    postPost,
    getPost,
    getPostId,
    postId,
    deletePostId,
};