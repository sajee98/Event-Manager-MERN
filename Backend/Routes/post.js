const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        date: req.body.date
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;
        post.image = req.body.image || post.image;
        post.status = req.body.status || post.status;
        post.date = req.body.date || post.date;
        post.updatedAt = new Date();
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    } 
});

//delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        } 
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;
