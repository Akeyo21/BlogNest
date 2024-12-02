const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const router = express.Router();

// Register user
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({newUser})
    } catch (error) {
        console.error('Error saving user:', error.message)
        res.status(500).json({error: error.message});
    }
});


// Login user
router.post('/login', async(req, res) => {
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({mmsg: 'User not found'})
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({mssg: 'Invalid credentials'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'});
        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    res.json({mssg: 'Login user'})
});

// get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// delete user
router.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({mssg: 'Deleted user successfully'})
    } catch (error){
        res.status(400).json({error: error.message})
    }
});

module.exports = router;