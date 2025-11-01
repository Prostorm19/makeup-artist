const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            userType
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Find user by email and userType
        const user = await User.findOne({ email, userType });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials or user type' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profileImage: user.profileImage,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, profileImage } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profileImage: user.profileImage,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: 'Server error during profile update' });
    }
});

module.exports = router;