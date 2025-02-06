const express = require('express');
const Blog = require('../models/blogModel')
const cloudinary = require('cloudinary').v2
const multer = require('multer') // handle file uploads from frontend
const router = express.Router();
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// multer setup
const storage = multer.memoryStorage();
const upload = multer({storage})

// post blog with single image
router.post('/', upload.single('image'), async(req:any ,res:any) => {
    const {title, category, content} = req.body
    const imageFile = req.file

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Convert file buffer to Base64 for Cloudinary upload
        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadResponse = await cloudinary.uploader.upload(base64File);

        const newBlog = new Blog({
            title,
            image: uploadResponse.secure_url,
            category,
            content,
        })  
        // user: req.userId,
        await newBlog.save();
        res.status(200).json({newBlog})
    } catch (error:any) {
        console.error('Error creating blog:', error)
        res.status(500).json({error: error.message});
    }
});

// get all blogs
router.get('/', async(req:any, res:any) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1}).populate('user', 'name'); // populate to return he author's name
        res.status(200).json(blogs)
    } catch (error:any) {
        res.status(500).json({error: error.message});
    }
});

// delete blog
router.delete('/:id', async(req:any, res:any)=> {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({mssg: 'Deleted blog successfully'})
    } catch (error:any) {
        res.status(500).json({error: error.message});
    }    
});

module.exports = router