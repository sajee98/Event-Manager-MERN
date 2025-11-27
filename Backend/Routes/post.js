// post.routes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Multer storage (uploads/) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname)),
});

const upload = multer({ storage });

// serve uploads statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ---------- Routes ----------

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by category
router.get('/category/:category', async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category });
    if (!posts.length) return res.status(404).json({ message: 'No posts found for this category' });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new post
// Accepts multipart: logo (single), photos (many), videos (many)
router.post(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'photos', maxCount: 20 },
    { name: 'videos', maxCount: 10 },
    { name: 'images', maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const files = req.files || {};

      const logoFile = files.logo && files.logo[0] ? files.logo[0].filename : (req.body.logo || '');

      const photoFiles = [];
      if (files.photos) photoFiles.push(...files.photos.map((f) => f.filename));
      if (files.images) photoFiles.push(...files.images.map((f) => f.filename));

      const videoFiles = files.videos ? files.videos.map((f) => f.filename) : [];

      const postData = {
        eventName: req.body.eventName || req.body.postName || '',
        category: req.body.category || '',
        shortDes: req.body.shortDes ||  '',
        location: req.body.location || req.body.postAddress || '',
        phoneNo: req.body.phoneNo || req.body.phone || '',
        email: req.body.email || '',
        instagram: req.body.instagram || '',
        tiktok: req.body.tiktok || '',
        facebook: req.body.facebook || '',
        logo: logoFile,
        photos: photoFiles,
        videos: videoFiles,
        images: photoFiles, 
        aboutUs: req.body.aboutUs ||  '',
      };

      const post = new Post(postData);
      const saved = await post.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error('Create post error:', error);
      res.status(400).json({ message: error.message });
    }
  }
);

// UPDATE post (also accept files)
router.put(
  '/:id',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'photos', maxCount: 20 },
    { name: 'videos', maxCount: 10 },
    { name: 'images', maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      const files = req.files || {};

      // update simple fields if provided
      const updatable = ['eventName', 'category', 'shortDes', 'location', 'phoneNo', 'email', 'instagram', 'tiktok', 'facebook',  'aboutUs'];
      updatable.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          post[key] = req.body[key];
        }
      });

      // files: if new files uploaded, append to existing arrays (you may change to replace)
      if (files.logo && files.logo[0]) post.logo = files.logo[0].filename;
      if (files.photos) post.photos = [...(post.photos || []), ...files.photos.map((f) => f.filename)];
      if (files.images) post.images = [...(post.images || []), ...files.images.map((f) => f.filename)];
      if (files.videos) post.videos = [...(post.videos || []), ...files.videos.map((f) => f.filename)];

      post.updatedAt = new Date();
      const saved = await post.save();
      res.status(200).json(saved);
    } catch (error) {
      console.error('Update post error:', error);
      res.status(400).json({ message: error.message });
    }
  }
);

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    // optionally remove uploaded files here if you want
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



