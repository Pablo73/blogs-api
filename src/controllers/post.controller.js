const { postServices } = require('../services');

const postPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    try {
        const post = await postServices.addPost(title, content, categoryIds, authorization);
        if (!post) {
            return res.status(400).json({ message: 'one or more "categoryIds" not found' });
        }
        return res.status(201).json(post);
    } catch (error) { return res.status(500).json({ message: 'internal error' }); }
};

const getPost = async (_req, res) => {
    try {
        const post = await postServices.getPostWithUserAndCategories();
        return res.status(200).json(post);
    } catch (error) { 
        console.log(error);
        return res.status(500).json({ message: 'internal error' });
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
        return res.status(500).json({ message: 'internal error' });
     }
};

module.exports = {
    postPost,
    getPost,
    getPostId,
};